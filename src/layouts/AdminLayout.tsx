import { Link, Outlet, NavLink, useNavigate } from "react-router";
import { LayoutDashboard, LogOut } from "lucide-react";
import { CLINIC, DOCTOR } from "../data/content";

export default function AdminLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("admin_auth");
    navigate("/admin/login");
  }

  return (
    <div className="min-h-screen bg-cream lg:flex">
      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-20 bg-surface/95 backdrop-blur-sm border-b border-border px-4 py-4">
        <p className="text-[10px] tracking-[0.2em] text-muted uppercase mb-0.5">{CLINIC.name}</p>
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="group">
            <p className="font-serif text-lg text-ink leading-tight group-hover:text-primary transition-colors">{DOCTOR.fullName}</p>
            <p className="text-xs text-muted mt-1">Admin Dashboard</p>
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex min-h-10 items-center gap-2 px-3 py-2 text-sm text-ink/60 hover:text-ink transition-colors"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="hidden lg:flex w-60 shrink-0 bg-surface border-r border-border flex-col">
        <div className="px-6 py-6 border-b border-border">
          <p className="text-[10px] tracking-[0.2em] text-muted uppercase mb-0.5">{CLINIC.name}</p>
          <Link to="/" className="group inline-block">
            <p className="font-serif text-lg text-ink leading-tight group-hover:text-primary transition-colors">{DOCTOR.fullName}</p>
          </Link>
          <p className="text-xs text-muted mt-1">Admin Dashboard</p>
        </div>

        <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 text-sm rounded transition-colors ${
                isActive
                  ? "bg-primary text-surface"
                  : "text-ink/60 hover:text-ink hover:bg-ink/5"
              }`
            }
          >
            <LayoutDashboard size={16} />
            Appointments
          </NavLink>
        </nav>

        <div className="px-4 py-6 border-t border-border">
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-ink/60 hover:text-ink transition-colors w-full"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="min-w-0 flex-1 overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  );
}
