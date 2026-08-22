import { useRef, useEffect } from "react";
import { Link } from "react-router";
import { gsap } from "gsap";
import { Stethoscope, ClipboardList, Shield, RefreshCw, Activity, ArrowRight, Phone, MessageCircle, MapPin } from "lucide-react";
import { CLINIC, DOCTOR, IMAGES, SERVICES } from "../data/content";
import BookingForm from "../components/BookingForm";

const ICON_MAP: Record<string, React.ElementType> = {
  Stethoscope,
  ClipboardList,
  Shield,
  RefreshCw,
  Activity,
};

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="min-h-screen grid lg:grid-cols-2 bg-cream overflow-hidden"
      >
        {/* Text block */}
        <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-24 pt-28 pb-20 lg:pt-0 order-2 lg:order-1">
          <p className="hero-el text-[10px] tracking-[0.25em] text-muted uppercase mb-7">
            {CLINIC.name}
          </p>
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
            <Link
              to="/visit"
              className="bg-primary text-surface text-xs tracking-[0.15em] uppercase px-7 py-4 hover:bg-primary-dark transition-colors"
            >
              Book an Appointment
            </Link>
            <Link
              to="/about"
              className="border border-ink/20 text-ink text-xs tracking-[0.15em] uppercase px-7 py-4 hover:bg-ink/5 transition-colors"
            >
              Explore Profile
            </Link>
          </div>
          {/* Credibility strip */}
          <div className="hero-el flex gap-10 mt-14 pt-8 border-t border-border">
            <div>
              <p className="font-serif text-3xl text-primary">{DOCTOR.experience}</p>
              <p className="text-muted text-[11px] tracking-[0.1em] mt-1 uppercase">Yrs Experience</p>
            </div>
            <div>
              <p className="font-serif text-3xl text-primary">[X,000]+</p>
              <p className="text-muted text-[11px] tracking-[0.1em] mt-1 uppercase">Patients Seen</p>
            </div>
            <div>
              <p className="font-serif text-3xl text-primary">[X]+</p>
              <p className="text-muted text-[11px] tracking-[0.1em] mt-1 uppercase">Certifications</p>
            </div>
          </div>
        </div>

        {/* Doctor image */}
        <div className="hero-img relative h-72 sm:h-96 lg:h-auto order-1 lg:order-2 bg-ink/10">
          <img
            src={IMAGES.hero}
            alt={DOCTOR.fullName}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cream/40 via-transparent to-transparent lg:from-transparent lg:bg-gradient-to-r lg:from-cream/5" />
        </div>
      </section>

      {/* ── About Preview ── */}
      <section className="py-24 lg:py-36 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
          <div className="relative bg-ink/5">
            <img
              src={IMAGES.doctorPortrait}
              alt={DOCTOR.fullName}
              className="w-full h-[480px] lg:h-[580px] object-cover object-top"
            />
          </div>
          <div>
            <p className="text-[10px] tracking-[0.25em] text-muted uppercase mb-4">About</p>
            <h2 className="font-serif text-4xl lg:text-5xl text-ink mb-7 leading-tight">
              About {DOCTOR.fullName}
            </h2>
            <p className="text-muted text-base leading-relaxed mb-5">{DOCTOR.bio[0]}</p>
            <p className="text-muted text-base leading-relaxed mb-10">{DOCTOR.shortBio}</p>
            <dl className="grid grid-cols-3 gap-6 mb-10 pb-10 border-b border-border">
              <div>
                <dt className="text-[10px] tracking-[0.15em] text-muted uppercase mb-2">Qualification</dt>
                <dd className="text-ink text-sm font-medium">{DOCTOR.qualification}</dd>
              </div>
              <div>
                <dt className="text-[10px] tracking-[0.15em] text-muted uppercase mb-2">Experience</dt>
                <dd className="text-ink text-sm font-medium">{DOCTOR.experience} years</dd>
              </div>
              <div>
                <dt className="text-[10px] tracking-[0.15em] text-muted uppercase mb-2">Specialty</dt>
                <dd className="text-ink text-sm font-medium">{DOCTOR.specialization}</dd>
              </div>
            </dl>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-primary text-sm font-medium group"
            >
              Meet the Doctor
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Services Preview ── */}
      <section className="py-24 lg:py-36 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-[340px_1fr] gap-14 lg:gap-20">
            <div className="lg:sticky lg:top-28 self-start">
              <p className="text-[10px] tracking-[0.25em] text-muted uppercase mb-4">Expertise</p>
              <h2 className="font-serif text-4xl lg:text-5xl text-ink leading-tight mb-8">
                Areas of Expertise
              </h2>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-primary text-sm font-medium group"
              >
                Explore Services
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {SERVICES.map((svc, i) => {
                const Icon = ICON_MAP[svc.icon] || Activity;
                const borderRight = i % 2 === 0 ? "sm:border-r border-border" : "";
                return (
                  <div key={svc.id} className={`p-8 border-b border-border ${borderRight}`}>
                    <Icon size={18} className="text-primary mb-5" strokeWidth={1.5} />
                    <h3 className="text-ink font-semibold text-sm mb-2">{svc.name}</h3>
                    <p className="text-muted text-sm leading-relaxed">{svc.short}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Facilities Preview ── */}
      <section className="py-24 lg:py-36 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
          {/* Photo grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 bg-ink/5">
              <img
                src={IMAGES.reception}
                alt="Clinic reception"
                className="w-full h-60 lg:h-72 object-cover"
              />
            </div>
            <div className="bg-ink/5">
              <img
                src={IMAGES.waitingRoom}
                alt="Waiting area"
                className="w-full h-44 object-cover"
              />
            </div>
            <div className="bg-ink/5">
              <img
                src={IMAGES.equipment}
                alt="Medical equipment"
                className="w-full h-44 object-cover"
              />
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="text-[10px] tracking-[0.25em] text-muted uppercase mb-4">Facilities</p>
            <h2 className="font-serif text-4xl lg:text-5xl text-ink mb-6 leading-tight">
              A Comfortable Place for Better Care
            </h2>
            <p className="text-muted text-base leading-relaxed mb-8">
              [Brief description of what sets the clinic environment apart — the care taken with cleanliness, patient comfort, privacy, and access to modern equipment.]
            </p>
            <ul className="flex flex-col gap-3.5 mb-10">
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
            <Link
              to="/facilities"
              className="inline-flex items-center gap-2 text-primary text-sm font-medium group"
            >
              Explore Facilities
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Visit / Book Preview ── */}
      <section className="py-24 lg:py-36 bg-sage">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20">
            {/* Clinic info */}
            <div>
              <p className="text-[10px] tracking-[0.25em] text-muted uppercase mb-4">Visit Us</p>
              <h2 className="font-serif text-4xl lg:text-5xl text-ink mb-10 leading-tight">
                Visit {DOCTOR.fullName}
              </h2>
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
              <Link
                to="/visit"
                className="inline-flex items-center gap-2 text-primary text-sm font-medium group mt-10"
              >
                Full directions & map
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Booking form */}
            <div className="bg-surface p-8 lg:p-10 border border-border">
              <h3 className="font-serif text-2xl text-ink mb-8">Book an Appointment</h3>
              <BookingForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
