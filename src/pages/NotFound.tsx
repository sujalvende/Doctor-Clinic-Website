import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-cream">
      <p className="font-serif text-[120px] lg:text-[180px] text-border leading-none select-none">
        404
      </p>
      <h1 className="font-serif text-3xl lg:text-4xl text-ink mb-4 -mt-4">Page not found</h1>
      <p className="text-muted text-base max-w-sm mb-10">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className="btn-primary group">
        Return Home
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
