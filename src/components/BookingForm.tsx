import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { SERVICES, saveAppointment } from "../data/content";

interface FormData {
  patient_name: string;
  phone: string;
  email: string;
  service: string;
  preferred_date: string;
  preferred_time: string;
  message: string;
}

const EMPTY: FormData = {
  patient_name: "",
  phone: "",
  email: "",
  service: "",
  preferred_date: "",
  preferred_time: "",
  message: "",
};

interface Props {
  onSuccess?: () => void;
}

export default function BookingForm({ onSuccess }: Props) {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function set(field: keyof FormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      saveAppointment(form);
      setLoading(false);
      setSubmitted(true);
      onSuccess?.();
    }, 700);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle className="text-primary mb-4" size={36} strokeWidth={1.5} />
        <h3 className="font-serif text-2xl text-ink mb-3">Request Received</h3>
        <p className="text-muted text-sm leading-relaxed max-w-xs">
          Thank you. Our team will contact you to confirm your appointment date and time. Please do not consider this a confirmation yet.
        </p>
        <button
          onClick={() => { setForm(EMPTY); setSubmitted(false); }}
          className="mt-8 text-sm text-primary underline underline-offset-4 hover:text-primary-dark transition-colors"
        >
          Submit another request
        </button>
      </div>
    );
  }

  const fieldCls = "w-full bg-transparent border-b border-border py-3 text-sm text-ink placeholder:text-muted/70 focus:outline-none focus:border-primary transition-colors duration-200";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
        <div>
          <label className="field-label">Full Name *</label>
          <input
            className={fieldCls}
            placeholder="Your full name"
            value={form.patient_name}
            onChange={set("patient_name")}
            required
          />
        </div>
        <div>
          <label className="field-label">Phone Number *</label>
          <input
            className={fieldCls}
            type="tel"
            placeholder="Your phone number"
            value={form.phone}
            onChange={set("phone")}
            required
          />
        </div>
      </div>

      <div>
        <label className="field-label">Email (optional)</label>
        <input
          className={fieldCls}
          type="email"
          placeholder="your@email.com"
          value={form.email}
          onChange={set("email")}
        />
      </div>

      <div>
        <label className="field-label">Service / Consultation Type *</label>
        <select
          className={`${fieldCls} cursor-pointer`}
          value={form.service}
          onChange={set("service")}
          required
        >
          <option value="">Select a service</option>
          {SERVICES.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
        <div>
          <label className="field-label">Preferred Date *</label>
          <input
            className={fieldCls}
            type="date"
            value={form.preferred_date}
            onChange={set("preferred_date")}
            min={new Date().toISOString().split("T")[0]}
            required
          />
        </div>
        <div>
          <label className="field-label">Preferred Time *</label>
          <input
            className={fieldCls}
            type="time"
            value={form.preferred_time}
            onChange={set("preferred_time")}
            required
          />
        </div>
      </div>

      <div>
        <label className="field-label">Message (optional)</label>
        <textarea
          className={`${fieldCls} resize-none`}
          rows={3}
          placeholder="Any additional information or concerns..."
          value={form.message}
          onChange={set("message")}
        />
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? "Submitting…" : "Book Appointment"}
      </button>
    </form>
  );
}
