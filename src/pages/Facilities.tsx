import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { FACILITIES_LIST, IMAGES, CLINIC } from "../data/content";

export default function Facilities() {
  return (
    <>
      {/* Page header */}
      <div className="pt-28 pb-16 px-6 lg:px-10 max-w-7xl mx-auto border-b border-border">
        <p className="eyebrow mb-4">The Space</p>
        <h1 className="font-serif text-5xl lg:text-7xl text-ink">Facilities</h1>
      </div>

      {/* Intro */}
      <div className="py-14 max-w-7xl mx-auto px-6 lg:px-10 border-b border-border">
        <div className="max-w-2xl">
          <p className="text-muted text-lg leading-relaxed">
            [Brief description of the clinic's approach to creating a comfortable, private, and professional environment for patient care — the philosophy behind the space design.]
          </p>
        </div>
      </div>

      {/* Hero image */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="bg-ink/5 w-full">
          <img
            src={IMAGES.reception}
            alt="Clinic reception"
            className="w-full h-72 lg:h-[500px] object-cover"
          />
        </div>
      </div>

      {/* Facility rooms grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24 lg:pb-36">
        <p className="eyebrow mb-10">Areas</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {FACILITIES_LIST.map((item, i) => (
            <div key={i} className="border-b border-r border-border p-8 last:border-r-0 [&:nth-child(3n)]:border-r-0">
              <div className="bg-ink/5 mb-6">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <h3 className="text-ink font-semibold text-base mb-3">{item.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Standards section */}
      <section className="py-20 lg:py-28 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div>
              <p className="eyebrow mb-4">Standards</p>
              <h2 className="font-serif text-4xl lg:text-5xl text-ink mb-8 leading-tight">
                Care, Comfort & Cleanliness
              </h2>
              <div className="flex flex-col gap-6">
                {[
                  { label: "Infection Control", desc: "[Description of sterilisation and infection control protocols followed at the clinic.]" },
                  { label: "Patient Privacy", desc: "[How the clinic protects patient privacy — private rooms, confidential records, discreet service.]" },
                  { label: "Accessibility", desc: "[Accessibility features — wheelchair access, ramps, lifts, and facilities for patients with reduced mobility.]" },
                  { label: "Appointment System", desc: "[How appointments are managed to minimise wait times and respect patient schedules.]" },
                ].map((item) => (
                  <div key={item.label} className="pb-6 border-b border-border last:border-b-0 last:pb-0">
                    <h3 className="text-ink font-medium text-sm mb-2">{item.label}</h3>
                    <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-ink/5">
                <img src={IMAGES.consultation2} alt="Consultation room" className="w-full h-52 object-cover" />
              </div>
              <div className="bg-ink/5">
                <img src={IMAGES.waitingRoom} alt="Waiting area" className="w-full h-52 object-cover" />
              </div>
              <div className="col-span-2 bg-ink/5">
                <img src={IMAGES.corridor} alt="Clinic corridor" className="w-full h-48 object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h2 className="font-serif text-3xl text-ink mb-2">Come and see for yourself.</h2>
          <p className="text-muted text-sm">{CLINIC.address}</p>
        </div>
        <Link to="/visit" className="btn-primary flex-shrink-0 group">
          Plan Your Visit
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>
    </>
  );
}
