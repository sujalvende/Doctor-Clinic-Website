import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X } from "lucide-react";
import { CLINIC, DOCTOR } from "../data/content";

const NAV_LINKS = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/facilities", label: "Facilities" },
  { to: "/gallery", label: "Gallery" },
  { to: "/visit", label: "Visit" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-surface/96 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 lg:h-20 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex-shrink-0 group" onClick={() => setMenuOpen(false)}>
          <p className="text-[10px] tracking-[0.2em] text-muted uppercase font-medium leading-none mb-0.5">
            {CLINIC.name}
          </p>
          <p className="font-serif text-xl text-ink leading-none group-hover:text-primary transition-colors">
            {DOCTOR.fullName}
          </p>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm transition-colors duration-200 ${
                  isActive
                    ? "text-primary font-medium"
                    : "text-ink/60 hover:text-ink"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/visit"
            className="ml-2 bg-primary text-surface text-xs tracking-[0.12em] uppercase px-6 py-2.5 hover:bg-primary-dark transition-colors"
          >
            Book Appointment
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="lg:hidden p-2 -mr-2 text-ink"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-surface z-40 overflow-y-auto">
          <nav className="max-w-7xl mx-auto px-6 py-8 flex flex-col">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `text-2xl font-serif py-4 border-b border-border transition-colors ${
                    isActive ? "text-primary" : "text-ink"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/visit"
              onClick={() => setMenuOpen(false)}
              className="mt-8 bg-primary text-surface text-center text-sm tracking-[0.12em] uppercase py-4"
            >
              Book Appointment
            </Link>
            <div className="mt-10 pt-8 border-t border-border">
              <p className="text-xs text-muted mb-1">{CLINIC.phone}</p>
              <p className="text-xs text-muted">{CLINIC.address}</p>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
