"use client";

import { useMemo } from "react";
import { BarChart2, Users, CheckCircle, Clock, Calendar } from "lucide-react";
import { StatCard } from "@/components/ui/Card";
import Card from "@/components/ui/Card";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { TalentEvent, Guest } from "@/types";
import { KEYS } from "@/lib/storage";
import { formatDate } from "@/lib/utils";
import dynamic from "next/dynamic";

const PlacementChart = dynamic(() => import("@/components/dashboard/PlacementChart"), {
  ssr: false,
  loading: () => (
    <div className="h-72 flex items-center justify-center text-gray-400 text-sm">
      Loading chart…
    </div>
  ),
});

export default function AnalyticsPage() {
  const [events] = useLocalStorage<TalentEvent[]>(KEYS.EVENTS, []);
  const [guests] = useLocalStorage<Guest[]>(KEYS.GUESTS, []);

  const stats = useMemo(() => {
    const total = guests.length;
    const checkedIn = guests.filter((g) => g.status === "checked-in").length;
    const pending = guests.filter((g) => g.status === "pending").length;
    const activeEvents = events.filter((e) => e.status === "active").length;
    return { total, checkedIn, pending, activeEvents };
  }, [events, guests]);

  // Group guests by event for per-event stats
  const eventStats = useMemo(() => {
    return events
      .map((event) => {
        const eventGuests = guests.filter((g) => g.eventId === event.id);
        const checkedIn = eventGuests.filter((g) => g.status === "checked-in").length;
        return {
          ...event,
          guestCount: eventGuests.length,
          checkedIn,
          rate: eventGuests.length > 0
            ? Math.round((checkedIn / eventGuests.length) * 100)
            : 0,
        };
      })
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 8);
  }, [events, guests]);

  // Build chart data from last 6 months using real guest data
  const chartData = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 6 }, (_, i) => {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - (5 - i) + 1, 1);
      const month = monthStart.toLocaleString("en-IN", { month: "short" });
      const registered = guests.filter(
        (g) => g.registeredAt >= monthStart.getTime() && g.registeredAt < monthEnd.getTime()
      ).length;
      const placed = guests.filter(
        (g) => g.checkedInAt != null && g.checkedInAt >= monthStart.getTime() && g.checkedInAt < monthEnd.getTime()
      ).length;
      return { month, registered, placed };
    });
  }, [guests]);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary">Analytics</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Placement & event performance overview
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Total Guests"
          value={stats.total}
          icon={<Users size={18} />}
        />
        <StatCard
          label="Checked In"
          value={stats.checkedIn}
          color="green"
          icon={<CheckCircle size={18} />}
        />
        <StatCard
          label="Pending"
          value={stats.pending}
          color="blue"
          icon={<Clock size={18} />}
        />
        <StatCard
          label="Active Events"
          value={stats.activeEvents}
          color="purple"
          icon={<Calendar size={18} />}
        />
      </div>

      {/* Chart + Top Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-semibold text-gray-900">Placement Activity</h2>
              <p className="text-xs text-gray-500 mt-0.5">Last 6 months</p>
            </div>
            <BarChart2 size={18} className="text-gray-400" />
          </div>
          <PlacementChart data={chartData} />
        </Card>

        <Card>
          <h2 className="font-semibold text-gray-900 mb-4">Events Overview</h2>
          {eventStats.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">
              No events yet. Create your first event.
            </p>
          ) : (
            <div className="space-y-3">
              {eventStats.map((e) => (
                <div key={e.id} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {e.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {e.guestCount} registered · {e.checkedIn} checked in
                    </p>
                  </div>
                  <div className="text-sm font-bold text-primary shrink-0">
                    {e.rate}%
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Per-event breakdown table */}
      {eventStats.length > 0 && (
        <Card>
          <h2 className="font-semibold text-gray-900 mb-4">
            Event Attendance Breakdown
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Event
                  </th>
                  <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Dates
                  </th>
                  <th className="text-right py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Registered
                  </th>
                  <th className="text-right py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Checked In
                  </th>
                  <th className="text-right py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Rate
                  </th>
                </tr>
              </thead>
              <tbody>
                {eventStats.map((e) => (
                  <tr
                    key={e.id}
                    className="border-b border-gray-50 hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-3 font-medium text-gray-800">
                      {e.name}
                    </td>
                    <td className="py-3 px-3 text-gray-500">
                      {formatDate(e.startDate)}
                    </td>
                    <td className="py-3 px-3 text-right text-gray-700">
                      {e.guestCount}
                    </td>
                    <td className="py-3 px-3 text-right text-success font-medium">
                      {e.checkedIn}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span
                        className={`font-bold ${
                          e.rate >= 70
                            ? "text-success"
                            : e.rate >= 40
                            ? "text-amber-600"
                            : "text-danger"
                        }`}
                      >
                        {e.rate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </>
  );
}
