import { Link } from "react-router";
import { Stethoscope, ClipboardList, Shield, RefreshCw, Activity, ArrowRight } from "lucide-react";
import { SERVICES, DOCTOR } from "../data/content";

const ICON_MAP: Record<string, React.ElementType> = {
  Stethoscope,
  ClipboardList,
  Shield,
  RefreshCw,
  Activity,
};

export default function Services() {
  return (
    <>
      {/* Page header */}
      <div className="pt-28 pb-16 px-6 lg:px-10 max-w-7xl mx-auto border-b border-border">
        <p className="eyebrow mb-4">What We Offer</p>
        <h1 className="font-serif text-5xl lg:text-7xl text-ink">Services</h1>
      </div>

      {/* Intro */}
      <div className="py-14 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-muted text-lg leading-relaxed">
            [Brief introduction to the services offered — the overall approach to patient care and what patients can expect from a visit, written in the doctor's voice.]
          </p>
        </div>
      </div>

      {/* Services list */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-24 lg:pb-36 flex flex-col gap-0">
        {SERVICES.map((svc, i) => {
          const Icon = ICON_MAP[svc.icon] || Activity;
          return (
            <div
              key={svc.id}
              className="grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-20 py-16 border-b border-border"
            >
              {/* Icon + name */}
              <div>
                <Icon
                  size={22}
                  className="text-primary mb-5"
                  strokeWidth={1.5}
                />
                <h2 className="font-serif text-3xl text-ink mb-2">{svc.name}</h2>
                <p className="text-muted text-sm leading-relaxed">{svc.short}</p>
              </div>

              {/* Detail */}
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-[10px] tracking-[0.2em] text-muted uppercase mb-3">Overview</h3>
                  <p className="text-ink/70 text-sm leading-relaxed">{svc.overview}</p>
                </div>
                <div>
                  <h3 className="text-[10px] tracking-[0.2em] text-muted uppercase mb-3">Who It Is For</h3>
                  <p className="text-ink/70 text-sm leading-relaxed">{svc.whoFor}</p>
                </div>
                <div>
                  <h3 className="text-[10px] tracking-[0.2em] text-muted uppercase mb-3">What It Involves</h3>
                  <p className="text-ink/70 text-sm leading-relaxed">{svc.involves}</p>
                </div>
                <div>
                  <h3 className="text-[10px] tracking-[0.2em] text-muted uppercase mb-3">What to Expect</h3>
                  <p className="text-ink/70 text-sm leading-relaxed">{svc.expect}</p>
                  {svc.preparation && (
                    <>
                      <h3 className="text-[10px] tracking-[0.2em] text-muted uppercase mb-3 mt-6">Preparation</h3>
                      <p className="text-ink/70 text-sm leading-relaxed">{svc.preparation}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-sage border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-3xl lg:text-4xl text-ink mb-2">
              Ready to book a consultation?
            </h2>
            <p className="text-muted text-sm">
              Reach out and {DOCTOR.fullName} will be in touch to confirm your appointment.
            </p>
          </div>
          <Link to="/visit" className="btn-primary flex-shrink-0 group">
            Book an Appointment
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
