import { Outlet, NavLink, useNavigate } from "react-router";
import { LayoutDashboard, LogOut } from "lucide-react";
import { CLINIC, DOCTOR } from "../data/content";

export default function AdminLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("admin_auth");
    navigate("/admin/login");
  }

  return (
    <div className="min-h-screen flex bg-cream">
      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 bg-surface border-r border-border flex flex-col">
        <div className="px-6 py-6 border-b border-border">
          <p className="text-[10px] tracking-[0.2em] text-muted uppercase mb-0.5">{CLINIC.name}</p>
          <p className="font-serif text-lg text-ink leading-tight">{DOCTOR.fullName}</p>
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
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-ink/60 hover:text-ink transition-colors w-full"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
