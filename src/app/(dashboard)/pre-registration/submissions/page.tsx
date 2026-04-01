"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Select from "@/components/ui/Select";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  TalentEvent,
  PreRegistrationForm,
  Submission,
  SubmissionStatus,
} from "@/types";
import { KEYS } from "@/lib/storage";
import { formatDateTime, exportToCSV } from "@/lib/utils";
import { cn } from "@/lib/utils";

const statusConfig: Record<
  SubmissionStatus,
  { badge: "success" | "danger" | "warning"; label: string; icon: React.ReactNode }
> = {
  approved: { badge: "success", label: "Approved", icon: <CheckCircle size={14} /> },
  rejected: { badge: "danger", label: "Rejected", icon: <XCircle size={14} /> },
  pending: { badge: "warning", label: "Pending", icon: <Clock size={14} /> },
};

export default function SubmissionsPage() {
  const [events] = useLocalStorage<TalentEvent[]>(KEYS.EVENTS, []);
  useLocalStorage<PreRegistrationForm[]>(KEYS.FORMS, []);
  const [submissions, setSubmissions] = useLocalStorage<Submission[]>(
    KEYS.SUBMISSIONS,
    []
  );

  const [selectedEventId, setSelectedEventId] = useState("");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<SubmissionStatus | "all">("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const eventOptions = useMemo(
    () => events.map((e) => ({ value: e.id, label: e.name })),
    [events]
  );

  const filtered = useMemo(() => {
    return submissions
      .filter((s) => {
        if (selectedEventId && s.eventId !== selectedEventId) return false;
        if (filterStatus !== "all" && s.status !== filterStatus) return false;
        const q = search.toLowerCase();
        if (q) {
          const nameMatch = String(s.name ?? "").toLowerCase().includes(q);
          const emailMatch = String(s.email ?? "").toLowerCase().includes(q);
          if (!nameMatch && !emailMatch) return false;
        }
        return true;
      })
      .sort((a, b) => b.submittedAt - a.submittedAt);
  }, [submissions, selectedEventId, filterStatus, search]);

  function updateStatus(id: string, status: SubmissionStatus) {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s))
    );
  }

  function bulkApprove() {
    setSubmissions((prev) =>
      prev.map((s) =>
        selectedIds.has(s.id) ? { ...s, status: "approved" } : s
      )
    );
    setSelectedIds(new Set());
  }

  function bulkReject() {
    setSubmissions((prev) =>
      prev.map((s) =>
        selectedIds.has(s.id) ? { ...s, status: "rejected" } : s
      )
    );
    setSelectedIds(new Set());
  }

  function handleExport() {
    const data = filtered.map((s) => ({
      Name: s.name ?? "",
      Email: s.email ?? "",
      Status: s.status,
      "Submitted At": formatDateTime(s.submittedAt),
      ...s.answers,
    }));
    exportToCSV(data as Record<string, unknown>[], "submissions.csv");
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
      setSelectedIds(new Set(filtered.map((s) => s.id)));
    }
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Link href="/pre-registration">
            <button className="p-2 rounded-xl hover:bg-gray-100 transition text-gray-500">
              <ArrowLeft size={18} />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-primary">Submissions</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {filtered.length} submissions
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download size={15} /> Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-5" padding="sm">
        <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
          <div className="flex-1 min-w-[160px]">
            <Select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              options={eventOptions}
              placeholder="All Events"
            />
          </div>
          <div className="relative flex-1 min-w-[180px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Search by name or email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-white outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-gray-400" />
            {(["all", "pending", "approved", "rejected"] as const).map((s) => (
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
        </div>
      </Card>

      {/* Bulk actions */}
      {selectedIds.size > 0 && (
        <div className="flex items-center gap-3 mb-4 p-3 bg-primary/5 border border-primary/20 rounded-2xl">
          <span className="text-sm font-medium text-primary">
            {selectedIds.size} selected
          </span>
          <Button size="sm" onClick={bulkApprove}>
            <CheckCircle size={14} /> Approve
          </Button>
          <Button size="sm" variant="danger" onClick={bulkReject}>
            <XCircle size={14} /> Reject
          </Button>
        </div>
      )}

      {/* Table */}
      {filtered.length === 0 ? (
        <Card className="text-center py-16">
          <p className="text-gray-500 font-medium">No submissions found</p>
          <p className="text-sm text-gray-400 mt-1">
            Submissions from your pre-registration form will appear here.
          </p>
        </Card>
      ) : (
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="w-10 py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.size === filtered.length}
                      onChange={toggleAll}
                      className="rounded border-gray-300 text-primary"
                    />
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Submitted
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Status
                  </th>
                  <th className="py-3 px-4" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((sub) => {
                  const cfg = statusConfig[sub.status];
                  return (
                    <tr
                      key={sub.id}
                      className="border-b border-gray-50 hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(sub.id)}
                          onChange={() => toggleSelect(sub.id)}
                          className="rounded border-gray-300 text-primary"
                        />
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-800">
                        {sub.name ?? "—"}
                      </td>
                      <td className="py-3 px-4 text-gray-500">
                        {sub.email ?? "—"}
                      </td>
                      <td className="py-3 px-4 text-gray-500 whitespace-nowrap">
                        {formatDateTime(sub.submittedAt)}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={cfg.badge} dot>
                          {cfg.label}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => updateStatus(sub.id, "approved")}
                            className="p-1.5 rounded-lg hover:bg-green-50 text-gray-400 hover:text-success transition"
                            title="Approve"
                          >
                            <CheckCircle size={14} />
                          </button>
                          <button
                            onClick={() => updateStatus(sub.id, "rejected")}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-danger transition"
                            title="Reject"
                          >
                            <XCircle size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </>
  );
}
