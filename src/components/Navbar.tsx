import { useState, useEffect, useCallback, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router";
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
  const location = useLocation();
  const previousBodyOverflow = useRef<string | null>(null);
  const previousHtmlOverflow = useRef<string | null>(null);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const bodyStyle = document.body.style;
    const htmlStyle = document.documentElement.style;

    if (menuOpen) {
      previousBodyOverflow.current = bodyStyle.overflow;
      previousHtmlOverflow.current = htmlStyle.overflow;
      bodyStyle.overflow = "hidden";
      htmlStyle.overflow = "hidden";
    } else {
      bodyStyle.overflow = previousBodyOverflow.current ?? "";
      htmlStyle.overflow = previousHtmlOverflow.current ?? "";
      previousBodyOverflow.current = null;
      previousHtmlOverflow.current = null;
    }

    return () => {
      bodyStyle.overflow = previousBodyOverflow.current ?? "";
      htmlStyle.overflow = previousHtmlOverflow.current ?? "";
      previousBodyOverflow.current = null;
      previousHtmlOverflow.current = null;
    };
  }, [menuOpen]);

  useEffect(() => {
    closeMenu();
  }, [location.pathname, closeMenu]);

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
        <Link to="/" className="flex-shrink-0 group" onClick={closeMenu}>
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
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="lg:hidden relative z-[70] p-2 -mr-2 text-ink"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-x-0 top-16 bottom-0 z-[60] bg-surface transition-opacity duration-200 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="absolute inset-0 overflow-y-auto overscroll-contain">
          <nav id="mobile-navigation" className="max-w-7xl mx-auto px-6 py-8 pb-24 flex flex-col">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeMenu}
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
              onClick={closeMenu}
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
      </div>
    </header>
  );
}
