"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Settings, Search, CheckCircle2, Clock, RefreshCw } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Select from "@/components/ui/Select";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { TalentEvent, Guest, ScanLog } from "@/types";
import { KEYS } from "@/lib/storage";
import { generateId, formatDateTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function ScannerPage() {
  const [events] = useLocalStorage<TalentEvent[]>(KEYS.EVENTS, []);
  const [guests, setGuests] = useLocalStorage<Guest[]>(KEYS.GUESTS, []);
  const [logs, setLogs] = useLocalStorage<ScanLog[]>(KEYS.SCAN_LOGS, []);

  const [selectedEventId, setSelectedEventId] = useState("");
  const [search, setSearch] = useState("");
  const [scanInput, setScanInput] = useState("");
  const [lastScan, setLastScan] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const eventOptions = useMemo(
    () => events.map((e) => ({ value: e.id, label: e.name })),
    [events]
  );

  const eventGuests = useMemo(
    () =>
      guests
        .filter((g) => !selectedEventId || g.eventId === selectedEventId)
        .filter((g) => {
          if (!search) return true;
          const q = search.toLowerCase();
          return (
            g.name.toLowerCase().includes(q) ||
            g.email.toLowerCase().includes(q) ||
            g.qrToken.toLowerCase().includes(q)
          );
        }),
    [guests, selectedEventId, search]
  );

  const recentLogs = useMemo(
    () =>
      logs
        .filter((l) => !selectedEventId || l.eventId === selectedEventId)
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 20),
    [logs, selectedEventId]
  );

  function processCheckIn(token: string) {
    const guest = guests.find(
      (g) =>
        g.qrToken === token &&
        (!selectedEventId || g.eventId === selectedEventId)
    );

    if (!guest) {
      setLastScan({ success: false, message: `No guest found for token: ${token}` });
      return;
    }

    if (guest.status === "checked-in") {
      setLastScan({
        success: false,
        message: `${guest.name} is already checked in.`,
      });
      return;
    }

    // Update guest
    setGuests((prev) =>
      prev.map((g) =>
        g.id === guest.id
          ? { ...g, status: "checked-in", scans: g.scans + 1, checkedInAt: Date.now() }
          : g
      )
    );

    // Log the scan
    const log: ScanLog = {
      id: generateId(),
      eventId: guest.eventId,
      guestId: guest.id,
      guestName: guest.name,
      timestamp: Date.now(),
      action: "check-in",
    };
    setLogs((prev) => [log, ...prev]);
    setLastScan({ success: true, message: `✓ ${guest.name} checked in successfully!` });
  }

  function handleManualScan(e: React.FormEvent) {
    e.preventDefault();
    if (scanInput.trim()) {
      processCheckIn(scanInput.trim());
      setScanInput("");
    }
  }

  function handleSearchCheckIn(guestId: string) {
    const guest = guests.find((g) => g.id === guestId);
    if (guest) processCheckIn(guest.qrToken);
  }

  const stats = useMemo(() => {
    const evGuests = selectedEventId
      ? guests.filter((g) => g.eventId === selectedEventId)
      : guests;
    return {
      total: evGuests.length,
      checkedIn: evGuests.filter((g) => g.status === "checked-in").length,
      pending: evGuests.filter((g) => g.status === "pending").length,
    };
  }, [guests, selectedEventId]);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Scanner</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage guest check-ins and scan logs
          </p>
        </div>
        <Link href="/scanner/settings">
          <Button variant="outline" size="sm">
            <Settings size={15} /> Scanner Settings
          </Button>
        </Link>
      </div>

      {/* Event selector */}
      <div className="mb-5 max-w-sm">
        <Select
          label="Select Event"
          value={selectedEventId}
          onChange={(e) => setSelectedEventId(e.target.value)}
          options={eventOptions}
          placeholder="All Events"
        />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Guests", value: stats.total, color: "text-gray-900" },
          { label: "Checked In", value: stats.checkedIn, color: "text-success" },
          { label: "Pending", value: stats.pending, color: "text-amber-600" },
        ].map((s) => (
          <Card key={s.label} padding="sm">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">
              {s.label}
            </p>
            <p className={cn("text-2xl font-bold", s.color)}>{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Manual check-in */}
        <div className="space-y-4">
          <Card>
            <h2 className="font-semibold text-gray-900 mb-4">Manual Check-in</h2>

            {/* Scan result */}
            {lastScan && (
              <div
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl mb-4 text-sm font-medium",
                  lastScan.success
                    ? "bg-green-50 text-success border border-green-100"
                    : "bg-red-50 text-danger border border-red-100"
                )}
              >
                {lastScan.success ? (
                  <CheckCircle2 size={18} className="shrink-0" />
                ) : (
                  <Clock size={18} className="shrink-0" />
                )}
                {lastScan.message}
              </div>
            )}

            <form onSubmit={handleManualScan} className="flex gap-3 mb-4">
              <input
                type="text"
                value={scanInput}
                onChange={(e) => setScanInput(e.target.value)}
                placeholder="Enter QR token or guest ID…"
                className="flex-1 px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
              <Button type="submit" size="sm">Check In</Button>
            </form>

            {/* Guest search */}
            <div className="relative mb-3">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                placeholder="Search guests by name or email…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto">
              {eventGuests.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-8">
                  No guests found.
                </p>
              ) : (
                eventGuests.map((guest) => (
                  <div
                    key={guest.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {guest.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{guest.email}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge
                        variant={
                          guest.status === "checked-in" ? "success" : "warning"
                        }
                        dot
                      >
                        {guest.status === "checked-in" ? "In" : "Pending"}
                      </Badge>
                      {guest.status !== "checked-in" && (
                        <Button
                          size="sm"
                          onClick={() => handleSearchCheckIn(guest.id)}
                          className="text-xs py-1"
                        >
                          Check In
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Scan logs */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Live Scan Log</h2>
            <button
              onClick={() => setLastScan(null)}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition text-gray-400"
              title="Refresh"
            >
              <RefreshCw size={15} />
            </button>
          </div>
          {recentLogs.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-12">
              No scans yet. Check in a guest to see logs here.
            </p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {recentLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100"
                >
                  <div className="w-7 h-7 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={14} className="text-success" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {log.guestName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDateTime(log.timestamp)}
                    </p>
                  </div>
                  <Badge variant="success">Checked In</Badge>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </>
  );
}
