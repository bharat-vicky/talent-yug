"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Upload, Download, Trash2, CheckCircle2, QrCode, X } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { TalentEvent, Guest, QRCodeRecord } from "@/types";
import { KEYS } from "@/lib/storage";
import { generateId } from "@/lib/utils";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 10;

export default function GuestListPage() {
  const [events] = useLocalStorage<TalentEvent[]>(KEYS.EVENTS, []);
  const [guests, setGuests] = useLocalStorage<Guest[]>(KEYS.GUESTS, []);
  const [qrCodes, setQrCodes] = useLocalStorage<QRCodeRecord[]>(KEYS.QR_CODES, []);

  const [selectedEventId, setSelectedEventId] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [page, setPage] = useState(1);
  const [importError, setImportError] = useState("");

  // Assign QR modal state
  const [assignGuestId, setAssignGuestId] = useState<string | null>(null);
  const [assignSearch, setAssignSearch] = useState("");

  // Auto-select first event on mount
  useEffect(() => {
    if (!selectedEventId && events.length > 0) {
      setSelectedEventId(events[0].id);
    }
  }, [events]); // eslint-disable-line react-hooks/exhaustive-deps

  const selectedEvent = useMemo(
    () => events.find((e) => e.id === selectedEventId),
    [events, selectedEventId]
  );

  const filtered = useMemo(() => {
    let list = guests.filter((g) => !selectedEventId || g.eventId === selectedEventId);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          g.email.toLowerCase().includes(q) ||
          (g.qrSerial ?? "").toLowerCase().includes(q)
      );
    }
    list = [...list].sort((a, b) =>
      sort === "newest" ? b.registeredAt - a.registeredAt : a.registeredAt - b.registeredAt
    );
    return list;
  }, [guests, selectedEventId, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Unassigned QRs for the selected event (or the guest's event)
  const assignGuest = assignGuestId ? guests.find((g) => g.id === assignGuestId) : null;
  const availableQRs = useMemo(() => {
    const eventId = assignGuest?.eventId ?? selectedEventId;
    const assignedSerials = new Set(guests.map((g) => g.qrSerial).filter(Boolean));
    return qrCodes.filter(
      (q) =>
        q.eventId === eventId &&
        q.status === "new" &&
        !assignedSerials.has(q.serial)
    );
  }, [qrCodes, guests, assignGuest, selectedEventId]);

  const filteredAvailableQRs = useMemo(() => {
    if (!assignSearch.trim()) return availableQRs;
    const q = assignSearch.toUpperCase();
    return availableQRs.filter((qr) => qr.serial.includes(q));
  }, [availableQRs, assignSearch]);

  function handleDeleteGuest(id: string) {
    setGuests((prev) => prev.filter((g) => g.id !== id));
  }

  function handleCheckIn(id: string) {
    setGuests((prev) =>
      prev.map((g) =>
        g.id === id
          ? { ...g, status: "checked-in", checkedInAt: Date.now(), scans: g.scans + 1 }
          : g
      )
    );
  }

  function handleAssignQR(serial: string) {
    if (!assignGuestId) return;
    setGuests((prev) =>
      prev.map((g) => (g.id === assignGuestId ? { ...g, qrSerial: serial } : g))
    );
    setQrCodes((prev) =>
      prev.map((q) => (q.serial === serial ? { ...q, status: "new" } : q))
    );
    setAssignGuestId(null);
    setAssignSearch("");
  }

  function handleUnassignQR(guestId: string) {
    const guest = guests.find((g) => g.id === guestId);
    if (!guest?.qrSerial) return;
    setGuests((prev) =>
      prev.map((g) => (g.id === guestId ? { ...g, qrSerial: undefined } : g))
    );
  }

  // ── CSV Export ──────────────────────────────────────────────────────────────
  function handleExport() {
    const list = filtered;
    if (list.length === 0) return;
    const header = "Name,Email,Phone,Company,QR Serial,Status,Scans,Registered At";
    const rows = list.map((g) =>
      [
        `"${g.name}"`,
        g.email,
        g.phone ?? "",
        g.company ?? "",
        g.qrSerial ?? g.qrToken,
        g.status,
        g.scans,
        new Date(g.registeredAt).toISOString(),
      ].join(",")
    );
    const blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `guests-${selectedEvent?.name ?? "all"}-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ── CSV Import ──────────────────────────────────────────────────────────────
  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !selectedEventId) {
      setImportError("Select an event before importing.");
      e.target.value = "";
      return;
    }
    setImportError("");

    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const lines = text.trim().split("\n");
      if (lines.length < 2) {
        setImportError("CSV has no data rows.");
        return;
      }

      const headers = lines[0].toLowerCase().split(",").map((h) => h.trim().replace(/"/g, ""));
      const nameIdx = headers.indexOf("name");
      const emailIdx = headers.indexOf("email");
      const phoneIdx = headers.indexOf("phone");
      const companyIdx = headers.indexOf("company");

      if (emailIdx === -1) {
        setImportError("CSV must have an 'email' column.");
        return;
      }

      const newGuests: Guest[] = [];
      let skipped = 0;

      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(",").map((c) => c.trim().replace(/^"|"$/g, ""));
        const email = cols[emailIdx]?.toLowerCase();
        if (!email) continue;

        const duplicate = guests.some(
          (g) => g.eventId === selectedEventId && g.email === email
        );
        if (duplicate) { skipped++; continue; }

        newGuests.push({
          id: generateId(),
          eventId: selectedEventId,
          name: nameIdx >= 0 ? cols[nameIdx] || email : email,
          email,
          phone: phoneIdx >= 0 ? cols[phoneIdx] : undefined,
          company: companyIdx >= 0 ? cols[companyIdx] : undefined,
          status: "pending",
          scans: 0,
          registeredAt: Date.now(),
          qrToken: generateId(),
        });
      }

      setGuests((prev) => [...prev, ...newGuests]);
      if (skipped > 0) setImportError(`Imported ${newGuests.length} guests (${skipped} duplicates skipped).`);
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  const statusColor: Record<string, string> = {
    "pending": "bg-amber-100 text-amber-700",
    "checked-in": "bg-green-100 text-green-700",
    "checked-out": "bg-gray-100 text-gray-600",
  };

  return (
    <>
      {/* ── Header ── */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Guest List</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Managing attendees for{" "}
          {selectedEvent ? (
            <span className="text-indigo-500 font-semibold">{selectedEvent.name}</span>
          ) : (
            <span>all events</span>
          )}
        </p>
      </div>

      {/* Event tabs */}
      {events.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mb-5">
          <button
            onClick={() => { setSelectedEventId(""); setPage(1); }}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-semibold transition border",
              !selectedEventId
                ? "bg-primary text-white border-primary"
                : "border-gray-200 text-gray-600 hover:border-primary hover:text-primary"
            )}
          >
            All Events
          </button>
          {events.map((e) => (
            <button
              key={e.id}
              onClick={() => { setSelectedEventId(e.id); setPage(1); }}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-semibold transition border",
                e.id === selectedEventId
                  ? "bg-primary text-white border-primary"
                  : "border-gray-200 text-gray-600 hover:border-primary hover:text-primary"
              )}
            >
              {e.name}
            </button>
          ))}
        </div>
      )}

      {/* ── Table Container ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-gray-100">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search guests…"
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:border-indigo-400"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => { setSort(e.target.value as "newest" | "oldest"); setPage(1); }}
            className="px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:border-indigo-400"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>

          {/* Import */}
          <label className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold cursor-pointer hover:bg-indigo-500 transition">
            <Upload size={14} /> Import Data
            <input type="file" accept=".csv" onChange={handleImport} className="hidden" />
          </label>

          {/* Export */}
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-500 transition"
          >
            <Download size={14} /> Export Data
          </button>
        </div>

        {importError && (
          <div className="px-4 py-2 bg-amber-50 text-amber-700 text-xs border-b border-amber-100">
            {importError}
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500 font-semibold uppercase tracking-wider">
                <th className="px-5 py-3 text-left">Guest Name</th>
                <th className="px-5 py-3 text-left">Contact</th>
                <th className="px-5 py-3 text-left">QR Serial</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Scans</th>
                <th className="px-5 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-gray-400 py-16 text-sm">
                    No guests found.
                  </td>
                </tr>
              ) : (
                paged.map((guest) => (
                  <tr key={guest.id} className="hover:bg-gray-50 transition">
                    <td className="px-5 py-3">
                      <p className="font-semibold text-gray-800">{guest.name}</p>
                      {guest.company && (
                        <p className="text-xs text-gray-400">{guest.company}</p>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <p className="text-gray-700">{guest.email}</p>
                      {guest.phone && <p className="text-xs text-gray-400">{guest.phone}</p>}
                    </td>
                    <td className="px-5 py-3">
                      {guest.qrSerial ? (
                        <div className="flex items-center gap-1.5 group">
                          <span className="font-mono text-xs text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-1 rounded-lg">
                            {guest.qrSerial}
                          </span>
                          <button
                            onClick={() => handleUnassignQR(guest.id)}
                            className="opacity-0 group-hover:opacity-100 p-1 rounded text-gray-300 hover:text-red-400 transition"
                            title="Unassign QR"
                          >
                            <X size={11} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => { setAssignGuestId(guest.id); setAssignSearch(""); }}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-dashed border-gray-300 text-xs text-gray-400 hover:border-indigo-400 hover:text-indigo-500 transition"
                        >
                          <QrCode size={11} />
                          Assign QR
                        </button>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <span className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-semibold capitalize",
                        statusColor[guest.status] ?? "bg-gray-100 text-gray-600"
                      )}>
                        {guest.status.replace("-", " ")}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-700 font-semibold">{guest.scans}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        {guest.status !== "checked-in" && (
                          <button
                            onClick={() => handleCheckIn(guest.id)}
                            className="p-1.5 rounded-lg hover:bg-green-50 text-gray-400 hover:text-green-600 transition"
                            title="Check In"
                          >
                            <CheckCircle2 size={15} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteGuest(guest.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition"
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <span>
            Page <strong className="text-gray-800">{page}</strong> of{" "}
            <strong className="text-gray-800">{totalPages}</strong>
            {filtered.length > 0 && ` · ${filtered.length} guests`}
          </span>
          <div className="flex gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 rounded-lg border border-gray-200 disabled:opacity-30 hover:border-gray-300 transition text-xs font-semibold"
            >
              Prev
            </button>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 rounded-lg border border-gray-200 disabled:opacity-30 hover:border-gray-300 transition text-xs font-semibold"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* ── Assign QR Modal ── */}
      {assignGuestId && assignGuest && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={(e) => { if (e.target === e.currentTarget) { setAssignGuestId(null); } }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div>
                <h2 className="text-base font-bold text-gray-900">Assign QR Code</h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Guest: <span className="text-indigo-600 font-semibold">{assignGuest.name}</span>
                </p>
              </div>
              <button
                onClick={() => setAssignGuestId(null)}
                className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 transition"
              >
                <X size={16} />
              </button>
            </div>

            {/* Search */}
            <div className="px-4 pt-4">
              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={assignSearch}
                  onChange={(e) => setAssignSearch(e.target.value)}
                  placeholder="Search serial…"
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:border-indigo-400"
                  autoFocus
                />
              </div>
            </div>

            {/* QR List */}
            <div className="px-4 pb-4 mt-3 max-h-72 overflow-y-auto space-y-2">
              {filteredAvailableQRs.length === 0 ? (
                <div className="text-center py-10 text-sm text-gray-400">
                  {availableQRs.length === 0
                    ? "No unassigned QR codes for this event. Generate some in Manage QR."
                    : "No matching QR codes."}
                </div>
              ) : (
                filteredAvailableQRs.map((qr) => (
                  <button
                    key={qr.id}
                    onClick={() => handleAssignQR(qr.serial)}
                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 transition group"
                  >
                    <span className="font-mono text-sm font-bold text-gray-800 group-hover:text-indigo-700">
                      {qr.serial}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(qr.generatedAt).toLocaleDateString()}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
