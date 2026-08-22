import { Phone, MessageCircle, MapPin, Clock, Mail } from "lucide-react";
import { CLINIC, DOCTOR } from "../data/content";
import BookingForm from "../components/BookingForm";

export default function Visit() {
  return (
    <>
      {/* Page header */}
      <div className="pt-28 pb-16 px-6 lg:px-10 max-w-7xl mx-auto border-b border-border">
        <p className="text-[10px] tracking-[0.25em] text-muted uppercase mb-4">How to Reach Us</p>
        <h1 className="font-serif text-5xl lg:text-7xl text-ink">Plan Your Visit</h1>
      </div>

      {/* Clinic info + map */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20">
          {/* Info */}
          <div>
            <div className="mb-10">
              <p className="text-[10px] tracking-[0.15em] text-muted uppercase mb-1">{CLINIC.name}</p>
              <h2 className="font-serif text-3xl text-ink">{DOCTOR.fullName}</h2>
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex gap-4 items-start">
                <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-[10px] tracking-[0.15em] text-muted uppercase mb-1.5">Address</p>
                  <p className="text-ink text-sm leading-relaxed">{CLINIC.address}</p>
                  <p className="text-muted text-xs mt-2">
                    [Brief directions — nearest landmark, public transport stop, or parking information.]
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <Clock size={16} className="text-primary mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-[10px] tracking-[0.15em] text-muted uppercase mb-1.5">Opening Hours</p>
                  <div className="flex flex-col gap-1">
                    <p className="text-ink text-sm">{CLINIC.hours.weekdays}</p>
                    <p className="text-ink text-sm">{CLINIC.hours.saturday}</p>
                    <p className="text-muted text-sm">{CLINIC.hours.sunday}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <Phone size={16} className="text-primary mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-[10px] tracking-[0.15em] text-muted uppercase mb-1.5">Phone</p>
                  <a
                    href={`tel:${CLINIC.phone}`}
                    className="text-ink text-sm hover:text-primary transition-colors"
                  >
                    {CLINIC.phone}
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <MessageCircle size={16} className="text-primary mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-[10px] tracking-[0.15em] text-muted uppercase mb-1.5">WhatsApp</p>
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

              {CLINIC.email && (
                <div className="flex gap-4 items-start">
                  <Mail size={16} className="text-primary mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-[10px] tracking-[0.15em] text-muted uppercase mb-1.5">Email</p>
                    <a
                      href={`mailto:${CLINIC.email}`}
                      className="text-ink text-sm hover:text-primary transition-colors"
                    >
                      {CLINIC.email}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Map */}
          <div className="bg-ink/5 relative">
            {CLINIC.mapEmbedUrl ? (
              <iframe
                src={CLINIC.mapEmbedUrl}
                width="100%"
                height="100%"
                className="absolute inset-0 w-full h-full min-h-[300px]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Clinic location"
              />
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[320px] lg:min-h-[400px] p-8 text-center">
                <MapPin size={28} className="text-border mb-4" strokeWidth={1} />
                <p className="text-muted text-sm mb-2">Map placeholder</p>
                <p className="text-muted/60 text-xs max-w-xs">
                  Replace <code className="bg-border/50 px-1 py-0.5 rounded text-[11px]">CLINIC.mapEmbedUrl</code> in{" "}
                  <code className="bg-border/50 px-1 py-0.5 rounded text-[11px]">src/data/content.ts</code> with your Google Maps embed URL.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Booking form */}
      <section className="border-t border-border bg-sage py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-[340px_1fr] gap-14 lg:gap-20">
            <div>
              <p className="text-[10px] tracking-[0.25em] text-muted uppercase mb-4">Appointments</p>
              <h2 className="font-serif text-4xl lg:text-5xl text-ink mb-6 leading-tight">
                Book an Appointment
              </h2>
              <p className="text-muted text-sm leading-relaxed">
                Fill in your details and preferred time. Our team will contact you to confirm the appointment. Please note that submitting this form does not guarantee a confirmed appointment.
              </p>
            </div>
            <div className="bg-surface p-8 lg:p-12 border border-border">
              <BookingForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
