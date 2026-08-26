import { useRef, useEffect } from "react";
import { Link } from "react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Stethoscope, ClipboardList, Shield, RefreshCw, Activity, ArrowRight, Phone, MessageCircle, MapPin } from "lucide-react";
import { CLINIC, DOCTOR, IMAGES, SERVICES } from "../data/content";
import BookingForm from "../components/BookingForm";

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP: Record<string, React.ElementType> = {
  Stethoscope,
  ClipboardList,
  Shield,
  RefreshCw,
  Activity,
};

const TRUST_METRICS = [
  { value: DOCTOR.experience, label: "Years Experience" },
  { value: "[X,000]+", label: "Patients Seen" },
  { value: "[X]+", label: "Certifications" },
];

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Chapter 1 — the opening scene reveals itself in sequence: label,
      // name, supporting text, then the call to action, while the
      // photograph settles into place a beat behind it.
      gsap.from(".hero-el", {
        y: 22,
        opacity: 0,
        duration: 0.85,
        stagger: 0.11,
        ease: "power3.out",
        delay: 0.15,
      });
      gsap.from(".hero-img", {
        opacity: 0,
        scale: 1.03,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.05,
      });

      // Every following chapter reveals once, quietly, as it enters view.
      // `once: true` means each trigger fires a single time and releases
      // itself — no pinning, no scrubbing, nothing that can ever hold the
      // page or fight with the navbar / mobile action bar.
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, {
          y: 26,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>(".reveal-img").forEach((el) => {
        gsap.from(el, {
          scale: 1.05,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="overflow-x-hidden">
      {/* ══ Chapter 1 — First Impression ══ */}
      <section className="relative min-h-screen grid lg:grid-cols-[55%_45%] bg-cream overflow-hidden">
        <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-24 pt-28 pb-20 lg:pt-0 order-2 lg:order-1">
          <p className="hero-el eyebrow mb-7">{CLINIC.name}</p>
          <h1 className="hero-el font-serif text-5xl sm:text-6xl lg:text-[5.5rem] text-ink leading-[1.03] mb-4">
            {DOCTOR.fullName}
          </h1>
          <p className="hero-el text-muted text-sm mb-1">{DOCTOR.qualification}</p>
          <p className="hero-el text-accent font-medium text-sm mb-8 tracking-wide">
            {DOCTOR.specialization}
          </p>
          <p className="hero-el text-ink/55 text-lg lg:text-xl leading-relaxed mb-10 max-w-sm">
            Compassionate care backed by experience, expertise, and a patient-first approach.
          </p>
          <div className="hero-el flex gap-3 flex-wrap">
            <Link to="/visit" className="btn-primary">
              Book an Appointment
            </Link>
            <Link to="/about" className="btn-secondary">
              Meet the Doctor
            </Link>
          </div>
        </div>

        <div className="hero-img relative h-72 sm:h-96 lg:h-auto order-1 lg:order-2 bg-ink/10">
          <img
            src={IMAGES.hero}
            alt={DOCTOR.fullName}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cream/40 via-transparent to-transparent lg:from-transparent lg:bg-gradient-to-r lg:from-cream/5" />
        </div>

        {/* Quiet scroll cue — decorative only, never required to use the page */}
        <div
          aria-hidden="true"
          className="hidden lg:flex absolute bottom-10 left-16 xl:left-24 flex-col items-center gap-3 z-10"
        >
          <span className="text-[10px] tracking-[0.3em] text-muted uppercase">Scroll</span>
          <span className="relative w-px h-10 bg-border overflow-hidden">
            <span className="motion-safe:animate-scroll-cue absolute inset-x-0 top-0 h-1/2 bg-primary" />
          </span>
        </div>
      </section>

      {/* ══ Chapter 2 — Meet the Doctor ══ */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
          <div className="reveal-img relative bg-ink/5">
            <img
              src={IMAGES.doctorPortrait}
              alt={DOCTOR.fullName}
              loading="lazy"
              className="w-full h-[480px] lg:h-[580px] object-cover object-top"
            />
          </div>
          <div className="reveal">
            <p className="eyebrow mb-4">Meet the Doctor</p>
            <h2 className="font-serif text-4xl lg:text-5xl text-ink mb-7 leading-tight">
              About {DOCTOR.fullName}
            </h2>
            <p className="text-muted text-base leading-relaxed mb-5">{DOCTOR.bio[0]}</p>
            <p className="text-muted text-base leading-relaxed mb-10">{DOCTOR.shortBio}</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-10 pb-10 border-b border-border">
              <span className="text-ink text-sm font-medium">{DOCTOR.qualification}</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="text-ink text-sm font-medium">{DOCTOR.experience} years experience</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="text-ink text-sm font-medium">{DOCTOR.specialization}</span>
            </div>
            <Link to="/about" className="link-arrow group">
              Meet the Doctor
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ Chapter 3 — Trust ══ */}
      <section className="py-20 lg:py-28 bg-surface border-y border-border">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <p className="reveal eyebrow mb-5">Why Patients Trust Us</p>
          <p className="reveal font-serif text-3xl lg:text-4xl text-ink leading-snug mb-16 max-w-2xl mx-auto">
            Built on years of consistent, attentive care.
          </p>
          <div className="reveal flex flex-wrap items-start justify-center gap-x-16 gap-y-10">
            {TRUST_METRICS.map((metric) => (
              <div key={metric.label}>
                <p className="font-serif text-5xl lg:text-6xl text-primary leading-none mb-3">{metric.value}</p>
                <p className="text-muted text-[11px] tracking-[0.15em] uppercase">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Chapter 4 — Areas of Expertise ══ */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[340px_1fr] gap-14 lg:gap-20">
          <div className="reveal lg:sticky lg:top-28 self-start">
            <p className="eyebrow mb-4">Expertise</p>
            <h2 className="font-serif text-4xl lg:text-5xl text-ink leading-tight mb-6">
              Areas of Expertise
            </h2>
            <p className="text-muted text-sm leading-relaxed mb-8 max-w-xs">
              A focused range of care, tailored to what each patient actually needs.
            </p>
            <Link to="/services" className="link-arrow group">
              Explore Services
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="reveal flex flex-col">
            {SERVICES.map((svc, i) => {
              const Icon = ICON_MAP[svc.icon] || Activity;
              return (
                <div
                  key={svc.id}
                  className="flex items-start gap-5 py-6 border-b border-border last:border-b-0"
                >
                  <span className="font-serif text-2xl text-primary/70 w-8 flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <Icon size={16} className="text-primary flex-shrink-0" strokeWidth={1.5} />
                      <h3 className="text-ink font-semibold text-base">{svc.name}</h3>
                    </div>
                    <p className="text-muted text-sm leading-relaxed">{svc.short}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ Chapter 5 — The Place of Care ══ */}
      <section className="py-20 lg:py-28 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="reveal eyebrow mb-4">The Place of Care</p>
          <h2 className="reveal font-serif text-4xl lg:text-5xl text-ink mb-12 leading-tight max-w-xl">
            A Comfortable Place for Better Care
          </h2>

          <div className="flex flex-col gap-3 mb-10">
            <div className="reveal-img bg-ink/5">
              <img
                src={IMAGES.reception}
                alt="Clinic reception"
                loading="lazy"
                className="w-full h-72 lg:h-[420px] object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="reveal-img bg-ink/5">
                <img
                  src={IMAGES.waitingRoom}
                  alt="Waiting area"
                  loading="lazy"
                  className="w-full h-44 lg:h-56 object-cover"
                />
              </div>
              <div className="reveal-img bg-ink/5">
                <img
                  src={IMAGES.equipment}
                  alt="Medical equipment"
                  loading="lazy"
                  className="w-full h-44 lg:h-56 object-cover"
                />
              </div>
            </div>
          </div>

          <div className="reveal grid lg:grid-cols-2 gap-10 lg:gap-24 items-start">
            <p className="text-muted text-base leading-relaxed max-w-md">
              [Brief description of what sets the clinic environment apart — the care taken with cleanliness, patient comfort, privacy, and access to modern equipment.]
            </p>
            <div>
              <ul className="flex flex-col gap-3.5 mb-8">
                {[
                  "Private consultation rooms",
                  "Modern diagnostic equipment",
                  "Comfortable, quiet waiting area",
                  "Strict hygiene and sterilisation protocols",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-ink/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/facilities" className="link-arrow group">
                Explore Facilities
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ Chapter 6 — Care Philosophy (a quiet pause) ══ */}
      <section className="py-20 lg:py-28 bg-primary">
        <div className="reveal max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <p className="text-surface/40 text-[10px] tracking-[0.25em] uppercase mb-8">Philosophy</p>
          <blockquote className="font-serif text-3xl lg:text-4xl xl:text-5xl text-surface leading-relaxed italic mb-10">
            {DOCTOR.philosophy}
          </blockquote>
          <p className="text-surface/50 text-sm">{DOCTOR.fullName}</p>
          <p className="text-surface/30 text-xs mt-1">{DOCTOR.qualification} · {DOCTOR.specialization}</p>
        </div>
      </section>

      {/* ══ Chapter 7 — Booking ══ */}
      <section className="py-20 lg:py-28 bg-sage">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20">
            <div className="reveal">
              <p className="eyebrow mb-4">Next Step</p>
              <h2 className="font-serif text-4xl lg:text-5xl text-ink mb-6 leading-tight">
                Ready to take the next step?
              </h2>
              <p className="text-muted text-base leading-relaxed mb-10 max-w-sm">
                Share a few details and our team will confirm your appointment shortly.
              </p>
              <div className="flex flex-col gap-7">
                <div className="flex gap-4">
                  <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-[10px] tracking-[0.15em] text-muted uppercase mb-1">Address</p>
                    <p className="text-ink text-sm leading-relaxed">{CLINIC.address}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="w-4 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] tracking-[0.15em] text-muted uppercase mb-1">Opening Hours</p>
                    <p className="text-ink text-sm">{CLINIC.hours.weekdays}</p>
                    <p className="text-ink text-sm">{CLINIC.hours.saturday}</p>
                    <p className="text-muted text-sm">{CLINIC.hours.sunday}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone size={16} className="text-primary mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-[10px] tracking-[0.15em] text-muted uppercase mb-1">Phone</p>
                    <a
                      href={`tel:${CLINIC.phone}`}
                      className="text-ink text-sm hover:text-primary transition-colors"
                    >
                      {CLINIC.phone}
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <MessageCircle size={16} className="text-primary mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-[10px] tracking-[0.15em] text-muted uppercase mb-1">WhatsApp</p>
                    <a
                      href={`https://wa.me/${CLINIC.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink text-sm hover:text-primary transition-colors"
                    >
                      {CLINIC.whatsapp}
                    </a>
                  </div>
                </div>
              </div>
              <Link to="/visit" className="link-arrow group mt-10">
                Full directions & map
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="reveal bg-surface p-8 lg:p-10 border border-border">
              <h3 className="font-serif text-2xl text-ink mb-8">Book an Appointment</h3>
              <BookingForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
