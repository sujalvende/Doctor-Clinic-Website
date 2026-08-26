import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { format, parseISO, isToday } from "date-fns";
import {
  getAppointments,
  updateAppointmentStatus,
  rescheduleAppointment,
  createManualAppointment,
  findConflictingAppointment,
  getAppointmentDate as getScheduledDate,
  getAppointmentTime as getScheduledTime,
  BOOKING_SOURCE_LABELS,
  SERVICES,
  type Appointment,
  type AppointmentStatus,
  type BookingSource,
} from "../../data/content";
import {
  Calendar,
  Clock,
  CheckCircle,
  RotateCcw,
  Eye,
  Check,
  X,
  MoreHorizontal,
  Plus,
} from "lucide-react";

const STATUS_CONFIG: Record<AppointmentStatus, { label: string; color: string }> = {
  pending: { label: "Pending", color: "bg-yellow-50 text-yellow-800" },
  confirmed: { label: "Confirmed", color: "bg-green-50 text-green-800" },
  rescheduled: { label: "Rescheduled", color: "bg-blue-50 text-blue-800" },
  cancelled: { label: "Cancelled", color: "bg-red-50 text-red-800" },
  completed: { label: "Completed", color: "bg-gray-100 text-gray-600" },
};

const STATUS_FILTERS: Array<{ key: string; label: string }> = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "confirmed", label: "Confirmed" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];


function formatDate(iso: string) {
  if (!iso) return "—";
  try {
    return format(parseISO(iso), "d MMM yyyy");
  } catch {
    return iso;
  }
}

function formatDateOnly(date: string) {
  if (!date) return "—";
  return formatDate(date + "T00:00:00");
}

function formatTime(time: string) {
  if (!time) return "—";
  try {
    const [h, m] = time.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    return `${h % 12 || 12}:${m.toString().padStart(2, "0")} ${ampm}`;
  } catch {
    return time;
  }
}

function StatusBadge({ status }: { status: AppointmentStatus }) {
  const { label, color } = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-1 text-[11px] font-medium rounded ${color}`}>
      {label}
    </span>
  );
}

function StatCard({ label, value, icon: Icon }: { label: string; value: number; icon: React.ElementType }) {
  return (
    <div className="bg-surface border border-border p-5 lg:p-6 min-w-0">
      <div className="flex items-start justify-between mb-3 gap-3">
        <p className="text-[10px] tracking-[0.15em] text-muted uppercase">{label}</p>
        <Icon size={16} className="text-muted flex-shrink-0" strokeWidth={1.5} />
      </div>
      <p className="font-serif text-3xl lg:text-4xl text-ink leading-none">{value}</p>
    </div>
  );
}

function ActionButton({
  label,
  onClick,
  icon: Icon,
  tone = "default",
}: {
  label: string;
  onClick: () => void;
  icon: React.ElementType;
  tone?: "default" | "green" | "red" | "blue";
}) {
  const toneClass = {
    default: "text-muted hover:text-ink hover:bg-cream",
    green: "text-green-700 hover:bg-green-50",
    red: "text-red-600 hover:bg-red-50",
    blue: "text-blue-600 hover:bg-blue-50",
  }[tone];

  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      className={`inline-flex h-10 w-10 items-center justify-center rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 ${toneClass}`}
    >
      <Icon size={16} />
    </button>
  );
}

function ActionMenu({
  appointment,
  onView,
  onConfirm,
  onComplete,
  onCancel,
  onReopen,
  onReschedule,
}: {
  appointment: Appointment;
  onView: () => void;
  onConfirm: () => void;
  onComplete: () => void;
  onCancel: () => void;
  onReopen: () => void;
  onReschedule: () => void;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointer(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const items: Array<{ label: string; action: () => void }> = [
    { label: "View details", action: onView },
  ];

  if (appointment.status === "pending") {
    items.push({ label: "Confirm appointment", action: onConfirm });
    items.push({ label: "Cancel appointment", action: onCancel });
  }

  if (appointment.status === "confirmed") {
    items.push({ label: "Mark completed", action: onComplete });
    items.push({ label: "Reschedule", action: onReschedule });
    items.push({ label: "Cancel appointment", action: onCancel });
  }

  if (appointment.status === "rescheduled") {
    items.push({ label: "Mark completed", action: onComplete });
    items.push({ label: "Reschedule again", action: onReschedule });
    items.push({ label: "Cancel appointment", action: onCancel });
    items.push({ label: "Reopen as pending", action: onReopen });
  }

  if (appointment.status === "cancelled" || appointment.status === "completed") {
    items.push({ label: "Reopen as pending", action: onReopen });
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        aria-label={`Open actions for ${appointment.patient_name}`}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-10 w-10 items-center justify-center rounded border border-border text-muted hover:text-ink hover:bg-cream transition-colors"
      >
        <MoreHorizontal size={16} />
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-30 min-w-[190px] bg-surface border border-border shadow-sm">
          <div className="py-1.5">
            {items.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  setOpen(false);
                  item.action();
                }}
                className="w-full px-4 py-2.5 text-left text-sm text-ink/75 hover:text-ink hover:bg-cream transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AppointmentDetails({
  appointment,
  onClose,
  onStatus,
  onReschedule,
  mobile,
}: {
  appointment: Appointment;
  onClose: () => void;
  onStatus: (status: AppointmentStatus) => void;
  onReschedule: () => void;
  mobile?: boolean;
}) {
  const scheduledDate = getScheduledDate(appointment);
  const scheduledTime = getScheduledTime(appointment);
  const hasConfirmedSchedule = Boolean(appointment.confirmed_date && appointment.confirmed_time);
  const requestDiffersFromSchedule =
    appointment.preferred_date !== scheduledDate || appointment.preferred_time !== scheduledTime;
  const bookingSource = appointment.booking_source || "website";
  const isAdminRecorded = bookingSource !== "website";

  const patientFields = [
    { label: "Phone", value: appointment.phone },
    { label: "Email", value: appointment.email || "—" },
  ];

  const additionalFields = [
    { label: isAdminRecorded ? "Admin notes" : "Message", value: appointment.message || "—" },
    { label: "Submitted", value: formatDate(appointment.created_at) },
  ];

  return (
    <div className={`bg-surface border border-border ${mobile ? "h-full overflow-y-auto" : "p-6"}`}>
      <div className={`${mobile ? "sticky top-0 bg-surface border-b border-border px-5 py-4 z-10" : "mb-6 flex items-start justify-between"}`}>
        {mobile ? (
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] tracking-[0.15em] text-muted uppercase mb-1">Appointment details</p>
              <h2 className="font-serif text-xl text-ink">{appointment.patient_name}</h2>
            </div>
            <button
              type="button"
              aria-label="Close appointment details"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center text-muted hover:text-ink transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          <>
            <h2 className="font-serif text-xl text-ink">{appointment.patient_name}</h2>
            <button
              type="button"
              aria-label="Close appointment details"
              onClick={onClose}
              className="text-muted hover:text-ink transition-colors"
            >
              <X size={16} />
            </button>
          </>
        )}
      </div>

      <div className={mobile ? "p-5" : ""}>
        <StatusBadge status={appointment.status} />

        {/* Patient */}
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-[10px] tracking-[0.15em] text-muted uppercase mb-4">Patient</p>
          <div className="flex flex-col gap-4">
            {patientFields.map(({ label, value }) => (
              <div key={label}>
                <p className="text-[10px] tracking-[0.15em] text-muted uppercase mb-1">{label}</p>
                <p className="text-ink text-sm leading-relaxed break-words">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Appointment */}
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-[10px] tracking-[0.15em] text-muted uppercase mb-4">Appointment</p>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-[10px] tracking-[0.15em] text-muted uppercase mb-1">Service</p>
              <p className="text-ink text-sm leading-relaxed break-words">{appointment.service}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.15em] text-muted uppercase mb-1">Date</p>
              <p className="text-ink text-sm leading-relaxed">{formatDateOnly(scheduledDate)}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.15em] text-muted uppercase mb-1">Time</p>
              <p className="text-ink text-sm leading-relaxed">{formatTime(scheduledTime)}</p>
            </div>
            {!hasConfirmedSchedule && (
              <p className="text-muted text-xs">As requested by the patient — not yet confirmed.</p>
            )}
            {hasConfirmedSchedule && requestDiffersFromSchedule && (
              <div>
                <p className="text-[10px] tracking-[0.15em] text-muted uppercase mb-1">Originally requested</p>
                <p className="text-muted text-sm leading-relaxed">
                  {formatDateOnly(appointment.preferred_date)} at {formatTime(appointment.preferred_time)}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Booking source */}
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-[10px] tracking-[0.15em] text-muted uppercase mb-1">Booking Source</p>
          <p className="text-ink text-sm leading-relaxed">{BOOKING_SOURCE_LABELS[bookingSource]}</p>
        </div>

        {/* Additional details */}
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-[10px] tracking-[0.15em] text-muted uppercase mb-4">Additional details</p>
          <div className="flex flex-col gap-4">
            {additionalFields.map(({ label, value }) => (
              <div key={label}>
                <p className="text-[10px] tracking-[0.15em] text-muted uppercase mb-1">{label}</p>
                <p className="text-ink text-sm leading-relaxed break-words">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-[10px] tracking-[0.15em] text-muted uppercase mb-3">Actions</p>
          <div className="flex flex-col gap-2">
            {appointment.status !== "confirmed" && appointment.status !== "rescheduled" && (
              <button
                type="button"
                onClick={() => onStatus("confirmed")}
                className="text-left text-sm text-ink/70 hover:text-primary py-2 border-b border-border/50 last:border-b-0 transition-colors"
              >
                Confirm appointment
              </button>
            )}
            {(appointment.status === "confirmed" || appointment.status === "rescheduled") && (
              <button
                type="button"
                onClick={onReschedule}
                className="text-left text-sm text-ink/70 hover:text-primary py-2 border-b border-border/50 transition-colors"
              >
                Reschedule appointment
              </button>
            )}
            {appointment.status !== "completed" && (
              <button
                type="button"
                onClick={() => onStatus("completed")}
                className="text-left text-sm text-ink/70 hover:text-primary py-2 border-b border-border/50 transition-colors"
              >
                Mark completed
              </button>
            )}
            {appointment.status !== "cancelled" && (
              <button
                type="button"
                onClick={() => onStatus("cancelled")}
                className="text-left text-sm text-ink/70 hover:text-primary py-2 border-b border-border/50 transition-colors"
              >
                Cancel appointment
              </button>
            )}
            {appointment.status !== "pending" && (
              <button
                type="button"
                onClick={() => onStatus("pending")}
                className="text-left text-sm text-ink/70 hover:text-primary py-2 transition-colors"
              >
                Reopen as pending
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function RescheduleModal({
  appointment,
  value,
  saving,
  onChange,
  onClose,
  onSave,
}: {
  appointment: Appointment;
  value: { date: string; time: string };
  saving: boolean;
  onChange: (next: { date: string; time: string }) => void;
  onClose: () => void;
  onSave: () => void;
}) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    cancelRef.current?.focus();

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ink/35 p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reschedule-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-surface border border-border shadow-sm max-h-[100dvh] overflow-y-auto"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-5 sm:px-6 py-5 border-b border-border">
          <div>
            <p className="text-[10px] tracking-[0.15em] text-muted uppercase mb-2">Appointment</p>
            <h2 id="reschedule-title" className="font-serif text-2xl text-ink mb-1">Reschedule appointment</h2>
            <p className="text-muted text-sm">Choose a new date and time. The patient's original request stays on file.</p>
          </div>
          <button
            type="button"
            aria-label="Close reschedule dialog"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center text-muted hover:text-ink transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-5 sm:px-6 py-5 sm:py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-8">
            <div>
              <p className="text-[10px] tracking-[0.15em] text-muted uppercase mb-1">Patient</p>
              <p className="text-sm text-ink">{appointment.patient_name}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.15em] text-muted uppercase mb-1">Service</p>
              <p className="text-sm text-ink">{appointment.service}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.15em] text-muted uppercase mb-1">Current Date</p>
              <p className="text-sm text-ink">{formatDateOnly(getScheduledDate(appointment))}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.15em] text-muted uppercase mb-1">Current Time</p>
              <p className="text-sm text-ink">{formatTime(getScheduledTime(appointment))}</p>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <p className="text-[10px] tracking-[0.15em] text-muted uppercase mb-4">New Appointment</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              <div>
                <label htmlFor="reschedule-date" className="field-label">
                  New date
                </label>
                <input
                  id="reschedule-date"
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={value.date}
                  onChange={(event) => onChange({ ...value, date: event.target.value })}
                  className="w-full bg-transparent border border-border px-3 py-3 text-sm text-ink focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="reschedule-time" className="field-label">
                  New time
                </label>
                <input
                  id="reschedule-time"
                  type="time"
                  value={value.time}
                  onChange={(event) => onChange({ ...value, time: event.target.value })}
                  className="w-full bg-transparent border border-border px-3 py-3 text-sm text-ink focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
            <button
              ref={cancelRef}
              type="button"
              onClick={onClose}
              disabled={saving}
              className="min-h-11 px-5 py-3 border border-border text-sm text-ink hover:bg-cream transition-colors disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onSave}
              disabled={saving || !value.date || !value.time}
              className="min-h-11 px-5 py-3 bg-primary text-surface text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save Rescheduled Time"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const BOOKING_SOURCE_OPTIONS: Array<{ value: BookingSource; label: string }> = [
  { value: "phone", label: "Phone" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "website", label: "Website" },
];

interface NewAppointmentForm {
  patient_name: string;
  phone: string;
  email: string;
  booking_source: BookingSource;
  service: string;
  date: string;
  time: string;
  notes: string;
}

const EMPTY_NEW_APPOINTMENT: NewAppointmentForm = {
  patient_name: "",
  phone: "",
  email: "",
  booking_source: "phone",
  service: "",
  date: "",
  time: "",
  notes: "",
};

type NewAppointmentErrors = Partial<Record<keyof NewAppointmentForm, string>>;

function NewAppointmentModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: (message: string) => void;
}) {
  const [form, setForm] = useState<NewAppointmentForm>(EMPTY_NEW_APPOINTMENT);
  const [errors, setErrors] = useState<NewAppointmentErrors>({});
  const [conflict, setConflict] = useState<Appointment | null>(null);
  const [saving, setSaving] = useState(false);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstFieldRef.current?.focus();

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  function set(field: keyof NewAppointmentForm) {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setForm((f) => ({ ...f, [field]: value }));
      setErrors((e) => ({ ...e, [field]: undefined }));
      if (field === "date" || field === "time") setConflict(null);
    };
  }

  function validate(): boolean {
    const nextErrors: NewAppointmentErrors = {};
    if (!form.patient_name.trim()) nextErrors.patient_name = "Enter the patient's name.";
    if (!form.phone.trim()) nextErrors.phone = "Enter a phone number.";
    if (!form.service) nextErrors.service = "Select a service.";
    if (!form.date) nextErrors.date = "Choose a date.";
    if (!form.time) nextErrors.time = "Choose a time.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate()) return;

    if (!conflict) {
      const existing = findConflictingAppointment(form.date, form.time);
      if (existing) {
        setConflict(existing);
        return;
      }
    }

    setSaving(true);
    window.setTimeout(() => {
      createManualAppointment({
        patient_name: form.patient_name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        service: form.service,
        confirmed_date: form.date,
        confirmed_time: form.time,
        booking_source: form.booking_source,
        message: form.notes.trim(),
      });
      setSaving(false);
      onCreated("Appointment created successfully.");
    }, 250);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ink/35 p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-appointment-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-surface border border-border shadow-sm max-h-[100dvh] overflow-y-auto"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-5 sm:px-6 py-5 border-b border-border">
          <div>
            <p className="text-[10px] tracking-[0.15em] text-muted uppercase mb-2">Appointments</p>
            <h2 id="new-appointment-title" className="font-serif text-2xl text-ink mb-1">New appointment</h2>
            <p className="text-muted text-sm">Record a booking made by phone or WhatsApp.</p>
          </div>
          <button
            type="button"
            aria-label="Close new appointment dialog"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center text-muted hover:text-ink transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="px-5 sm:px-6 py-5 sm:py-6 flex flex-col gap-7">
          <div>
            <p className="text-[10px] tracking-[0.15em] text-muted uppercase mb-4">Patient</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="new-apt-name" className="field-label">Patient name *</label>
                <input
                  ref={firstFieldRef}
                  id="new-apt-name"
                  className="w-full bg-transparent border-b border-border py-2.5 text-sm text-ink focus:outline-none focus:border-primary transition-colors"
                  value={form.patient_name}
                  onChange={set("patient_name")}
                  aria-invalid={Boolean(errors.patient_name)}
                  aria-describedby={errors.patient_name ? "new-apt-name-error" : undefined}
                />
                {errors.patient_name && (
                  <p id="new-apt-name-error" className="text-red-600 text-xs mt-1.5">{errors.patient_name}</p>
                )}
              </div>
              <div>
                <label htmlFor="new-apt-phone" className="field-label">Phone number *</label>
                <input
                  id="new-apt-phone"
                  type="tel"
                  className="w-full bg-transparent border-b border-border py-2.5 text-sm text-ink focus:outline-none focus:border-primary transition-colors"
                  value={form.phone}
                  onChange={set("phone")}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "new-apt-phone-error" : undefined}
                />
                {errors.phone && (
                  <p id="new-apt-phone-error" className="text-red-600 text-xs mt-1.5">{errors.phone}</p>
                )}
              </div>
            </div>
            <div className="mt-5">
              <label htmlFor="new-apt-email" className="field-label">Email (optional)</label>
              <input
                id="new-apt-email"
                type="email"
                className="w-full bg-transparent border-b border-border py-2.5 text-sm text-ink focus:outline-none focus:border-primary transition-colors"
                value={form.email}
                onChange={set("email")}
              />
            </div>
          </div>

          <div className="pt-6 border-t border-border">
            <p className="text-[10px] tracking-[0.15em] text-muted uppercase mb-4">Appointment</p>
            <div className="flex flex-col gap-5">
              <div>
                <label htmlFor="new-apt-service" className="field-label">Service *</label>
                <select
                  id="new-apt-service"
                  className="w-full bg-transparent border-b border-border py-2.5 text-sm text-ink focus:outline-none focus:border-primary transition-colors cursor-pointer"
                  value={form.service}
                  onChange={set("service")}
                  aria-invalid={Boolean(errors.service)}
                  aria-describedby={errors.service ? "new-apt-service-error" : undefined}
                >
                  <option value="">Select a service</option>
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                </select>
                {errors.service && (
                  <p id="new-apt-service-error" className="text-red-600 text-xs mt-1.5">{errors.service}</p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="new-apt-date" className="field-label">Date *</label>
                  <input
                    id="new-apt-date"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full bg-transparent border-b border-border py-2.5 text-sm text-ink focus:outline-none focus:border-primary transition-colors"
                    value={form.date}
                    onChange={set("date")}
                    aria-invalid={Boolean(errors.date)}
                    aria-describedby={errors.date ? "new-apt-date-error" : undefined}
                  />
                  {errors.date && (
                    <p id="new-apt-date-error" className="text-red-600 text-xs mt-1.5">{errors.date}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="new-apt-time" className="field-label">Time *</label>
                  <input
                    id="new-apt-time"
                    type="time"
                    className="w-full bg-transparent border-b border-border py-2.5 text-sm text-ink focus:outline-none focus:border-primary transition-colors"
                    value={form.time}
                    onChange={set("time")}
                    aria-invalid={Boolean(errors.time)}
                    aria-describedby={errors.time ? "new-apt-time-error" : undefined}
                  />
                  {errors.time && (
                    <p id="new-apt-time-error" className="text-red-600 text-xs mt-1.5">{errors.time}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-border">
            <p className="text-[10px] tracking-[0.15em] text-muted uppercase mb-4">Booking source</p>
            <div className="flex gap-2">
              {BOOKING_SOURCE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, booking_source: option.value }))}
                  aria-pressed={form.booking_source === option.value}
                  className={`min-h-10 flex-1 px-4 py-2 text-xs tracking-wide border transition-colors ${
                    form.booking_source === option.value
                      ? "bg-primary text-surface border-primary"
                      : "border-border text-ink/60 hover:text-ink"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-border">
            <label htmlFor="new-apt-notes" className="field-label">Admin notes (optional)</label>
            <textarea
              id="new-apt-notes"
              rows={3}
              placeholder="e.g. Patient called requesting an afternoon appointment."
              className="w-full bg-transparent border-b border-border py-2.5 text-sm text-ink placeholder:text-muted/70 focus:outline-none focus:border-primary transition-colors resize-none"
              value={form.notes}
              onChange={set("notes")}
            />
          </div>

          {conflict && (
            <div role="alert" className="border-l-2 border-yellow-500 bg-yellow-50 px-4 py-3 text-sm text-yellow-900">
              {conflict.patient_name} already has an appointment at this date and time. Creating this one will not move or cancel the existing appointment.
            </div>
          )}

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="min-h-11 px-5 py-3 border border-border text-sm text-ink hover:bg-cream transition-colors disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="min-h-11 px-5 py-3 bg-primary text-surface text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-60"
            >
              {saving ? "Creating…" : conflict ? "Create anyway" : "Create Appointment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Appointment | null>(null);
  const [dateFilter, setDateFilter] = useState("");
  const [rescheduleTarget, setRescheduleTarget] = useState<Appointment | null>(null);
  const [rescheduleValue, setRescheduleValue] = useState({ date: "", time: "" });
  const [savingReschedule, setSavingReschedule] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [creatingAppointment, setCreatingAppointment] = useState(false);

  const load = useCallback(() => {
    setAppointments(
      getAppointments().sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    );
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!successMessage) return;
    const timeout = window.setTimeout(() => setSuccessMessage(""), 2500);
    return () => window.clearTimeout(timeout);
  }, [successMessage]);

  useEffect(() => {
    if (!selected) return;

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelected(null);
      }
    }

    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [selected]);

  function syncSelectedFromState(id: string) {
    const next = getAppointments().find((appointment) => appointment.id === id) || null;
    setSelected(next);
  }

  function handleStatus(id: string, status: AppointmentStatus) {
    updateAppointmentStatus(id, status);
    load();
    if (selected?.id === id) {
      syncSelectedFromState(id);
    }
  }

  function openDetails(appointment: Appointment) {
    setSelected(appointment);
  }

  function openReschedule(appointment: Appointment) {
    setRescheduleTarget(appointment);
    setRescheduleValue({
      date: appointment.confirmed_date || appointment.preferred_date,
      time: appointment.confirmed_time || appointment.preferred_time,
    });
  }

  function saveReschedule() {
    if (!rescheduleTarget || !rescheduleValue.date || !rescheduleValue.time) {
      return;
    }

    setSavingReschedule(true);

    window.setTimeout(() => {
      const updated = rescheduleAppointment(rescheduleTarget.id, rescheduleValue.date, rescheduleValue.time);
      load();
      if (updated) {
        if (selected?.id === updated.id) {
          setSelected(updated);
        }
        setSuccessMessage("Appointment rescheduled successfully.");
      }
      setSavingReschedule(false);
      setRescheduleTarget(null);
    }, 250);
  }

  const todayCount = appointments.filter((appointment) => isToday(parseISO(appointment.created_at))).length;
  const pendingCount = appointments.filter((appointment) => appointment.status === "pending").length;
  const confirmedCount = appointments.filter((appointment) => appointment.status === "confirmed").length;
  const completedCount = appointments.filter((appointment) => appointment.status === "completed").length;

  const filtered = useMemo(() => {
    return appointments.filter((appointment) => {
      const matchesStatus = filter === "all" || appointment.status === filter;
      const matchesDate = !dateFilter || getScheduledDate(appointment) === dateFilter;
      return matchesStatus && matchesDate;
    });
  }, [appointments, filter, dateFilter]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 xl:p-10 overflow-x-hidden">
      <div className="mb-8 lg:mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-ink mb-1">Appointments</h1>
          <p className="text-muted text-sm">Manage and update patient appointment requests.</p>
        </div>
        <button
          type="button"
          onClick={() => setCreatingAppointment(true)}
          className="inline-flex items-center justify-center gap-2 min-h-11 px-5 py-3 bg-primary text-surface text-sm font-medium hover:bg-primary-dark transition-colors self-start"
        >
          <Plus size={16} />
          New appointment
        </button>
      </div>

      {successMessage && (
        <div role="status" className="mb-6 border-l-2 border-primary bg-surface px-4 py-3 text-sm text-ink">
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-8 lg:mb-10">
        <StatCard label="Today" value={todayCount} icon={Calendar} />
        <StatCard label="Pending" value={pendingCount} icon={Clock} />
        <StatCard label="Confirmed" value={confirmedCount} icon={CheckCircle} />
        <StatCard label="Completed" value={completedCount} icon={Check} />
      </div>

      <div className="flex flex-col gap-4 mb-6">
        <div className="overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max gap-2">
            {STATUS_FILTERS.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setFilter(item.key)}
                className={`min-h-10 whitespace-nowrap px-4 py-2 text-xs tracking-wide border transition-colors ${
                  filter === item.key
                    ? "bg-primary text-surface border-primary"
                    : "border-border text-ink/60 hover:text-ink"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <div className="w-full sm:w-auto sm:min-w-[220px]">
            <label htmlFor="appointment-date-filter" className="field-label">
              Filter by date
            </label>
            <input
              id="appointment-date-filter"
              type="date"
              value={dateFilter}
              onChange={(event) => setDateFilter(event.target.value)}
              className="w-full min-h-11 bg-surface border border-border px-3 py-2.5 text-sm text-ink focus:outline-none focus:border-primary"
            />
          </div>
          {dateFilter && (
            <button
              type="button"
              onClick={() => setDateFilter("")}
              className="min-h-11 self-start sm:self-end px-1 text-sm text-muted hover:text-ink transition-colors"
            >
              Clear date filter
            </button>
          )}
        </div>
      </div>

      <div className={`flex flex-col xl:flex-row gap-6 ${selected ? "xl:items-start" : ""}`}>
        <div className="flex-1 min-w-0 bg-surface border border-border overflow-hidden">
          {filtered.length === 0 ? (
            <div className="py-16 text-center px-4">
              <p className="text-muted text-sm">No appointments found.</p>
            </div>
          ) : (
            <>
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full min-w-[760px] text-sm">
                  <thead>
                    <tr className="border-b border-border bg-cream/50">
                      <th className="px-5 py-3 text-left text-[10px] tracking-[0.15em] text-muted uppercase font-medium">Patient</th>
                      <th className="px-5 py-3 text-left text-[10px] tracking-[0.15em] text-muted uppercase font-medium">Service</th>
                      <th className="px-5 py-3 text-left text-[10px] tracking-[0.15em] text-muted uppercase font-medium">Scheduled Date</th>
                      <th className="px-5 py-3 text-left text-[10px] tracking-[0.15em] text-muted uppercase font-medium">Scheduled Time</th>
                      <th className="px-5 py-3 text-left text-[10px] tracking-[0.15em] text-muted uppercase font-medium">Status</th>
                      <th className="px-5 py-3 text-right text-[10px] tracking-[0.15em] text-muted uppercase font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((appointment) => (
                      <tr
                        key={appointment.id}
                        className={`border-b border-border last:border-b-0 hover:bg-cream/30 transition-colors cursor-pointer ${
                          selected?.id === appointment.id ? "bg-cream/50" : ""
                        }`}
                        onClick={() => openDetails(appointment)}
                      >
                        <td className="px-5 py-4">
                          <p className="font-medium text-ink text-sm">{appointment.patient_name}</p>
                          <p className="text-muted text-xs mt-0.5">{appointment.phone}</p>
                        </td>
                        <td className="px-5 py-4 text-ink/70 text-xs">{appointment.service}</td>
                        <td className="px-5 py-4 text-ink/70 text-xs">{formatDateOnly(getScheduledDate(appointment))}</td>
                        <td className="px-5 py-4 text-ink/70 text-xs">{formatTime(getScheduledTime(appointment))}</td>
                        <td className="px-5 py-4"><StatusBadge status={appointment.status} /></td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-1" onClick={(event) => event.stopPropagation()}>
                            {appointment.status === "pending" && (
                              <>
                                <ActionButton label="Confirm appointment" icon={Check} tone="green" onClick={() => handleStatus(appointment.id, "confirmed")} />
                                <ActionButton label="Cancel appointment" icon={X} tone="red" onClick={() => handleStatus(appointment.id, "cancelled")} />
                              </>
                            )}
                            {(appointment.status === "confirmed" || appointment.status === "rescheduled") && (
                              <>
                                <ActionButton label="Mark completed" icon={CheckCircle} onClick={() => handleStatus(appointment.id, "completed")} />
                                <ActionButton label="Reschedule appointment" icon={RotateCcw} tone="blue" onClick={() => openReschedule(appointment)} />
                                <ActionButton label="Cancel appointment" icon={X} tone="red" onClick={() => handleStatus(appointment.id, "cancelled")} />
                              </>
                            )}
                            {(appointment.status === "cancelled" || appointment.status === "completed") && (
                              <ActionButton label="Reopen as pending" icon={RotateCcw} onClick={() => handleStatus(appointment.id, "pending")} />
                            )}
                            <ActionButton label="View details" icon={Eye} onClick={() => openDetails(appointment)} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="lg:hidden divide-y divide-border">
                {filtered.map((appointment) => (
                  <div key={appointment.id} className="p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <button
                        type="button"
                        onClick={() => openDetails(appointment)}
                        className="min-w-0 flex-1 text-left"
                      >
                        <p className="font-medium text-ink text-sm truncate">{appointment.patient_name}</p>
                        <p className="text-muted text-xs mt-1 truncate">{appointment.service}</p>
                      </button>
                      <div className="flex items-start gap-2 flex-shrink-0">
                        <StatusBadge status={appointment.status} />
                        <ActionMenu
                          appointment={appointment}
                          onView={() => openDetails(appointment)}
                          onConfirm={() => handleStatus(appointment.id, "confirmed")}
                          onComplete={() => handleStatus(appointment.id, "completed")}
                          onCancel={() => handleStatus(appointment.id, "cancelled")}
                          onReopen={() => handleStatus(appointment.id, "pending")}
                          onReschedule={() => openReschedule(appointment)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                      <div>
                        <p className="text-[10px] tracking-[0.15em] text-muted uppercase mb-1">Date</p>
                        <p className="text-ink text-sm">{formatDateOnly(getScheduledDate(appointment))}</p>
                      </div>
                      <div>
                        <p className="text-[10px] tracking-[0.15em] text-muted uppercase mb-1">Time</p>
                        <p className="text-ink text-sm">{formatTime(getScheduledTime(appointment))}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <p className="text-muted text-xs truncate">{appointment.phone}</p>
                      <button
                        type="button"
                        onClick={() => openDetails(appointment)}
                        className="min-h-10 px-4 py-2 text-xs tracking-[0.08em] uppercase border border-border text-ink hover:bg-cream transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {selected && (
          <div className="hidden xl:block w-[22rem] flex-shrink-0">
            <AppointmentDetails
              appointment={selected}
              onClose={() => setSelected(null)}
              onStatus={(status) => handleStatus(selected.id, status)}
              onReschedule={() => openReschedule(selected)}
            />
          </div>
        )}
      </div>

      {selected && (
        <div
          className="xl:hidden fixed inset-0 z-40 bg-ink/30"
          role="dialog"
          aria-modal="true"
          aria-label="Appointment details"
          onClick={() => setSelected(null)}
        >
          <div
            className="absolute inset-x-0 bottom-0 top-12 bg-surface overflow-hidden"
            onClick={(event) => event.stopPropagation()}
          >
            <AppointmentDetails
              appointment={selected}
              onClose={() => setSelected(null)}
              onStatus={(status) => handleStatus(selected.id, status)}
              onReschedule={() => openReschedule(selected)}
              mobile
            />
          </div>
        </div>
      )}

      {rescheduleTarget && (
        <RescheduleModal
          appointment={rescheduleTarget}
          value={rescheduleValue}
          saving={savingReschedule}
          onChange={setRescheduleValue}
          onClose={() => {
            if (!savingReschedule) {
              setRescheduleTarget(null);
            }
          }}
          onSave={saveReschedule}
        />
      )}

      {creatingAppointment && (
        <NewAppointmentModal
          onClose={() => setCreatingAppointment(false)}
          onCreated={(message) => {
            load();
            setCreatingAppointment(false);
            setSuccessMessage(message);
          }}
        />
      )}
    </div>
  );
}
