import { Link } from "react-router";
import { Phone, MessageCircle, MapPin, Mail } from "lucide-react";
import { CLINIC, DOCTOR } from "../data/content";

const NAV_LINKS = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/facilities", label: "Facilities" },
  { to: "/gallery", label: "Gallery" },
  { to: "/visit", label: "Visit" },
];

export default function Footer() {
  return (
    <footer className="bg-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Identity */}
          <div>
            <p className="text-[10px] tracking-[0.2em] text-surface/40 uppercase mb-1">
              {CLINIC.name}
            </p>
            <p className="font-serif text-2xl text-surface mb-5">{DOCTOR.fullName}</p>
            <p className="text-surface/50 text-sm leading-relaxed">{DOCTOR.qualification}</p>
            <p className="text-surface/50 text-sm">{DOCTOR.specialization}</p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[10px] tracking-[0.2em] text-surface/30 uppercase mb-6">
              Navigation
            </p>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-surface/60 hover:text-surface text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] tracking-[0.2em] text-surface/30 uppercase mb-6">
              Contact
            </p>
            <div className="flex flex-col gap-4">
              <a
                href={`tel:${CLINIC.phone}`}
                className="flex items-start gap-3 text-surface/60 hover:text-surface text-sm transition-colors"
              >
                <Phone size={14} className="mt-0.5 flex-shrink-0" />
                {CLINIC.phone}
              </a>
              <a
                href={`https://wa.me/${CLINIC.whatsapp.replace(/\D/g, "")}`}
                className="flex items-start gap-3 text-surface/60 hover:text-surface text-sm transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={14} className="mt-0.5 flex-shrink-0" />
                WhatsApp
              </a>
              {CLINIC.email && (
                <a
                  href={`mailto:${CLINIC.email}`}
                  className="flex items-start gap-3 text-surface/60 hover:text-surface text-sm transition-colors"
                >
                  <Mail size={14} className="mt-0.5 flex-shrink-0" />
                  {CLINIC.email}
                </a>
              )}
              <div className="flex items-start gap-3 text-surface/60 text-sm">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                <span>{CLINIC.address}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-surface/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-surface/25 text-xs">
            © {new Date().getFullYear()} {CLINIC.name}. All rights reserved.
          </p>
          <Link
            to="/admin/login"
            className="text-surface/15 hover:text-surface/35 text-xs transition-colors"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
