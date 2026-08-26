import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Lock, ArrowLeft } from "lucide-react";
import { CLINIC, DOCTOR } from "../../data/content";

export default function Login() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (password === "admin123") {
        localStorage.setItem("admin_auth", "true");
        navigate("/admin");
      } else {
        setError("Incorrect password. Please try again.");
        setLoading(false);
      }
    }, 500);
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="text-center mb-10">
          <p className="text-[10px] tracking-[0.2em] text-muted uppercase mb-1">{CLINIC.name}</p>
          <p className="font-serif text-2xl text-ink">{DOCTOR.fullName}</p>
          <p className="text-muted text-xs mt-2">Admin Access</p>
        </div>

        <div className="bg-surface border border-border p-8">
          <div className="flex items-center gap-2 mb-8">
            <Lock size={14} className="text-primary" strokeWidth={1.5} />
            <h1 className="text-ink font-medium text-sm">Sign in to admin</h1>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label className="field-label">Password</label>
              <input
                type="password"
                className="w-full bg-transparent border-b border-border py-3 text-sm text-ink placeholder:text-muted/70 focus:outline-none focus:border-primary transition-colors"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
              />
            </div>

            {error && (
              <p className="text-red-600 text-xs">{error}</p>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="text-muted/50 text-[11px] mt-8 leading-relaxed">
            Demo password: <code className="bg-border/60 px-1 py-0.5 rounded">admin123</code>.
            Replace with Supabase Auth for production.
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted text-xs hover:text-ink transition-colors"
          >
            <ArrowLeft size={12} />
            Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}
