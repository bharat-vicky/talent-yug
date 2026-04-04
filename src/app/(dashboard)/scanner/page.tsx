"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  Settings, Search, CheckCircle2, XCircle, Play, Square,
  FlipHorizontal2, Users, ScanLine, Clock,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import Select from "@/components/ui/Select";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { TalentEvent, Guest, ScanLog, QRCodeRecord } from "@/types";
import { KEYS } from "@/lib/storage";
import { generateId, formatDateTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

// Extract serial from a scanned QR value
// Handles: full URLs like "https://talentyug.com/check-in/SERIAL123", raw serials
function extractSerial(raw: string): string {
  const trimmed = raw.trim();
  if (trimmed.includes("/")) {
    return trimmed.split("/").pop()?.toUpperCase() ?? trimmed.toUpperCase();
  }
  return trimmed.toUpperCase();
}

// ── Scan result toast ────────────────────────────────────────────────────────
function ScanToast({ result, onDismiss }: { result: { success: boolean; message: string; name?: string } | null; onDismiss: () => void }) {
  useEffect(() => {
    if (!result) return;
    const t = setTimeout(onDismiss, 3500);
    return () => clearTimeout(t);
  }, [result, onDismiss]);

  if (!result) return null;

  return (
    <div className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-semibold animate-fade-in",
      result.success
        ? "bg-green-50 border-green-200 text-green-800"
        : "bg-red-50 border-red-200 text-red-700"
    )}>
      {result.success
        ? <CheckCircle2 size={20} className="text-green-600 shrink-0" />
        : <XCircle size={20} className="text-red-500 shrink-0" />}
      <div>
        {result.name && <p className="font-bold">{result.name}</p>}
        <p className={result.name ? "text-xs font-normal opacity-80" : ""}>{result.message}</p>
      </div>
    </div>
  );
}

export default function ScannerPage() {
  const [events]  = useLocalStorage<TalentEvent[]>(KEYS.EVENTS, []);
  const [guests, setGuests]    = useLocalStorage<Guest[]>(KEYS.GUESTS, []);
  const [qrCodes, setQrCodes]  = useLocalStorage<QRCodeRecord[]>(KEYS.QR_CODES, []);
  const [logs, setLogs]        = useLocalStorage<ScanLog[]>(KEYS.SCAN_LOGS, []);

  const [selectedEventId, setSelectedEventId] = useState("");
  const [search, setSearch]       = useState("");
  const [manualInput, setManualInput] = useState("");
  const [scanResult, setScanResult]   = useState<{ success: boolean; message: string; name?: string } | null>(null);

  // Camera
  const [cameraOn, setCameraOn]   = useState(false);
  const [facing, setFacing]       = useState<"environment" | "user">("environment");
  const [cameraError, setCameraError] = useState("");
  const videoRef   = useRef<HTMLVideoElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const streamRef  = useRef<MediaStream | null>(null);
  const rafRef     = useRef<number | null>(null);
  const lastRef    = useRef({ serial: "", at: 0 });
  const manualRef  = useRef<HTMLInputElement>(null);

  const eventOptions = useMemo(
    () => events.map(e => ({ value: e.id, label: e.name })),
    [events]
  );

  const selectedEvent = useMemo(
    () => events.find(e => e.id === selectedEventId),
    [events, selectedEventId]
  );

  const eventGuests = useMemo(() =>
    guests
      .filter(g => !selectedEventId || g.eventId === selectedEventId)
      .filter(g => {
        if (!search.trim()) return false; // only show when searching
        const q = search.toLowerCase();
        return g.name.toLowerCase().includes(q) || g.email.toLowerCase().includes(q);
      }),
    [guests, selectedEventId, search]
  );

  const recentLogs = useMemo(() =>
    logs
      .filter(l => !selectedEventId || l.eventId === selectedEventId)
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 15),
    [logs, selectedEventId]
  );

  const stats = useMemo(() => {
    const list = selectedEventId ? guests.filter(g => g.eventId === selectedEventId) : guests;
    const qrs  = selectedEventId ? qrCodes.filter(q => q.eventId === selectedEventId) : qrCodes;
    return {
      totalQRs:   qrs.length,
      scanned:    qrs.filter(q => q.status === "used").length,
      remaining:  qrs.filter(q => q.status === "new").length,
      totalGuests: list.length,
      checkedIn:  list.filter(g => g.status === "checked-in").length,
    };
  }, [guests, qrCodes, selectedEventId]);

  // ── Core check-in logic ──────────────────────────────────────────────────
  const processCheckIn = useCallback(
    (rawValue: string) => {
      const serial = extractSerial(rawValue);
      if (!serial) return;

      // Deduplicate rapid scans (2s cooldown)
      if (serial === lastRef.current.serial && Date.now() - lastRef.current.at < 2000) return;
      lastRef.current = { serial, at: Date.now() };

      // 1. Find batch QR record by serial
      const batchQR = qrCodes.find(
        q => q.serial === serial && (!selectedEventId || q.eventId === selectedEventId)
      );

      // 2. Find guest linked to this serial (or by qrToken)
      const guest = guests.find(
        g => (!selectedEventId || g.eventId === selectedEventId) &&
          (g.qrSerial === serial || g.qrToken === rawValue.trim() || g.qrToken === serial)
      );

      if (!batchQR && !guest) {
        setScanResult({ success: false, message: `QR not found: ${serial}` });
        return;
      }

      if (batchQR?.status === "used" && !guest) {
        setScanResult({ success: false, message: `QR ${serial} already scanned.` });
        return;
      }

      if (guest?.status === "checked-in") {
        setScanResult({ success: false, message: "Already checked in.", name: guest.name });
        return;
      }

      // Mark batch QR as used
      if (batchQR && batchQR.status === "new") {
        setQrCodes(prev => prev.map(q =>
          q.id === batchQR.id
            ? { ...q, status: "used" as const, usedAt: Date.now(), usedBy: guest?.id }
            : q
        ));
      }

      // Check in guest if found
      if (guest) {
        setGuests(prev => prev.map(g =>
          g.id === guest.id
            ? { ...g, status: "checked-in" as const, scans: g.scans + 1, checkedInAt: Date.now() }
            : g
        ));

        const log: ScanLog = {
          id: generateId(),
          eventId: guest.eventId,
          guestId: guest.id,
          guestName: guest.name,
          timestamp: Date.now(),
          action: "check-in",
        };
        setLogs(prev => [log, ...prev]);
        setScanResult({ success: true, message: "Checked in successfully!", name: guest.name });
      } else {
        // Batch QR scanned — no guest linked, attendance recorded via QR usage
        const log: ScanLog = {
          id: generateId(),
          eventId: batchQR!.eventId,
          guestId: "—",
          guestName: `QR: ${serial}`,
          timestamp: Date.now(),
          action: "check-in",
        };
        setLogs(prev => [log, ...prev]);
        setScanResult({ success: true, message: `QR ${serial} marked as used. Attendance recorded.` });
      }
    },
    [guests, qrCodes, selectedEventId, setGuests, setQrCodes, setLogs]
  );

  // ── Camera management ────────────────────────────────────────────────────
  async function startCamera(facingModeOverride?: "environment" | "user") {
    setCameraError("");
    const f = facingModeOverride ?? facing;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: f, width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraOn(true);
    } catch {
      setCameraError("Camera access denied or unavailable on this device.");
    }
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraOn(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }

  async function flipCamera() {
    const next: "environment" | "user" = facing === "environment" ? "user" : "environment";
    setFacing(next);
    stopCamera();
    await new Promise(r => setTimeout(r, 150));
    startCamera(next);
  }

  // QR scan loop
  useEffect(() => {
    if (!cameraOn) return;
    let active = true;

    const tick = async () => {
      if (!active) return;
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (video && canvas && video.readyState === video.HAVE_ENOUGH_DATA) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          canvas.width  = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0);
          try {
            const { default: jsQR } = await import("jsqr");
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imgData.data, imgData.width, imgData.height, { inversionAttempts: "dontInvert" });
            if (code?.data) processCheckIn(code.data);
          } catch { /* ignore */ }
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      active = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [cameraOn, processCheckIn]);

  useEffect(() => () => stopCamera(), []);

  function handleManualSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (manualInput.trim()) {
      processCheckIn(manualInput.trim());
      setManualInput("");
    }
  }

  return (
    <>
      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className={cn(
              "inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wide",
              cameraOn
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-gray-100 text-gray-500 border-gray-200"
            )}>
              <span className={cn("w-1.5 h-1.5 rounded-full", cameraOn ? "bg-green-500 animate-pulse" : "bg-gray-400")} />
              {cameraOn ? "Camera On" : "Camera Off"}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Scan QR Code</h1>
          {selectedEvent && (
            <p className="text-sm text-gray-500 mt-0.5">
              Event: <span className="text-indigo-600 font-semibold">{selectedEvent.name}</span>
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Select label="" value={selectedEventId}
            onChange={e => setSelectedEventId(e.target.value)}
            options={eventOptions} placeholder="All Events"
          />
          <Link href="/scanner/settings"
            className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:text-primary hover:border-primary transition">
            <Settings size={16} />
          </Link>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        {[
          { label: "Total QRs",   value: stats.totalQRs,    icon: <ScanLine size={15} />, color: "text-gray-900" },
          { label: "Scanned",     value: stats.scanned,     icon: <CheckCircle2 size={15}/>, color: "text-green-600" },
          { label: "Remaining",   value: stats.remaining,   icon: <Clock size={15}/>,     color: "text-indigo-600" },
          { label: "Guests",      value: stats.totalGuests, icon: <Users size={15}/>,     color: "text-gray-900" },
          { label: "Checked In",  value: stats.checkedIn,   icon: <CheckCircle2 size={15}/>, color: "text-green-600" },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
            <div className="flex items-center gap-1.5 text-gray-400 mb-1">{s.icon}
              <span className="text-[10px] font-bold uppercase tracking-wide">{s.label}</span>
            </div>
            <p className={cn("text-2xl font-bold", s.color)}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── Left: Camera + Manual ── */}
        <div className="space-y-4">
          {/* Camera viewport */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="relative bg-black" style={{ aspectRatio: "4/3", maxHeight: 360 }}>
              <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
              <canvas ref={canvasRef} className="hidden" />

              {/* Corner bracket decorations */}
              {[
                "top-3 left-3 border-t-2 border-l-2",
                "top-3 right-3 border-t-2 border-r-2",
                "bottom-3 left-3 border-b-2 border-l-2",
                "bottom-3 right-3 border-b-2 border-r-2",
              ].map((cls, i) => (
                <div key={i} className={cn("absolute w-7 h-7 pointer-events-none border-indigo-500", cls)} />
              ))}

              {/* Horizontal scan line */}
              {cameraOn && (
                <div className="absolute left-6 right-6 h-0.5 bg-indigo-400/80 shadow-glow" style={{ top: "50%", animation: "scanline 2s ease-in-out infinite" }} />
              )}

              {!cameraOn && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                  <ScanLine size={32} className="mb-2 opacity-40" />
                  <p className="text-sm">Press START to activate camera</p>
                </div>
              )}
            </div>

            {cameraError && (
              <div className="flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 text-xs border-t border-red-100">
                <XCircle size={14} /> {cameraError}
              </div>
            )}

            <div className="flex gap-2 p-4">
              <button onClick={() => startCamera()} disabled={cameraOn}
                className={cn("flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition",
                  !cameraOn ? "bg-green-600 hover:bg-green-500 text-white" : "bg-gray-100 text-gray-400 cursor-not-allowed"
                )}>
                <Play size={15} /> START
              </button>
              <button onClick={stopCamera} disabled={!cameraOn}
                className={cn("flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition",
                  cameraOn ? "bg-red-600 hover:bg-red-500 text-white" : "bg-gray-100 text-gray-400 cursor-not-allowed"
                )}>
                <Square size={15} /> STOP
              </button>
              <button onClick={flipCamera}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold bg-gray-200 hover:bg-gray-300 text-gray-700 transition">
                <FlipHorizontal2 size={15} /> FLIP
              </button>
            </div>
          </div>

          {/* Scan result toast */}
          {scanResult && (
            <ScanToast result={scanResult} onDismiss={() => setScanResult(null)} />
          )}

          {/* Manual check-in input */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-gray-800 mb-3">Manual Check-in</h3>
            <p className="text-xs text-gray-400 mb-3">
              Enter a QR serial number (e.g. <code className="bg-gray-100 px-1 rounded">XN480UR3RRM9</code>) or scan with a barcode reader.
            </p>
            <form onSubmit={handleManualSubmit} className="flex gap-2">
              <input
                ref={manualRef}
                type="text"
                value={manualInput}
                onChange={e => setManualInput(e.target.value.toUpperCase())}
                placeholder="Enter serial or QR token…"
                className="flex-1 px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 font-mono"
              />
              <button type="submit"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition">
                Check In
              </button>
            </form>
          </div>
        </div>

        {/* ── Right: Guest search + Live activity ── */}
        <div className="space-y-4">
          {/* Guest search */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-gray-800 mb-3">Search & Check In Guest</h3>
            <div className="relative mb-3">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                placeholder="Search by name or email…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 outline-none focus:border-indigo-400"
              />
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {search.trim() === "" ? (
                <p className="text-xs text-gray-400 text-center py-6">
                  Start typing to find and check in a guest.
                </p>
              ) : eventGuests.length === 0 ? (
                <p className="text-xs text-gray-400 text-center py-4">No guests found.</p>
              ) : (
                eventGuests.map(guest => (
                  <div key={guest.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">{guest.name}</p>
                      <p className="text-xs text-gray-500 truncate">{guest.email}</p>
                      {guest.qrSerial && (
                        <p className="text-[10px] text-gray-400 font-mono mt-0.5">{guest.qrSerial}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant={guest.status === "checked-in" ? "success" : "warning"} dot>
                        {guest.status === "checked-in" ? "In" : "Pending"}
                      </Badge>
                      {guest.status !== "checked-in" && (
                        <button
                          onClick={() => processCheckIn(guest.qrSerial ?? guest.qrToken)}
                          className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition">
                          Check In
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Live Activity */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-800">Live Activity</h3>
              <span className="text-xs text-gray-400">{recentLogs.length} recent</span>
            </div>
            {recentLogs.length === 0 ? (
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-100">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                <span className="text-sm text-gray-400">Ready to scan…</span>
              </div>
            ) : (
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {recentLogs.map(log => (
                  <div key={log.id}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={14} className="text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">{log.guestName}</p>
                      <p className="text-xs text-gray-400">{formatDateTime(log.timestamp)}</p>
                    </div>
                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold shrink-0">
                      CHECKED IN
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scan line CSS */}
      <style jsx>{`
        @keyframes scanline {
          0%   { top: 20%; }
          50%  { top: 80%; }
          100% { top: 20%; }
        }
      `}</style>
    </>
  );
}
