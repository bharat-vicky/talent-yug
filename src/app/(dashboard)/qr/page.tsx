"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Zap, Download, Search, ChevronDown, ChevronUp, Check, Loader2, Printer } from "lucide-react";
import Card from "@/components/ui/Card";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { TalentEvent, QRCodeRecord, QRDotPattern, QRCornerFrame, QRCornerDot, QRGenerationMode } from "@/types";
import { KEYS } from "@/lib/storage";
import { generateId } from "@/lib/utils";
import { cn } from "@/lib/utils";

// ── Serial generator ──────────────────────────────────────────────────────────
function generateSerial(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";
  return Array.from({ length: 12 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

// ── qr-code-styling preview component ────────────────────────────────────────
interface PreviewProps {
  data: string;
  fgColor: string;
  bgColor: string;
  dotPattern: QRDotPattern;
  cornerFrame: QRCornerFrame;
  cornerDot: QRCornerDot;
  mode: QRGenerationMode;
  size?: number;
}

function QRStyled({ data, fgColor, bgColor, dotPattern, cornerFrame, cornerDot, size = 220 }: Omit<PreviewProps, "mode">) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;
    let cancelled = false;

    import("qr-code-styling").then(({ default: QRCodeStyling }) => {
      if (cancelled || !ref.current) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const qr = new (QRCodeStyling as any)({
        width: size,
        height: size,
        type: "svg",
        data: data.trim() || "https://talentyug.com",
        dotsOptions: { type: dotPattern, color: fgColor },
        backgroundOptions: { color: bgColor },
        cornersSquareOptions: { type: cornerFrame === "square" ? undefined : cornerFrame },
        cornersDotOptions: { type: cornerDot === "square" ? undefined : "dot" },
        qrOptions: { errorCorrectionLevel: "M" },
      });
      ref.current.innerHTML = "";
      qr.append(ref.current);
    }).catch(() => {});

    return () => { cancelled = true; };
  }, [data, fgColor, bgColor, dotPattern, cornerFrame, cornerDot, size]);

  return <div ref={ref} style={{ width: size, height: size }} className="inline-block" />;
}

function QRPreview({ data, fgColor, bgColor, dotPattern, cornerFrame, cornerDot, mode, size = 220 }: PreviewProps) {
  const inner = (
    <QRStyled
      data={data} fgColor={fgColor} bgColor={bgColor}
      dotPattern={dotPattern} cornerFrame={cornerFrame} cornerDot={cornerDot}
      size={size}
    />
  );

  if (mode === "circle") {
    const outer = size + 36;
    return (
      <div className="relative inline-flex items-center justify-center" style={{ width: outer, height: outer }}>
        <svg className="absolute inset-0 pointer-events-none" width={outer} height={outer} viewBox={`0 0 ${outer} ${outer}`}>
          <circle cx={outer / 2} cy={outer / 2} r={outer / 2 - 4} fill="none" stroke={fgColor} strokeWidth="2.5" strokeDasharray="6 9" />
        </svg>
        <div style={{ width: size, height: size, borderRadius: "50%", overflow: "hidden", background: bgColor, flexShrink: 0 }}>
          {inner}
        </div>
      </div>
    );
  }
  return inner;
}

// ── Pattern icon SVGs ─────────────────────────────────────────────────────────

function DotPatternIcon({ type, selected }: { type: QRDotPattern; selected: boolean }) {
  const f = selected ? "#fff" : "#94a3b8";
  const icons: Record<QRDotPattern, React.ReactNode> = {
    square:          <svg width={24} height={24} viewBox="0 0 24 24">{[2,13].map(x=>[2,13].map(y=><rect key={`${x}${y}`} x={x} y={y} width={8} height={8} fill={f}/>))}</svg>,
    dots:            <svg width={24} height={24} viewBox="0 0 24 24">{[6,18].map(cx=>[6,18].map(cy=><circle key={`${cx}${cy}`} cx={cx} cy={cy} r={4} fill={f}/>))}</svg>,
    rounded:         <svg width={24} height={24} viewBox="0 0 24 24">{[2,13].map(x=>[2,13].map(y=><rect key={`${x}${y}`} x={x} y={y} width={8} height={8} rx={3} fill={f}/>))}</svg>,
    "extra-rounded": <svg width={24} height={24} viewBox="0 0 24 24">{[2,13].map(x=>[2,13].map(y=><rect key={`${x}${y}`} x={x} y={y} width={9} height={9} rx={4.5} fill={f}/>))}</svg>,
    classy:          <svg width={24} height={24} viewBox="0 0 24 24"><rect x={2} y={2} width={8} height={3} fill={f}/><rect x={2} y={5} width={3} height={5} fill={f}/><rect x={14} y={14} width={8} height={3} fill={f}/><rect x={19} y={17} width={3} height={5} fill={f}/></svg>,
    "classy-rounded":<svg width={24} height={24} viewBox="0 0 24 24"><rect x={2} y={2} width={8} height={3} rx={1.5} fill={f}/><rect x={2} y={5} width={3} height={5} rx={1.5} fill={f}/><rect x={14} y={14} width={8} height={3} rx={1.5} fill={f}/><rect x={19} y={17} width={3} height={5} rx={1.5} fill={f}/></svg>,
  };
  return (
    <button className={cn("w-11 h-11 rounded-xl flex items-center justify-center border-2 transition",
      selected ? "border-indigo-500 bg-indigo-600" : "border-gray-200 bg-white hover:border-indigo-300"
    )}>
      {icons[type]}
    </button>
  );
}

function CornerFrameIcon({ type, selected }: { type: QRCornerFrame; selected: boolean }) {
  const col = selected ? "#fff" : "#94a3b8";
  const icons: Record<QRCornerFrame, React.ReactNode> = {
    square:          <svg width={24} height={24} viewBox="0 0 24 24"><rect x={3} y={3} width={18} height={18} rx={0} fill="none" stroke={col} strokeWidth="2.5"/></svg>,
    "extra-rounded": <svg width={24} height={24} viewBox="0 0 24 24"><rect x={3} y={3} width={18} height={18} rx={6} fill="none" stroke={col} strokeWidth="2.5"/></svg>,
    dot:             <svg width={24} height={24} viewBox="0 0 24 24"><circle cx={12} cy={12} r={9} fill="none" stroke={col} strokeWidth="2.5"/></svg>,
  };
  return (
    <button className={cn("w-11 h-11 rounded-xl flex items-center justify-center border-2 transition",
      selected ? "border-indigo-500 bg-indigo-600" : "border-gray-200 bg-white hover:border-indigo-300"
    )}>
      {icons[type]}
    </button>
  );
}

function CornerDotIcon({ type, selected }: { type: QRCornerDot; selected: boolean }) {
  const col = selected ? "#fff" : "#94a3b8";
  const icons: Record<QRCornerDot, React.ReactNode> = {
    square: <svg width={24} height={24} viewBox="0 0 24 24"><rect x={8} y={8} width={8} height={8} rx={0} fill={col}/></svg>,
    dot:    <svg width={24} height={24} viewBox="0 0 24 24"><circle cx={12} cy={12} r={5} fill={col}/></svg>,
  };
  return (
    <button className={cn("w-11 h-11 rounded-xl flex items-center justify-center border-2 transition",
      selected ? "border-indigo-500 bg-indigo-600" : "border-gray-200 bg-white hover:border-indigo-300"
    )}>
      {icons[type]}
    </button>
  );
}

// ── Accordion ─────────────────────────────────────────────────────────────────
function Accordion({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-gray-100">
      <button className="flex items-center justify-between w-full py-4 text-sm font-semibold text-gray-800"
        onClick={() => setOpen(!open)}>
        {title}
        {open ? <ChevronUp size={15} className="text-gray-400" /> : <ChevronDown size={15} className="text-gray-400" />}
      </button>
      {open && <div className="pb-5">{children}</div>}
    </div>
  );
}

// ── Constants ─────────────────────────────────────────────────────────────────
const PAGE_SIZE = 6;
const DOT_PATTERNS: QRDotPattern[] = ["square","dots","rounded","extra-rounded","classy","classy-rounded"];
const CORNER_FRAMES: QRCornerFrame[] = ["square","extra-rounded","dot"];
const CORNER_DOTS: QRCornerDot[] = ["square","dot"];

// ── Main page ─────────────────────────────────────────────────────────────────
export default function ManageQRPage() {
  const [events] = useLocalStorage<TalentEvent[]>(KEYS.EVENTS, []);
  const [qrCodes, setQrCodes] = useLocalStorage<QRCodeRecord[]>(KEYS.QR_CODES, []);

  const [selectedEventId, setSelectedEventId] = useState("");
  const [mode, setMode]           = useState<QRGenerationMode>("standard");
  const [quantity, setQuantity]   = useState(50);
  const [dotPattern, setDotPattern]   = useState<QRDotPattern>("square");
  const [cornerFrame, setCornerFrame] = useState<QRCornerFrame>("square");
  const [cornerDot, setCornerDot]     = useState<QRCornerDot>("square");
  const [fgColor, setFgColor]     = useState("#000000");
  const [bgColor, setBgColor]     = useState("#ffffff");
  const [generating, setGenerating]   = useState(false);
  const [justGenerated, setJustGenerated] = useState(false);
  const [printLoading, setPrintLoading]   = useState(false);

  // Generated codes grid filters
  const [search, setSearch]           = useState("");
  const [statusFilter, setStatusFilter] = useState<"all"|"new"|"used">("all");
  const [sortOrder, setSortOrder]     = useState<"newest"|"oldest">("newest");
  const [page, setPage]               = useState(1);

  useEffect(() => {
    if (!selectedEventId && events.length > 0) setSelectedEventId(events[0].id);
  }, [events, selectedEventId]);

  const selectedEvent = useMemo(() => events.find(e => e.id === selectedEventId), [events, selectedEventId]);
  const eventIdx      = events.findIndex(e => e.id === selectedEventId);

  const eventQRCodes = useMemo(() => qrCodes.filter(q => q.eventId === selectedEventId), [qrCodes, selectedEventId]);

  const stats = useMemo(() => ({
    total: eventQRCodes.length,
    used:  eventQRCodes.filter(q => q.status === "used").length,
    new:   eventQRCodes.filter(q => q.status === "new").length,
  }), [eventQRCodes]);

  const filteredCodes = useMemo(() => {
    let list = eventQRCodes;
    if (search.trim()) list = list.filter(c => c.serial.includes(search.trim().toUpperCase()));
    if (statusFilter !== "all") list = list.filter(c => c.status === statusFilter);
    return [...list].sort((a, b) =>
      sortOrder === "newest" ? b.generatedAt - a.generatedAt : a.generatedAt - b.generatedAt
    );
  }, [eventQRCodes, search, statusFilter, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredCodes.length / PAGE_SIZE));
  const pagedCodes = filteredCodes.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => { setPage(1); }, [search, statusFilter, sortOrder, selectedEventId]);

  const previewData = selectedEvent
    ? `https://talentyug.com/check-in/${selectedEvent.id}`
    : "https://talentyug.com";

  // ── Generate batch ──────────────────────────────────────────────────────────
  function handleGenerate() {
    if (!selectedEventId || generating) return;
    setGenerating(true);
    setTimeout(() => {
      const ts = Date.now();
      const newCodes: QRCodeRecord[] = Array.from({ length: Math.min(quantity, 200) }, () => ({
        id: generateId(), serial: generateSerial(), eventId: selectedEventId,
        status: "new" as const, generatedAt: ts,
        mode, dotPattern, cornerFrame, cornerDot, fgColor, bgColor,
      }));
      setQrCodes(prev => [...prev, ...newCodes]);
      setGenerating(false);
      setJustGenerated(true);
      setTimeout(() => setJustGenerated(false), 2500);
    }, 600);
  }

  // ── Sticker print sheet ─────────────────────────────────────────────────────
  async function handlePrintStickers(codes: QRCodeRecord[]) {
    if (codes.length === 0) return;
    setPrintLoading(true);
    try {
      const QRCodeLib = (await import("qrcode")).default;
      const eventName = selectedEvent?.name ?? "Event";

      const items = await Promise.all(
        codes.map(async (code) => {
          const url = `https://talentyug.com/check-in/${code.serial}`;
          if (code.mode === "circle") {
            // Generate with circular clip on canvas
            const tmpCanvas = document.createElement("canvas");
            await QRCodeLib.toCanvas(tmpCanvas, url, {
              width: 200, margin: 1,
              color: { dark: code.fgColor, light: code.bgColor },
            });
            const circle = document.createElement("canvas");
            circle.width = 200; circle.height = 200;
            const ctx = circle.getContext("2d")!;
            ctx.beginPath();
            ctx.arc(100, 100, 100, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(tmpCanvas, 0, 0);
            return { serial: code.serial, dataUrl: circle.toDataURL("image/png") };
          } else {
            const dataUrl = await QRCodeLib.toDataURL(url, {
              width: 200, margin: 1,
              color: { dark: code.fgColor, light: code.bgColor },
            });
            return { serial: code.serial, dataUrl };
          }
        })
      );

      const stickers = items.map(({ serial, dataUrl }) => `
        <div class="sticker">
          <img src="${dataUrl}" alt="${serial}" />
          <div class="serial">${serial}</div>
          <div class="event">${eventName}</div>
        </div>`).join("");

      const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>QR Stickers — ${eventName}</title>
  <style>
    @page { margin: 10mm; size: A4; }
    * { box-sizing: border-box; }
    body { font-family: -apple-system, Helvetica, sans-serif; background: #fff; margin: 0; padding: 16px; }
    h2 { font-size: 13px; color: #444; margin: 0 0 14px; }
    .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
    .sticker { border: 1px dashed #ccc; border-radius: 8px; padding: 10px 8px; text-align: center; break-inside: avoid; }
    .sticker img { width: 100%; max-width: 140px; display: block; margin: 0 auto; }
    .serial { font-family: monospace; font-size: 9px; color: #222; margin-top: 5px; letter-spacing: 0.5px; font-weight: 700; }
    .event  { font-size: 8px; color: #999; margin-top: 2px; }
    .actions { position: fixed; top: 12px; right: 12px; display: flex; gap: 8px; }
    .btn { padding: 8px 18px; border: none; border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 600; }
    .btn-print { background: #4f46e5; color: #fff; }
    .btn-close { background: #f1f5f9; color: #333; }
    @media print { .actions { display: none !important; } }
  </style>
</head>
<body>
  <div class="actions">
    <button class="btn btn-print" onclick="window.print()">🖨 Print</button>
    <button class="btn btn-close" onclick="window.close()">Close</button>
  </div>
  <h2>QR Sticker Sheet — ${eventName} (${items.length} codes)</h2>
  <div class="grid">${stickers}</div>
</body>
</html>`;

      const blob = new Blob([html], { type: "text/html" });
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, "_blank");
      setTimeout(() => URL.revokeObjectURL(blobUrl), 60000);
    } finally {
      setPrintLoading(false);
    }
  }

  return (
    <>
      {/* ── Header: event tabs + stats ── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          {events.length === 0 ? (
            <p className="text-sm text-gray-500">No events found. Create an event first.</p>
          ) : (
            <div className="flex items-center gap-2 flex-wrap">
              {events.map(e => (
                <button key={e.id} onClick={() => setSelectedEventId(e.id)}
                  className={cn("px-4 py-1.5 rounded-full text-sm font-semibold transition border",
                    e.id === selectedEventId
                      ? "bg-primary text-white border-primary"
                      : "border-gray-200 text-gray-600 hover:border-primary hover:text-primary"
                  )}>
                  {e.name}
                </button>
              ))}
            </div>
          )}
          {selectedEvent && (
            <p className="text-xs text-gray-400 mt-1.5">
              Event ID: <span className="text-indigo-500 font-semibold">#{eventIdx + 1}</span>
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="flex gap-3 shrink-0">
          {[
            { label: "TOTAL", value: stats.total, color: "text-gray-900" },
            { label: "USED",  value: stats.used,  color: "text-green-600" },
            { label: "NEW",   value: stats.new,   color: "text-indigo-600" },
          ].map(s => (
            <div key={s.label} className="bg-white border border-gray-200 rounded-xl px-5 py-3 text-center min-w-[68px] shadow-sm">
              <p className="text-[9px] font-bold text-gray-400 tracking-widest mb-0.5">{s.label}</p>
              <p className={cn("text-2xl font-bold", s.color)}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Config Panel ── */}
        <Card className="lg:col-span-2">
          {/* Generation Mode + Quantity */}
          <div className="grid grid-cols-2 gap-5 mb-2">
            <div>
              <p className="text-[10px] font-bold text-gray-400 tracking-widest mb-2.5">GENERATION MODE</p>
              <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
                {(["standard", "circle"] as QRGenerationMode[]).map(m => (
                  <button key={m} onClick={() => setMode(m)}
                    className={cn("flex-1 py-2 rounded-lg text-sm font-semibold capitalize transition",
                      mode === m ? "bg-white text-primary shadow-sm" : "text-gray-500 hover:text-gray-700"
                    )}>
                    {m === "standard" ? "Standard" : "Circle Template"}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 tracking-widest mb-2.5">QUANTITY (MAX 200)</p>
              <input type="number" min={1} max={200} value={quantity}
                onChange={e => setQuantity(Math.min(200, Math.max(1, Number(e.target.value))))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          {/* Style & Pattern */}
          <Accordion title="Style & Pattern" defaultOpen>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 font-medium mb-2.5">Data Pattern</p>
                <div className="flex gap-2 flex-wrap">
                  {DOT_PATTERNS.map(p => (
                    <div key={p} onClick={() => setDotPattern(p)}>
                      <DotPatternIcon type={p} selected={dotPattern === p} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-2.5">Corner Frame</p>
                  <div className="flex gap-2">
                    {CORNER_FRAMES.map(f => (
                      <div key={f} onClick={() => setCornerFrame(f)}>
                        <CornerFrameIcon type={f} selected={cornerFrame === f} />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-2.5">Corner Center</p>
                  <div className="flex gap-2">
                    {CORNER_DOTS.map(d => (
                      <div key={d} onClick={() => setCornerDot(d)}>
                        <CornerDotIcon type={d} selected={cornerDot === d} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Accordion>

          {/* Colors */}
          <Accordion title="Colors">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Foreground (QR color)", value: fgColor, set: setFgColor },
                { label: "Background",            value: bgColor, set: setBgColor },
              ].map(({ label, value, set }) => (
                <div key={label} className="flex items-center gap-3">
                  <input type="color" value={value} onChange={e => set(e.target.value)}
                    className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-0.5 bg-white"
                  />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">{label}</p>
                    <p className="text-sm text-gray-800 font-mono">{value.toUpperCase()}</p>
                  </div>
                </div>
              ))}
            </div>
          </Accordion>

          {/* Logo Branding */}
          <Accordion title="Logo Branding">
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
              <p className="text-xs text-gray-400">Logo embedding coming soon</p>
            </div>
          </Accordion>

          {/* Generate button */}
          <div className="mt-5 pt-4 border-t border-gray-100">
            {!selectedEventId && (
              <p className="text-xs text-amber-500 mb-2">Select an event above to generate codes.</p>
            )}
            <button onClick={handleGenerate} disabled={!selectedEventId || generating}
              className={cn("w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition",
                selectedEventId && !generating
                  ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              )}>
              {generating
                ? <><Loader2 size={17} className="animate-spin" /> Generating…</>
                : justGenerated
                  ? <><Check size={17} /> Generated Successfully!</>
                  : <><Zap size={17} /> Generate QR Codes</>}
            </button>
          </div>
        </Card>

        {/* ── Live Preview ── */}
        <Card className="flex flex-col items-center sticky top-20">
          <div className="flex items-center gap-2 mb-5 self-start">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-bold text-gray-800">Live Preview</span>
          </div>
          <div className="flex-1 flex items-center justify-center py-2">
            <QRPreview
              data={previewData} fgColor={fgColor} bgColor={bgColor}
              dotPattern={dotPattern} cornerFrame={cornerFrame} cornerDot={cornerDot}
              mode={mode} size={190}
            />
          </div>
          <p className="text-xs text-gray-400 mt-4 text-center">
            This is how your QR codes will look.
          </p>
        </Card>
      </div>

      {/* ── Generated Codes Grid ── */}
      {eventQRCodes.length > 0 && (
        <div className="mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Generated Codes ({eventQRCodes.length})
              </h2>
              <p className="text-sm text-gray-400 mt-0.5">Managing your batch.</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <div className="relative flex-1 min-w-[160px] max-w-xs">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value.toUpperCase())}
                placeholder="Search serial…"
                className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:border-indigo-400 bg-white"
              />
            </div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as "all"|"new"|"used")}
              className="px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:border-indigo-400 bg-white">
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
            <select value={sortOrder} onChange={e => setSortOrder(e.target.value as "newest"|"oldest")}
              className="px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:border-indigo-400 bg-white">
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
            <button
              onClick={() => handlePrintStickers(filteredCodes)}
              disabled={filteredCodes.length === 0 || printLoading}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition",
                filteredCodes.length > 0 && !printLoading
                  ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              )}>
              {printLoading
                ? <><Loader2 size={14} className="animate-spin" /> Preparing…</>
                : <><Printer size={14} /> Print Stickers ({filteredCodes.length})</>}
            </button>
            <button
              onClick={() => handlePrintStickers(pagedCodes)}
              disabled={pagedCodes.length === 0 || printLoading}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition border",
                pagedCodes.length > 0 && !printLoading
                  ? "border-indigo-300 text-indigo-600 hover:bg-indigo-50"
                  : "border-gray-200 text-gray-400 cursor-not-allowed"
              )}>
              <Download size={14} /> This Page
            </button>
          </div>

          {/* Grid */}
          {pagedCodes.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-12">No codes match your filters.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {pagedCodes.map(code => (
                <QRCard key={code.id} code={code} eventId={selectedEventId} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}
              className="text-sm font-semibold text-gray-500 disabled:opacity-30 hover:text-gray-800 transition">
              &lt; Prev
            </button>
            <span className="text-sm text-gray-600">
              Page <strong>{page}</strong> / {totalPages}
            </span>
            <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}
              className="text-sm font-semibold text-gray-500 disabled:opacity-30 hover:text-gray-800 transition">
              Next &gt;
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ── QR Card ───────────────────────────────────────────────────────────────────
function QRCard({ code, eventId: _eventId }: { code: QRCodeRecord; eventId: string }) {
  const data = `https://talentyug.com/check-in/${code.serial}`;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden text-center shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-center p-3 bg-gray-50">
        {code.mode === "circle" ? (
          <div style={{ width: 120, height: 120, borderRadius: "50%", overflow: "hidden", background: code.bgColor, flexShrink: 0 }}>
            <QRStyled data={data} fgColor={code.fgColor} bgColor={code.bgColor}
              dotPattern={code.dotPattern} cornerFrame={code.cornerFrame} cornerDot={code.cornerDot} size={120} />
          </div>
        ) : (
          <QRStyled data={data} fgColor={code.fgColor} bgColor={code.bgColor}
            dotPattern={code.dotPattern} cornerFrame={code.cornerFrame} cornerDot={code.cornerDot} size={120} />
        )}
      </div>
      <div className="px-2 py-2.5">
        <span className={cn("inline-block px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider mb-1.5",
          code.status === "new" ? "bg-indigo-50 text-indigo-600" : "bg-green-50 text-green-700"
        )}>
          {code.status.toUpperCase()}
        </span>
        <p className="text-[10px] text-gray-500 font-mono break-all leading-tight">{code.serial}</p>
      </div>
    </div>
  );
}
