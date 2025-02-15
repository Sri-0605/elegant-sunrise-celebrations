
import { NavLink } from "react-router-dom";
import { Motion } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Image,
  Calendar,
  Briefcase,
  Settings,
  LogOut,
} from "lucide-react";

const AdminSidebar = () => {
  const { logout, user } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: Image, label: "Gallery", path: "/admin/gallery" },
    { icon: Calendar, label: "Bookings", path: "/admin/bookings" },
    { icon: Briefcase, label: "Services", path: "/admin/services" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ];

  return (
    <Motion
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="w-64 bg-background border-r border-white/10 p-4 flex flex-col h-screen sticky top-0"
    >
      <div className="flex items-center gap-3 px-2 py-4">
        <img
          src="/lovable-uploads/9429bab3-59d1-4091-aa3d-98ae8360bad7.png"
          alt="Logo"
          className="w-10 h-10"
        />
        <div>
          <h2 className="font-playfair font-bold text-white">Admin Panel</h2>
          <p className="text-xs text-white/60">{user?.email}</p>
        </div>
      </div>

      <nav className="flex-1 mt-8">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-accent text-white"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <Button
        variant="ghost"
        className="mt-auto flex items-center gap-2 text-white/60 hover:text-white w-full justify-start"
        onClick={logout}
      >
        <LogOut size={18} />
        <span>Logout</span>
      </Button>
    </Motion>
  );
};

export default AdminSidebar;
