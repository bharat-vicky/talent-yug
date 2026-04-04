"use client";

import { useState, useMemo, useEffect } from "react";
import { Plus, Search, Trash2, Edit2, Calendar, Filter } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Modal, { ConfirmModal } from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useAuth } from "@/contexts/AuthContext";
import { TalentEvent, EventStatus } from "@/types";
import { KEYS } from "@/lib/storage";
import { generateId, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const statusBadgeMap: Record<EventStatus, "success" | "danger" | "warning"> = {
  active: "success",
  closed: "danger",
  draft: "warning",
};

function EventFormModal({
  isOpen,
  onClose,
  initial,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  initial?: TalentEvent;
  onSave: (e: TalentEvent) => void;
}) {
  const { session } = useAuth();
  const [name, setName] = useState(initial?.name ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [startDate, setStartDate] = useState(initial?.startDate ?? "");
  const [endDate, setEndDate] = useState(initial?.endDate ?? "");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [capacity, setCapacity] = useState(String(initial?.capacity ?? ""));
  const [status, setStatus] = useState<EventStatus>(initial?.status ?? "draft");
  const [error, setError] = useState("");

  // Reset form fields when the event being edited changes
  useEffect(() => {
    setName(initial?.name ?? "");
    setDescription(initial?.description ?? "");
    setStartDate(initial?.startDate ?? "");
    setEndDate(initial?.endDate ?? "");
    setLocation(initial?.location ?? "");
    setCapacity(String(initial?.capacity ?? ""));
    setStatus(initial?.status ?? "draft");
    setError("");
  }, [initial]);

  function handleSave() {
    setError("");
    if (!name.trim() || !startDate || !endDate) {
      setError("Name, start date and end date are required.");
      return;
    }
    if (endDate < startDate) {
      setError("End date must be after start date.");
      return;
    }
    if (capacity && Number(capacity) < 1) {
      setError("Capacity must be at least 1.");
      return;
    }
    const event: TalentEvent = {
      id: initial?.id ?? generateId(),
      name: name.trim(),
      description: description.trim() || undefined,
      startDate,
      endDate,
      location: location.trim() || undefined,
      capacity: capacity ? Number(capacity) : undefined,
      status,
      createdAt: initial?.createdAt ?? Date.now(),
      createdBy: initial?.createdBy ?? session?.email ?? "",
    };
    onSave(event);
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initial ? "Edit Event" : "Create New Event"}
      size="lg"
    >
      <div className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm text-danger">
            {error}
          </div>
        )}
        <Input
          label="Event Name"
          placeholder="e.g. Campus Placement Drive 2025"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          label="Description"
          placeholder="Brief description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <Input
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Location"
            placeholder="e.g. Main Auditorium"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Input
            label="Capacity"
            type="number"
            placeholder="e.g. 200"
            value={capacity}
            min={1}
            onChange={(e) => setCapacity(e.target.value)}
          />
        </div>
        <Select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value as EventStatus)}
          options={[
            { value: "draft", label: "Draft" },
            { value: "active", label: "Active" },
            { value: "closed", label: "Closed" },
          ]}
        />
        <div className="flex gap-3 pt-2">
          <Button variant="outline" onClick={onClose} fullWidth>
            Cancel
          </Button>
          <Button onClick={handleSave} fullWidth>
            {initial ? "Save Changes" : "Create Event"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default function EventsPage() {
  const [events, setEvents] = useLocalStorage<TalentEvent[]>(KEYS.EVENTS, []);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<EventStatus | "all">("all");
  const [createOpen, setCreateOpen] = useState(false);
  const [editEvent, setEditEvent] = useState<TalentEvent | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    return events
      .filter((e) => {
        const matchSearch =
          e.name.toLowerCase().includes(search.toLowerCase()) ||
          e.location?.toLowerCase().includes(search.toLowerCase());
        const matchStatus =
          filterStatus === "all" || e.status === filterStatus;
        return matchSearch && matchStatus;
      })
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [events, search, filterStatus]);

  function handleSave(event: TalentEvent) {
    setEvents((prev) => {
      const idx = prev.findIndex((e) => e.id === event.id);
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx] = event;
        return updated;
      }
      return [event, ...prev];
    });
  }

  function handleDelete(id: string) {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    setSelectedIds((prev) => { const s = new Set(prev); s.delete(id); return s; });
  }

  function handleBulkDelete() {
    setEvents((prev) => prev.filter((e) => !selectedIds.has(e.id)));
    setSelectedIds(new Set());
  }

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const s = new Set(prev);
      if (s.has(id)) { s.delete(id); } else { s.add(id); }
      return s;
    });
  }

  function toggleAll() {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map((e) => e.id)));
    }
  }

  return (
    <>
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Events</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {events.length} total · {events.filter((e) => e.status === "active").length} active
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <Plus size={16} /> New Event
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-xs">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            placeholder="Search events…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-white outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-gray-400" />
          {(["all", "active", "draft", "closed"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition",
                filterStatus === s
                  ? "bg-primary text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              )}
            >
              {s}
            </button>
          ))}
        </div>
        {selectedIds.size > 0 && (
          <Button
            variant="danger"
            size="sm"
            onClick={handleBulkDelete}
          >
            <Trash2 size={14} />
            Delete ({selectedIds.size})
          </Button>
        )}
      </div>

      {/* Events list */}
      {filtered.length === 0 ? (
        <Card className="text-center py-16">
          <Calendar size={40} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 font-medium">No events found</p>
          <p className="text-sm text-gray-400 mt-1">
            {search ? "Try a different search." : "Create your first event to get started."}
          </p>
          {!search && (
            <Button className="mt-5 mx-auto" onClick={() => setCreateOpen(true)}>
              <Plus size={15} /> Create Event
            </Button>
          )}
        </Card>
      ) : (
        <div className="space-y-3">
          {/* Select all */}
          <div className="flex items-center gap-2 px-1">
            <input
              type="checkbox"
              checked={selectedIds.size === filtered.length && filtered.length > 0}
              onChange={toggleAll}
              className="rounded border-gray-300 text-primary"
            />
            <span className="text-xs text-gray-500">Select all</span>
          </div>

          {filtered.map((event) => (
            <Card key={event.id} padding="none">
              <div className="flex items-center gap-4 p-4 sm:p-5">
                <input
                  type="checkbox"
                  checked={selectedIds.has(event.id)}
                  onChange={() => toggleSelect(event.id)}
                  className="rounded border-gray-300 text-primary shrink-0"
                />
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Calendar size={18} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3 flex-wrap">
                    <p className="font-semibold text-gray-900 text-sm truncate">{event.name}</p>
                    <Badge variant={statusBadgeMap[event.status]} dot>
                      {event.status}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-gray-500">
                    <span>{formatDate(event.startDate)} – {formatDate(event.endDate)}</span>
                    {event.location && <span>📍 {event.location}</span>}
                    {event.capacity && <span>👥 Capacity: {event.capacity}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => setEditEvent(event)}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-primary transition"
                    title="Edit"
                  >
                    <Edit2 size={15} />
                  </button>
                  <button
                    onClick={() => setDeleteId(event.id)}
                    className="p-2 rounded-lg hover:bg-red-50 text-gray-500 hover:text-danger transition"
                    title="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modals */}
      <EventFormModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onSave={handleSave}
      />
      {editEvent && (
        <EventFormModal
          isOpen
          onClose={() => setEditEvent(null)}
          initial={editEvent}
          onSave={handleSave}
        />
      )}
      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && handleDelete(deleteId)}
        title="Delete Event"
        description="This will permanently delete the event. This action cannot be undone."
        confirmLabel="Delete"
        isDanger
      />
    </>
  );
}
