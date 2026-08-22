import { useState, useEffect, useCallback } from "react";
import { format, parseISO, isToday } from "date-fns";
import { getAppointments, updateAppointmentStatus, type Appointment, type AppointmentStatus } from "../../data/content";
import { Calendar, Clock, CheckCircle, XCircle, RotateCcw, Eye, Check, X, ChevronDown } from "lucide-react";

const STATUS_CONFIG: Record<AppointmentStatus, { label: string; color: string }> = {
  pending: { label: "Pending", color: "bg-yellow-50 text-yellow-800 border-yellow-200" },
  confirmed: { label: "Confirmed", color: "bg-green-50 text-green-800 border-green-200" },
  rescheduled: { label: "Rescheduled", color: "bg-blue-50 text-blue-800 border-blue-200" },
  cancelled: { label: "Cancelled", color: "bg-red-50 text-red-800 border-red-200" },
  completed: { label: "Completed", color: "bg-gray-50 text-gray-600 border-gray-200" },
};

const STATUS_FILTERS: Array<{ key: string; label: string }> = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "confirmed", label: "Confirmed" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

function StatusBadge({ status }: { status: AppointmentStatus }) {
  const { label, color } = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 text-[11px] border font-medium rounded ${color}`}>
      {label}
    </span>
  );
}

function StatCard({ label, value, icon: Icon }: { label: string; value: number; icon: React.ElementType }) {
  return (
    <div className="bg-surface border border-border p-6">
      <div className="flex items-start justify-between mb-3">
        <p className="text-[10px] tracking-[0.15em] text-muted uppercase">{label}</p>
        <Icon size={16} className="text-muted" strokeWidth={1.5} />
      </div>
      <p className="font-serif text-4xl text-ink">{value}</p>
    </div>
  );
}

export default function Dashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Appointment | null>(null);
  const [dateFilter, setDateFilter] = useState("");

  const load = useCallback(() => {
    setAppointments(getAppointments().sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    ));
  }, []);

  useEffect(() => { load(); }, [load]);

  function handleStatus(id: string, status: AppointmentStatus) {
    updateAppointmentStatus(id, status);
    load();
    if (selected?.id === id) {
      setSelected((prev) => prev ? { ...prev, status, updated_at: new Date().toISOString() } : null);
    }
  }

  const todayCount = appointments.filter((a) => isToday(parseISO(a.created_at))).length;
  const pendingCount = appointments.filter((a) => a.status === "pending").length;
  const confirmedCount = appointments.filter((a) => a.status === "confirmed").length;
  const completedCount = appointments.filter((a) => a.status === "completed").length;

  const filtered = appointments.filter((a) => {
    const matchesStatus = filter === "all" || a.status === filter;
    const matchesDate = !dateFilter || a.preferred_date === dateFilter;
    return matchesStatus && matchesDate;
  });

  function formatDate(iso: string) {
    try { return format(parseISO(iso), "d MMM yyyy"); } catch { return iso; }
  }

  function formatTime(t: string) {
    if (!t) return "—";
    try {
      const [h, m] = t.split(":").map(Number);
      const ampm = h >= 12 ? "PM" : "AM";
      return `${h % 12 || 12}:${m.toString().padStart(2, "0")} ${ampm}`;
    } catch { return t; }
  }

  return (
    <div className="p-8 lg:p-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-serif text-3xl text-ink mb-1">Appointments</h1>
        <p className="text-muted text-sm">Manage and update patient appointment requests.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard label="Today" value={todayCount} icon={Calendar} />
        <StatCard label="Pending" value={pendingCount} icon={Clock} />
        <StatCard label="Confirmed" value={confirmedCount} icon={CheckCircle} />
        <StatCard label="Completed" value={completedCount} icon={Check} />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex gap-2 flex-wrap">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-1.5 text-xs tracking-wide border transition-colors ${
                filter === f.key
                  ? "bg-primary text-surface border-primary"
                  : "border-border text-ink/60 hover:text-ink"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="ml-auto">
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="bg-surface border border-border px-3 py-1.5 text-xs text-ink focus:outline-none focus:border-primary"
            placeholder="Filter by date"
          />
          {dateFilter && (
            <button
              onClick={() => setDateFilter("")}
              className="ml-2 text-muted text-xs hover:text-ink"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Table + Detail panel layout */}
      <div className={`flex gap-6 ${selected ? "lg:items-start" : ""}`}>
        {/* Table */}
        <div className="flex-1 min-w-0 bg-surface border border-border overflow-hidden">
          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-muted text-sm">No appointments found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-cream/50">
                    <th className="px-5 py-3 text-left text-[10px] tracking-[0.15em] text-muted uppercase font-medium">Patient</th>
                    <th className="px-5 py-3 text-left text-[10px] tracking-[0.15em] text-muted uppercase font-medium hidden sm:table-cell">Service</th>
                    <th className="px-5 py-3 text-left text-[10px] tracking-[0.15em] text-muted uppercase font-medium hidden md:table-cell">Date</th>
                    <th className="px-5 py-3 text-left text-[10px] tracking-[0.15em] text-muted uppercase font-medium hidden lg:table-cell">Time</th>
                    <th className="px-5 py-3 text-left text-[10px] tracking-[0.15em] text-muted uppercase font-medium">Status</th>
                    <th className="px-5 py-3 text-right text-[10px] tracking-[0.15em] text-muted uppercase font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((apt) => (
                    <tr
                      key={apt.id}
                      className={`border-b border-border last:border-b-0 hover:bg-cream/30 transition-colors cursor-pointer ${
                        selected?.id === apt.id ? "bg-cream/50" : ""
                      }`}
                      onClick={() => setSelected(selected?.id === apt.id ? null : apt)}
                    >
                      <td className="px-5 py-4">
                        <p className="font-medium text-ink text-sm">{apt.patient_name}</p>
                        <p className="text-muted text-xs mt-0.5">{apt.phone}</p>
                      </td>
                      <td className="px-5 py-4 hidden sm:table-cell text-ink/70 text-xs">{apt.service}</td>
                      <td className="px-5 py-4 hidden md:table-cell text-ink/70 text-xs">{apt.preferred_date ? formatDate(apt.preferred_date + "T00:00:00") : "—"}</td>
                      <td className="px-5 py-4 hidden lg:table-cell text-ink/70 text-xs">{formatTime(apt.preferred_time)}</td>
                      <td className="px-5 py-4"><StatusBadge status={apt.status} /></td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                          {apt.status === "pending" && (
                            <>
                              <button
                                title="Confirm"
                                onClick={() => handleStatus(apt.id, "confirmed")}
                                className="p-1.5 text-green-700 hover:bg-green-50 rounded transition-colors"
                              >
                                <Check size={14} />
                              </button>
                              <button
                                title="Cancel"
                                onClick={() => handleStatus(apt.id, "cancelled")}
                                className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                              >
                                <X size={14} />
                              </button>
                            </>
                          )}
                          {apt.status === "confirmed" && (
                            <>
                              <button
                                title="Mark Completed"
                                onClick={() => handleStatus(apt.id, "completed")}
                                className="p-1.5 text-primary hover:bg-primary/10 rounded transition-colors"
                              >
                                <CheckCircle size={14} />
                              </button>
                              <button
                                title="Reschedule"
                                onClick={() => handleStatus(apt.id, "rescheduled")}
                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                              >
                                <RotateCcw size={14} />
                              </button>
                              <button
                                title="Cancel"
                                onClick={() => handleStatus(apt.id, "cancelled")}
                                className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                              >
                                <X size={14} />
                              </button>
                            </>
                          )}
                          {(apt.status === "cancelled" || apt.status === "completed" || apt.status === "rescheduled") && (
                            <button
                              title="Reopen as Pending"
                              onClick={() => handleStatus(apt.id, "pending")}
                              className="p-1.5 text-muted hover:text-ink hover:bg-cream rounded transition-colors"
                            >
                              <RotateCcw size={14} />
                            </button>
                          )}
                          <button
                            title="View details"
                            onClick={() => setSelected(selected?.id === apt.id ? null : apt)}
                            className={`p-1.5 rounded transition-colors ${selected?.id === apt.id ? "text-primary bg-primary/10" : "text-muted hover:text-ink hover:bg-cream"}`}
                          >
                            <Eye size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="w-80 flex-shrink-0 bg-surface border border-border p-6">
            <div className="flex items-start justify-between mb-6">
              <h2 className="font-serif text-xl text-ink">{selected.patient_name}</h2>
              <button onClick={() => setSelected(null)} className="text-muted hover:text-ink transition-colors">
                <X size={16} />
              </button>
            </div>

            <div className="flex flex-col gap-5">
              <StatusBadge status={selected.status} />

              {[
                { label: "Phone", value: selected.phone },
                { label: "Email", value: selected.email || "—" },
                { label: "Service", value: selected.service },
                { label: "Preferred Date", value: selected.preferred_date ? formatDate(selected.preferred_date + "T00:00:00") : "—" },
                { label: "Preferred Time", value: formatTime(selected.preferred_time) },
                { label: "Message", value: selected.message || "—" },
                { label: "Submitted", value: formatDate(selected.created_at) },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[10px] tracking-[0.15em] text-muted uppercase mb-1">{label}</p>
                  <p className="text-ink text-sm leading-relaxed">{value}</p>
                </div>
              ))}
            </div>

            {/* Quick status update */}
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-[10px] tracking-[0.15em] text-muted uppercase mb-3">Update Status</p>
              <div className="flex flex-col gap-2">
                {(["pending", "confirmed", "rescheduled", "cancelled", "completed"] as AppointmentStatus[])
                  .filter((s) => s !== selected.status)
                  .map((s) => (
                    <button
                      key={s}
                      onClick={() => handleStatus(selected.id, s)}
                      className="text-left text-xs text-ink/70 hover:text-primary py-1.5 border-b border-border/50 last:border-b-0 transition-colors capitalize"
                    >
                      → Mark as {STATUS_CONFIG[s].label}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
