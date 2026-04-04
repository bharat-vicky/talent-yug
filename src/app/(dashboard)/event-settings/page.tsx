"use client";

import { useState, useMemo } from "react";
import {
  Plus, GripVertical, Trash2, ChevronDown, ToggleLeft, ToggleRight,
} from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { TalentEvent, FormField, FieldType } from "@/types";
import { KEYS } from "@/lib/storage";
import { generateId } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Tab = "check-in" | "profile" | "sponsors";

// Smart field type detection
function detectFieldType(label: string): FieldType {
  const l = label.toLowerCase();
  if (l.includes("email")) return "email";
  if (l.includes("phone") || l.includes("mobile")) return "phone";
  if (l.includes("website") || l.includes("url")) return "text";
  return "text";
}

const FIELD_TYPE_OPTIONS: { value: FieldType; label: string }[] = [
  { value: "text", label: "Short Text" },
  { value: "textarea", label: "Long Text" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "number", label: "Number" },
  { value: "date", label: "Date" },
  { value: "select", label: "Dropdown" },
  { value: "radio", label: "Radio Buttons" },
  { value: "checkbox", label: "Checkboxes" },
];

interface CheckInFormSettings {
  eventId: string;
  title: string;
  published: boolean;
  fields: FormField[];
  updatedAt: number;
}

export default function EventSettingsPage() {
  const [events] = useLocalStorage<TalentEvent[]>(KEYS.EVENTS, []);
  const [checkInForms, setCheckInForms] = useLocalStorage<CheckInFormSettings[]>(
    "ty_checkin_forms",
    []
  );

  const [selectedEventId, setSelectedEventId] = useState(() => "");
  const [activeTab, setActiveTab] = useState<Tab>("check-in");
  const [saved, setSaved] = useState(false);

  const selectedEvent = useMemo(
    () => events.find((e) => e.id === selectedEventId),
    [events, selectedEventId]
  );

  const currentForm = useMemo(
    () => checkInForms.find((f) => f.eventId === selectedEventId) ?? null,
    [checkInForms, selectedEventId]
  );

  // Local editable state
  const [formTitle, setFormTitle] = useState(currentForm?.title ?? "");
  const [published, setPublished] = useState(currentForm?.published ?? false);
  const [fields, setFields] = useState<FormField[]>(currentForm?.fields ?? []);

  // Sync when event changes
  useMemo(() => {
    const form = checkInForms.find((f) => f.eventId === selectedEventId);
    setFormTitle(form?.title ?? (selectedEvent ? `${selectedEvent.name} Registration` : ""));
    setPublished(form?.published ?? false);
    setFields(form?.fields ?? []);
    setSaved(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEventId]);

  function saveForm() {
    if (!selectedEventId) return;
    const updated: CheckInFormSettings = {
      eventId: selectedEventId,
      title: formTitle,
      published,
      fields,
      updatedAt: Date.now(),
    };
    setCheckInForms((prev) => {
      const idx = prev.findIndex((f) => f.eventId === selectedEventId);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = updated;
        return next;
      }
      return [...prev, updated];
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function addField() {
    setFields((prev) => [
      ...prev,
      { id: generateId(), type: "text", label: "", placeholder: "", required: false },
    ]);
  }

  function updateField(id: string, patch: Partial<FormField>) {
    setFields((prev) =>
      prev.map((f) => {
        if (f.id !== id) return f;
        const updated = { ...f, ...patch };
        // Smart type detection
        if (patch.label !== undefined) {
          updated.type = detectFieldType(patch.label);
        }
        return updated;
      })
    );
    setSaved(false);
  }

  function removeField(id: string) {
    setFields((prev) => prev.filter((f) => f.id !== id));
    setSaved(false);
  }

  function moveField(id: string, dir: -1 | 1) {
    setFields((prev) => {
      const idx = prev.findIndex((f) => f.id === id);
      if (idx < 0) return prev;
      const next = [...prev];
      const target = idx + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "check-in", label: "Check-in Form" },
    { key: "profile", label: "Public Profile" },
    { key: "sponsors", label: "Sponsors" },
  ];

  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Event Settings</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          For event:{" "}
          {selectedEvent ? (
            <span className="text-indigo-500 font-semibold">{selectedEvent.name}</span>
          ) : (
            <span className="text-gray-400">none selected</span>
          )}
        </p>
      </div>

      {/* Event selector */}
      {events.length === 0 ? (
        <p className="text-sm text-gray-500">No events found. Create an event first.</p>
      ) : (
        <div className="flex items-center gap-2 flex-wrap mb-6">
          {events.map((e) => (
            <button
              key={e.id}
              onClick={() => setSelectedEventId(e.id)}
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

      {selectedEventId && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={cn(
                    "px-4 py-2.5 text-sm font-semibold transition border-b-2 -mb-px",
                    activeTab === t.key
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {activeTab === "check-in" && (
              <div className="space-y-5">
                {/* General Settings */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
                  <h2 className="text-base font-bold text-gray-900 mb-4">General Settings</h2>
                  <div className="h-px bg-gray-100 mb-5" />
                  <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-gray-500 mb-2">Form Title</label>
                      <input
                        value={formTitle}
                        onChange={(e) => { setFormTitle(e.target.value); setSaved(false); }}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-indigo-400"
                        placeholder="e.g. Registration Form"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-2">Status</label>
                      <button
                        onClick={() => { setPublished(!published); setSaved(false); }}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-gray-200 hover:border-indigo-300 transition"
                      >
                        {published ? (
                          <ToggleRight size={22} className="text-indigo-600" />
                        ) : (
                          <ToggleLeft size={22} className="text-gray-400" />
                        )}
                        <span className={cn("text-sm font-semibold", published ? "text-indigo-600" : "text-gray-500")}>
                          {published ? "Live / Published" : "Draft"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-bold text-gray-900">Form Fields</h2>
                    <span className="text-xs text-indigo-500 font-semibold">Drag to Reorder</span>
                  </div>
                  <div className="h-px bg-gray-100 mb-5" />

                  {fields.length === 0 ? (
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
                      <p className="text-sm text-gray-400">No fields added yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-3 mb-4">
                      {fields.map((field, idx) => (
                        <FieldRow
                          key={field.id}
                          field={field}
                          isFirst={idx === 0}
                          isLast={idx === fields.length - 1}
                          onChange={(patch) => updateField(field.id, patch)}
                          onRemove={() => removeField(field.id)}
                          onMove={(dir) => moveField(field.id, dir)}
                        />
                      ))}
                    </div>
                  )}

                  <button
                    onClick={addField}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-gray-200 text-sm font-semibold text-indigo-500 hover:border-indigo-300 hover:bg-indigo-50 transition"
                  >
                    <Plus size={16} /> Add New Field
                  </button>
                </div>

                {/* Save */}
                <button
                  onClick={saveForm}
                  className={cn(
                    "w-full py-3 rounded-xl font-bold text-sm transition",
                    saved
                      ? "bg-green-600 text-white"
                      : "bg-indigo-600 hover:bg-indigo-500 text-white"
                  )}
                >
                  {saved ? "✓ Saved!" : "Save Settings"}
                </button>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-8 text-center">
                <p className="text-gray-400 text-sm">Public profile settings coming soon.</p>
              </div>
            )}

            {activeTab === "sponsors" && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-8 text-center">
                <p className="text-gray-400 text-sm">Sponsor management coming soon.</p>
              </div>
            )}
          </div>

          {/* Smart Automation sidebar */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 sticky top-20">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Smart Automation</h3>
              <p className="text-xs text-gray-500 mb-4">
                <strong>Smart Fields:</strong> If you name a field &ldquo;Email&rdquo;, &ldquo;Phone&rdquo;, or
                &ldquo;Website&rdquo;, the system automatically selects the correct type for you.
              </p>
              <div className="space-y-3">
                <div className="bg-green-50 border border-green-100 rounded-xl p-3">
                  <p className="text-xs text-green-700">
                    <strong>Interactive Profile:</strong> &ldquo;Email&rdquo; and &ldquo;Phone&rdquo; types generate
                    clickable buttons (Call/Mail) on the public profile.
                  </p>
                </div>
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3">
                  <p className="text-xs text-indigo-700">
                    <strong>Files:</strong> Select &ldquo;File Upload&rdquo; for CVs or IDs.
                  </p>
                </div>
              </div>

              {fields.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 mb-2">
                    {fields.length} field{fields.length !== 1 ? "s" : ""} configured
                  </p>
                  {fields.map((f) => (
                    <div key={f.id} className="flex items-center gap-2 py-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                      <span className="text-xs text-gray-600 truncate">{f.label || "Untitled"}</span>
                      <span className="ml-auto text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{f.type}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ── Field Row ──────────────────────────────────────────────────────────────────

function FieldRow({
  field,
  isFirst,
  isLast,
  onChange,
  onRemove,
  onMove,
}: {
  field: FormField;
  isFirst: boolean;
  isLast: boolean;
  onChange: (patch: Partial<FormField>) => void;
  onRemove: () => void;
  onMove: (dir: -1 | 1) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <div
        className="flex items-center gap-2 px-4 py-3 bg-gray-50 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <GripVertical size={15} className="text-gray-300 shrink-0" />
        <span className="flex-1 text-sm font-medium text-gray-700 truncate">
          {field.label || "Untitled Field"}
        </span>
        <span className="text-xs text-gray-400 bg-white px-2 py-0.5 rounded border border-gray-200 capitalize">
          {field.type}
        </span>
        {field.required && <span className="text-xs font-bold text-red-500">Required</span>}
        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
          <button
            disabled={isFirst}
            onClick={() => onMove(-1)}
            className="p-1 rounded hover:bg-gray-200 text-gray-400 disabled:opacity-30 text-xs"
          >
            ↑
          </button>
          <button
            disabled={isLast}
            onClick={() => onMove(1)}
            className="p-1 rounded hover:bg-gray-200 text-gray-400 disabled:opacity-30 text-xs"
          >
            ↓
          </button>
          <button
            onClick={onRemove}
            className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-500"
          >
            <Trash2 size={13} />
          </button>
        </div>
        <ChevronDown size={14} className={cn("text-gray-400 transition-transform shrink-0", expanded && "rotate-180")} />
      </div>
      {expanded && (
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Label</label>
              <input
                value={field.label}
                onChange={(e) => onChange({ label: e.target.value })}
                placeholder="Field label"
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-indigo-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Field Type</label>
              <select
                value={field.type}
                onChange={(e) => onChange({ type: e.target.value as FieldType })}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-indigo-400"
              >
                {FIELD_TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Placeholder</label>
            <input
              value={field.placeholder ?? ""}
              onChange={(e) => onChange({ placeholder: e.target.value })}
              placeholder="Hint text"
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-indigo-400"
            />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={field.required}
              onChange={(e) => onChange({ required: e.target.checked })}
              className="rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">Required field</span>
          </label>
        </div>
      )}
    </div>
  );
}
