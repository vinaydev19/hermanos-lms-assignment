import { NavLink } from "react-router-dom";
import { Users, BookOpen, Calendar, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useLogoutUserMutation } from "@/store/api/userApiSlice";

const Sidebar = () => {
  const user = useSelector((state) => state.user.user);

  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const adminLinks = [
    { to: "/instructors", icon: Users, label: "Instructors" },
    { to: "/courses", icon: BookOpen, label: "Courses" },
    { to: "/lectures", icon: Calendar, label: "Lectures" },
  ];

  const instructorLinks = [
    { to: "/lectures", icon: Calendar, label: "Lectures" },
  ];

  const links = user?.role === "admin" ? adminLinks : instructorLinks;

  return (
    <div className="w-64 h-screen flex flex-col bg-[#0D1424] text-[#E5E7EB]">

      <div className="p-6 border-b border-[#182033]">
        <h1 className="text-2xl font-bold">LMS Dashboard</h1>

        <p className="text-sm text-[#9CA3AF] mt-1">{user?.name}</p>
        <p className="text-xs text-[#6B7280] capitalize">{user?.role}</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {links.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                ? "bg-[#1A253A] text-white"
                : "text-[#E5E7EB]/80 hover:bg-[#1A253A] hover:text-white"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-[#182033] bg-[#0F1525]">
        <Button
          variant="ghost"
          className="w-full justify-start text-[#E5E7EB]/80 hover:bg-[#1A253A] hover:text-white"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
