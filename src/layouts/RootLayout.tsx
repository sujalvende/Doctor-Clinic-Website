import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { Phone, MessageCircle, Calendar } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CLINIC } from "../data/content";

export default function RootLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />

      {/* Mobile sticky action bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-border">
        <div className="grid grid-cols-3 h-14">
          <a
            href={`tel:${CLINIC.phone}`}
            className="flex flex-col items-center justify-center gap-1 text-ink/60 hover:text-primary transition-colors"
          >
            <Phone size={17} />
            <span className="text-[10px] tracking-wide">Call</span>
          </a>
          <a
            href={`https://wa.me/${CLINIC.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-1 text-ink/60 hover:text-primary transition-colors border-x border-border"
          >
            <MessageCircle size={17} />
            <span className="text-[10px] tracking-wide">WhatsApp</span>
          </a>
          <a
            href="/visit"
            className="flex flex-col items-center justify-center gap-1 bg-primary text-surface"
          >
            <Calendar size={17} />
            <span className="text-[10px] tracking-wide">Book</span>
          </a>
        </div>
      </div>

      {/* Spacer for mobile action bar */}
      <div className="lg:hidden h-14" />
    </div>
  );
}
