"use client";

import { useState, useRef, useMemo } from "react";
import { Download, RefreshCw, Plus, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Select from "@/components/ui/Select";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { TalentEvent, Guest, QROptions, QRDotStyle } from "@/types";
import { KEYS } from "@/lib/storage";
import { generateId } from "@/lib/utils";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const QRCode = dynamic(() => import("react-qr-code"), {
  ssr: false,
  loading: () => (
    <div className="w-40 h-40 bg-gray-100 rounded-xl animate-pulse" />
  ),
});

const DOT_STYLES: { value: QRDotStyle; label: string }[] = [
  { value: "square", label: "Square" },
  { value: "dots", label: "Dots" },
  { value: "rounded", label: "Rounded" },
  { value: "extra-rounded", label: "Extra Rounded" },
  { value: "classy", label: "Classy" },
];

export default function QRPage() {
  const [events] = useLocalStorage<TalentEvent[]>(KEYS.EVENTS, []);
  const [guests, setGuests] = useLocalStorage<Guest[]>(KEYS.GUESTS, []);

  const [selectedEventId, setSelectedEventId] = useState("");
  const [tab, setTab] = useState<"generate" | "bulk">("generate");

  const [options, setOptions] = useState<QROptions>({
    data: "https://talentyug.com/guest/demo",
    size: 200,
    dotStyle: "square",
    fgColor: "#005070",
    bgColor: "#ffffff",
    margin: 2,
    quantity: 1,
  });

  // For bulk guest generation
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");

  const eventOptions = useMemo(
    () => events.map((e) => ({ value: e.id, label: e.name })),
    [events]
  );

  const eventGuests = useMemo(
    () =>
      selectedEventId
        ? guests.filter((g) => g.eventId === selectedEventId)
        : [],
    [guests, selectedEventId]
  );

  const qrRef = useRef<HTMLDivElement>(null);

  function downloadQR() {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;
    const serialized = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([serialized], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `qr-${Date.now()}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function addGuest() {
    if (!selectedEventId || !guestName.trim() || !guestEmail.trim()) return;
    const guest: Guest = {
      id: generateId(),
      eventId: selectedEventId,
      name: guestName.trim(),
      email: guestEmail.trim().toLowerCase(),
      status: "pending",
      scans: 0,
      registeredAt: Date.now(),
      qrToken: generateId(),
    };
    setGuests((prev) => [...prev, guest]);
    setGuestName("");
    setGuestEmail("");
  }

  function removeGuest(id: string) {
    setGuests((prev) => prev.filter((g) => g.id !== id));
  }

  function update(key: keyof QROptions, value: unknown) {
    setOptions((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary">QR Generator</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Generate and manage QR codes for guest check-in
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit mb-6">
        {(["generate", "bulk"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-4 py-1.5 rounded-lg text-sm font-semibold capitalize transition",
              tab === t
                ? "bg-white text-primary shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            {t === "generate" ? "QR Generator" : "Guest QR Codes"}
          </button>
        ))}
      </div>

      {tab === "generate" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Config */}
          <div className="lg:col-span-2 space-y-5">
            <Card>
              <h2 className="font-semibold text-gray-900 mb-4">Content</h2>
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  QR Data (URL, text, or ID)
                </label>
                <input
                  value={options.data}
                  onChange={(e) => update("data", e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                  placeholder="https://talentyug.com/guest/…"
                />
              </div>
            </Card>

            <Card>
              <h2 className="font-semibold text-gray-900 mb-4">Style</h2>
              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Dot Style"
                  value={options.dotStyle}
                  onChange={(e) => update("dotStyle", e.target.value as QRDotStyle)}
                  options={DOT_STYLES}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Size (px)
                  </label>
                  <input
                    type="number"
                    min={100}
                    max={500}
                    value={options.size}
                    onChange={(e) => update("size", Number(e.target.value))}
                    className="w-full px-3.5 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Foreground Colour
                  </label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={options.fgColor}
                      onChange={(e) => update("fgColor", e.target.value)}
                      className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer"
                    />
                    <span className="text-sm text-gray-600 font-mono">
                      {options.fgColor}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Background Colour
                  </label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={options.bgColor}
                      onChange={(e) => update("bgColor", e.target.value)}
                      className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer"
                    />
                    <span className="text-sm text-gray-600 font-mono">
                      {options.bgColor}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Preview */}
          <Card className="sticky top-20 text-center">
            <span className="inline-block px-3 py-1 bg-accent/20 text-primary rounded-full text-xs font-bold mb-4">
              Live Preview
            </span>
            <div
              ref={qrRef}
              className="inline-flex p-4 border-2 border-dashed border-gray-200 rounded-2xl mb-5"
              style={{ background: options.bgColor }}
            >
              <QRCode
                value={options.data || "https://talentyug.com"}
                size={options.size}
                fgColor={options.fgColor}
                bgColor={options.bgColor}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => update("data", options.data + " ")}
                fullWidth
              >
                <RefreshCw size={14} /> Regenerate
              </Button>
              <Button size="sm" onClick={downloadQR} fullWidth>
                <Download size={14} /> Download
              </Button>
            </div>
          </Card>
        </div>
      ) : (
        /* Bulk guest QR codes */
        <div className="space-y-5">
          <Card>
            <h2 className="font-semibold text-gray-900 mb-4">Add Guest</h2>
            <div className="max-w-xl space-y-3">
              <Select
                label="Event"
                value={selectedEventId}
                onChange={(e) => setSelectedEventId(e.target.value)}
                options={eventOptions}
                placeholder="Select an event…"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  placeholder="Guest name"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-accent"
                />
                <input
                  placeholder="Email address"
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-accent"
                />
              </div>
              <Button onClick={addGuest} size="sm">
                <Plus size={14} /> Add Guest
              </Button>
            </div>
          </Card>

          {eventGuests.length > 0 && (
            <Card>
              <h2 className="font-semibold text-gray-900 mb-4">
                Guest QR Codes ({eventGuests.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {eventGuests.map((guest) => (
                  <div
                    key={guest.id}
                    className="border border-gray-100 rounded-2xl p-4 text-center relative"
                  >
                    <button
                      onClick={() => removeGuest(guest.id)}
                      className="absolute top-2 right-2 p-1 rounded-lg hover:bg-red-50 text-gray-300 hover:text-danger transition"
                    >
                      <Trash2 size={13} />
                    </button>
                    <div className="inline-flex p-2 border border-dashed border-gray-200 rounded-xl mb-3">
                      <QRCode
                        value={guest.qrToken}
                        size={100}
                        fgColor="#005070"
                        bgColor="#ffffff"
                      />
                    </div>
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {guest.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{guest.email}</p>
                    <span
                      className={cn(
                        "inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-semibold",
                        guest.status === "checked-in"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      )}
                    >
                      {guest.status}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}
    </>
  );
}
