import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { DOCTOR, IMAGES, TIMELINE, AREAS_OF_EXPERTISE, CLINIC } from "../data/content";

export default function About() {
  return (
    <>
      {/* Page header */}
      <div className="pt-28 pb-16 px-6 lg:px-10 max-w-7xl mx-auto border-b border-border">
        <p className="eyebrow mb-4">Profile</p>
        <h1 className="font-serif text-5xl lg:text-7xl text-ink">About {DOCTOR.fullName}</h1>
      </div>

      {/* Doctor intro */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[480px_1fr] gap-14 lg:gap-24 items-start">
          <div className="bg-ink/5">
            <img
              src={IMAGES.doctorPortrait}
              alt={DOCTOR.fullName}
              className="w-full h-[520px] lg:h-[620px] object-cover object-top"
            />
          </div>
          <div className="lg:pt-4">
            <h2 className="font-serif text-3xl lg:text-4xl text-ink mb-8 leading-tight">
              {DOCTOR.fullName}
            </h2>
            <p className="text-accent font-medium text-sm tracking-wide mb-1">
              {DOCTOR.qualification}
            </p>
            <p className="text-muted text-sm mb-10">{DOCTOR.specialization}</p>

            <div className="flex flex-col gap-5 mb-12">
              {DOCTOR.bio.map((para, i) => (
                <p key={i} className="text-muted text-base leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            <dl className="grid grid-cols-2 gap-x-8 gap-y-7 pb-12 border-b border-border">
              <div>
                <dt className="text-[10px] tracking-[0.15em] text-muted uppercase mb-2">Qualification</dt>
                <dd className="text-ink text-sm font-medium">{DOCTOR.qualification}</dd>
              </div>
              <div>
                <dt className="text-[10px] tracking-[0.15em] text-muted uppercase mb-2">Experience</dt>
                <dd className="text-ink text-sm font-medium">{DOCTOR.experience} years</dd>
              </div>
              <div>
                <dt className="text-[10px] tracking-[0.15em] text-muted uppercase mb-2">Specialisation</dt>
                <dd className="text-ink text-sm font-medium">{DOCTOR.specialization}</dd>
              </div>
              <div>
                <dt className="text-[10px] tracking-[0.15em] text-muted uppercase mb-2">Clinic</dt>
                <dd className="text-ink text-sm font-medium">{CLINIC.name}</dd>
              </div>
            </dl>

            <Link to="/visit" className="link-arrow group mt-10">
              Book an Appointment
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Professional Journey */}
      <section className="py-20 lg:py-28 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-[340px_1fr] gap-14 lg:gap-20">
            <div>
              <p className="eyebrow mb-4">Journey</p>
              <h2 className="font-serif text-4xl lg:text-5xl text-ink leading-tight">
                Professional Journey
              </h2>
            </div>
            <div className="flex flex-col gap-0">
              {TIMELINE.map((entry, i) => (
                <div key={i} className="grid grid-cols-[80px_1fr] gap-6 pb-10 relative">
                  {/* Connector line */}
                  {i < TIMELINE.length - 1 && (
                    <span className="absolute left-[39px] top-5 bottom-0 w-px bg-border" />
                  )}
                  <div className="pt-0.5 flex-shrink-0">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-primary mt-1.5 relative z-10" />
                    <p className="text-[11px] text-muted mt-2 font-medium">{entry.year}</p>
                  </div>
                  <div className="pt-0.5">
                    <h3 className="text-ink font-semibold text-base mb-1">{entry.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{entry.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Areas of Expertise */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[340px_1fr] gap-14 lg:gap-20">
          <div>
            <p className="eyebrow mb-4">Expertise</p>
            <h2 className="font-serif text-4xl lg:text-5xl text-ink leading-tight">
              Areas of Expertise
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {AREAS_OF_EXPERTISE.map((area, i) => (
              <div key={i} className="flex items-center gap-3 py-4 border-b border-border">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                <p className="text-ink text-sm">{area}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 lg:py-28 bg-primary">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <p className="text-surface/40 text-[10px] tracking-[0.25em] uppercase mb-8">Philosophy</p>
          <blockquote className="font-serif text-3xl lg:text-4xl xl:text-5xl text-surface leading-relaxed italic mb-10">
            {DOCTOR.philosophy}
          </blockquote>
          <p className="text-surface/50 text-sm">{DOCTOR.fullName}</p>
          <p className="text-surface/30 text-xs mt-1">{DOCTOR.qualification} · {DOCTOR.specialization}</p>
        </div>
      </section>

      {/* Clinic Intro */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div>
            <p className="eyebrow mb-4">The Clinic</p>
            <h2 className="font-serif text-4xl lg:text-5xl text-ink mb-8 leading-tight">
              {CLINIC.name}
            </h2>
            <p className="text-muted text-base leading-relaxed mb-5">
              [Description of the clinic — when it was established, the philosophy behind it, and the type of care environment it provides for patients.]
            </p>
            <p className="text-muted text-base leading-relaxed mb-10">
              [Second paragraph about the clinic's approach to patient experience — appointment availability, wait times, privacy, follow-up care, and any additional features.]
            </p>
            <Link to="/facilities" className="link-arrow group">
              Explore Facilities
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="bg-ink/5">
            <img
              src={IMAGES.consultation1}
              alt="Clinic environment"
              className="w-full h-[380px] object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
