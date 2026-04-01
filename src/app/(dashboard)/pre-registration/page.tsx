"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Plus,
  GripVertical,
  Trash2,
  Save,
  ChevronDown,
  ClipboardList,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useAuth } from "@/contexts/AuthContext";
import { TalentEvent, PreRegistrationForm, FormField, FieldType } from "@/types";
import { KEYS } from "@/lib/storage";
import { generateId } from "@/lib/utils";
import { cn } from "@/lib/utils";

const FIELD_TYPES: { value: FieldType; label: string }[] = [
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

function FieldEditor({
  field,
  onChange,
  onRemove,
  index,
}: {
  field: FormField;
  onChange: (f: FormField) => void;
  onRemove: () => void;
  index: number;
}) {
  const [open, setOpen] = useState(index === 0);
  const needsOptions = ["select", "radio", "checkbox"].includes(field.type);

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 bg-gray-50 cursor-pointer select-none"
        onClick={() => setOpen(!open)}
      >
        <GripVertical size={16} className="text-gray-400 shrink-0" />
        <span className="flex-1 text-sm font-medium text-gray-800 truncate">
          {field.label || "Untitled Field"}
        </span>
        <span className="text-xs text-gray-400 bg-white px-2 py-0.5 rounded-lg border border-gray-200">
          {FIELD_TYPES.find((t) => t.value === field.type)?.label ?? field.type}
        </span>
        {field.required && (
          <span className="text-xs text-danger font-semibold">Required</span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          className="p-1 rounded-lg hover:bg-red-50 text-gray-400 hover:text-danger transition"
        >
          <Trash2 size={14} />
        </button>
        <ChevronDown
          size={15}
          className={cn("text-gray-400 transition-transform", open && "rotate-180")}
        />
      </div>

      {/* Body */}
      {open && (
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Label"
              value={field.label}
              onChange={(e) => onChange({ ...field, label: e.target.value })}
              placeholder="Field label"
            />
            <Select
              label="Field Type"
              value={field.type}
              onChange={(e) =>
                onChange({ ...field, type: e.target.value as FieldType })
              }
              options={FIELD_TYPES}
            />
          </div>
          <Input
            label="Placeholder"
            value={field.placeholder ?? ""}
            onChange={(e) =>
              onChange({ ...field, placeholder: e.target.value })
            }
            placeholder="Hint text shown inside the field"
          />
          {needsOptions && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Options (one per line)
              </label>
              <textarea
                value={(field.options ?? []).join("\n")}
                onChange={(e) =>
                  onChange({
                    ...field,
                    options: e.target.value.split("\n").filter(Boolean),
                  })
                }
                rows={4}
                className="w-full px-3.5 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 resize-none"
                placeholder="Option 1&#10;Option 2&#10;Option 3"
              />
            </div>
          )}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={field.required}
              onChange={(e) => onChange({ ...field, required: e.target.checked })}
              className="rounded border-gray-300 text-primary"
            />
            <span className="text-sm text-gray-700">Required field</span>
          </label>
        </div>
      )}
    </div>
  );
}

export default function PreRegistrationPage() {
  useAuth();
  const [events] = useLocalStorage<TalentEvent[]>(KEYS.EVENTS, []);
  const [forms, setForms] = useLocalStorage<PreRegistrationForm[]>(KEYS.FORMS, []);

  const [selectedEventId, setSelectedEventId] = useState("");
  const [formTitle, setFormTitle] = useState("Pre-Registration Form");
  const [fields, setFields] = useState<FormField[]>([
    { id: generateId(), type: "text", label: "Full Name", placeholder: "Your full name", required: true },
    { id: generateId(), type: "email", label: "Email Address", placeholder: "you@example.com", required: true },
    { id: generateId(), type: "phone", label: "Phone Number", placeholder: "+91 XXXXX XXXXX", required: false },
  ]);
  const [saved, setSaved] = useState(false);

  const eventOptions = useMemo(
    () =>
      events.map((e) => ({ value: e.id, label: e.name })),
    [events]
  );

  // Load existing form when event changes
  function handleEventChange(eventId: string) {
    setSelectedEventId(eventId);
    const existing = forms.find((f) => f.eventId === eventId);
    if (existing) {
      setFormTitle(existing.title);
      setFields(existing.fields);
    } else {
      setFormTitle("Pre-Registration Form");
      setFields([
        { id: generateId(), type: "text", label: "Full Name", placeholder: "Your full name", required: true },
        { id: generateId(), type: "email", label: "Email Address", placeholder: "you@example.com", required: true },
      ]);
    }
    setSaved(false);
  }

  function addField() {
    setFields((prev) => [
      ...prev,
      { id: generateId(), type: "text", label: "", placeholder: "", required: false },
    ]);
    setSaved(false);
  }

  function updateField(id: string, updated: FormField) {
    setFields((prev) => prev.map((f) => (f.id === id ? updated : f)));
    setSaved(false);
  }

  function removeField(id: string) {
    setFields((prev) => prev.filter((f) => f.id !== id));
    setSaved(false);
  }

  function handleSave() {
    if (!selectedEventId) {
      alert("Please select an event first.");
      return;
    }

    const form: PreRegistrationForm = {
      id: forms.find((f) => f.eventId === selectedEventId)?.id ?? generateId(),
      eventId: selectedEventId,
      title: formTitle,
      fields,
      createdAt: Date.now(),
    };

    setForms((prev) => {
      const idx = prev.findIndex((f) => f.eventId === selectedEventId);
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx] = form;
        return updated;
      }
      return [...prev, form];
    });
    setSaved(true);
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Pre-Registration</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Build custom registration forms for your events
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/pre-registration/submissions">
            <Button variant="outline" size="sm">
              <ClipboardList size={15} /> View Submissions
            </Button>
          </Link>
          <Button onClick={handleSave} size="sm">
            <Save size={15} />
            {saved ? "Saved!" : "Save Form"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Config panel */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <div className="space-y-4">
              <Select
                label="Event"
                value={selectedEventId}
                onChange={(e) => handleEventChange(e.target.value)}
                options={eventOptions}
                placeholder="Select an event…"
              />
              <Input
                label="Form Title"
                value={formTitle}
                onChange={(e) => { setFormTitle(e.target.value); setSaved(false); }}
                placeholder="e.g. Campus Placement Registration 2025"
              />
            </div>
          </Card>

          {/* Fields */}
          <div className="space-y-3">
            {fields.map((field, i) => (
              <FieldEditor
                key={field.id}
                field={field}
                index={i}
                onChange={(f) => updateField(field.id, f)}
                onRemove={() => removeField(field.id)}
              />
            ))}
          </div>

          <Button variant="outline" onClick={addField} fullWidth>
            <Plus size={16} /> Add Field
          </Button>
        </div>

        {/* Preview */}
        <div>
          <Card className="sticky top-20">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Live Preview
            </p>
            <h3 className="text-lg font-bold text-gray-900 mb-4">{formTitle}</h3>
            <div className="space-y-3">
              {fields.map((field) => (
                <div key={field.id}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    {field.label || "Untitled"}
                    {field.required && <span className="text-danger ml-1">*</span>}
                  </label>
                  {field.type === "textarea" ? (
                    <div className="h-16 bg-gray-50 border border-gray-200 rounded-xl" />
                  ) : field.type === "select" ? (
                    <div className="h-10 bg-gray-50 border border-gray-200 rounded-xl flex items-center px-3">
                      <span className="text-xs text-gray-400">
                        {field.placeholder || "Select an option…"}
                      </span>
                    </div>
                  ) : ["radio", "checkbox"].includes(field.type) ? (
                    <div className="space-y-1.5">
                      {(field.options ?? ["Option 1", "Option 2"]).slice(0, 3).map((opt) => (
                        <div key={opt} className="flex items-center gap-2">
                          <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300" />
                          <span className="text-xs text-gray-600">{opt}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-9 bg-gray-50 border border-gray-200 rounded-xl flex items-center px-3">
                      <span className="text-xs text-gray-400">
                        {field.placeholder || "Enter " + field.label.toLowerCase()}
                      </span>
                    </div>
                  )}
                </div>
              ))}
              {fields.length > 0 && (
                <div className="pt-2">
                  <div className="h-9 bg-primary rounded-xl" />
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
