"use client"
import { NavLink, useNavigate } from "react-router-dom"
import {
  LayoutDashboard,
  CheckSquare,
  Clock,
  Send,
  PauseCircle,
  PlusCircle,
  BarChart2,
  Users,
  Settings,
  LogOut,
  Video,
  UserPlus
} from "lucide-react"
import ZidioLogo from "@/components/ui/ZidioLogo"
import "@/styles/layout.css"

const Sidebar = ({ isOpen, toggleSidebar, isAdmin }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Clear auth state
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userRole")
    navigate("/login")
  }

  const userNavItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/dashboard" },
    { icon: <CheckSquare size={20} />, label: "Completed Tasks", path: "/tasks/completed" },
    { icon: <Clock size={20} />, label: "Pending Tasks", path: "/tasks/pending" },
    { icon: <Send size={20} />, label: "In Progress Tasks", path: "/tasks/in-progress" },
    { icon: <PauseCircle size={20} />, label: "Deferred Tasks", path: "/tasks/deferred" },
    { icon: <PlusCircle size={20} />, label: "Add New Task", path: "/tasks/new" },
    { icon: <BarChart2 size={20} />, label: "Task Stats", path: "/stats" },
        { icon: <Video size={20} />, label: "Meetings", path: "/meetings" },
    { icon: <UserPlus size={20} />, label: "Teams", path: "/teams" },
  ]

  const adminNavItems = [
    { icon: <LayoutDashboard size={20} />, label: "Admin Dashboard", path: "/admin/dashboard" },
    { icon: <Users size={20} />, label: "User Management", path: "/admin/users" },
    { icon: <CheckSquare size={20} />, label: "All Tasks", path: "/admin/tasks" },
    { icon: <BarChart2 size={20} />, label: "Analytics", path: "/admin/analytics" },
    { icon: <Settings size={20} />, label: "Settings", path: "/admin/settings" },
        { icon: <Video size={20} />, label: "Meetings", path: "/meetings" },
            { icon: <UserPlus size={20} />, label: "Manage Teams", path: "/admin/teams" },

  ]

  const navItems = isAdmin ? adminNavItems : userNavItems

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <ZidioLogo size={32} />
          <span>Task Manager</span>
        </div>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <span></span>
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item, index) => (
          <NavLink key={index} to={item.path} className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <NavLink to="/profile" className="nav-item">
          <Settings size={20} />
          <span>Profile</span>
        </NavLink>

        <button className="nav-item logout" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar

