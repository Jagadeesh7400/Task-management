"use client"

import { useNavigate, Link, useLocation } from "react-router-dom"
import { Home, CheckSquare, User, LogOut, Users, X, Moon, Sun, BarChart2, FileText } from "lucide-react"
import { useAuth } from "../../hooks/useAuth"
import { useTheme } from "../../hooks/useTheme"
import ZidioLogo from "../ui/ZidioLogo"

export default function Sidebar({ isOpen, setIsOpen, isMobile }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const isAdmin = user?.role === "admin"

  const handleLogout = async () => {
    await logout()
    navigate("/login")
  }

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`)
  }

  const navItems = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/" },
    { name: "Tasks", icon: <CheckSquare size={20} />, path: "/tasks" },
    { name: "Profile", icon: <User size={20} />, path: "/profile" },
  ]

  const adminItems = [
    { name: "Admin Dashboard", icon: <BarChart2 size={20} />, path: "/admin" },
    { name: "User Management", icon: <Users size={20} />, path: "/admin/users" },
    { name: "Audit Logs", icon: <FileText size={20} />, path: "/admin/audit-logs" },
  ]

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20" onClick={() => setIsOpen(false)} />
      )}

      <aside
        className="sidebar"
      >
        <div className="sidebar-header">
          <Link to="/" className="flex items-center space-x-2">
            <ZidioLogo className="h-8 w-8" />
            <span className="text-xl font-bold text-0077b6 dark:text-48cae4">Zidio</span>
          </Link>
          {isMobile && (
            <button onClick={() => setIsOpen(false)} className="md:hidden">
              <X size={24} className="text-0077b6 dark:text-48cae4" />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="sidebar-nav">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200
                  ${
                    isActive(item.path)
                      ? "bg-ade8f4 dark:bg-023e8a text-0077b6 dark:text-90e0ef font-medium"
                      : "text-0077b6 dark:text-90e0ef hover:bg-ade8f4 dark:hover:bg-023e8a"
                  }`}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Link>
            ))}

            {isAdmin && (
              <>
                <div className="pt-4 pb-2">
                  <div className="px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Admin
                  </div>
                </div>

                {adminItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200
                      ${
                        isActive(item.path)
                          ? "bg-ade8f4 dark:bg-023e8a text-0077b6 dark:text-90e0ef font-medium"
                          : "text-0077b6 dark:text-90e0ef hover:bg-ade8f4 dark:hover:bg-023e8a"
                      }`}
                  >
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                  </Link>
                ))}
              </>
            )}
          </nav>
        </div>

        <div className="p-4 border-t border-ade8f4 dark:border-023e8a">
          <button
            onClick={toggleTheme}
            className="flex items-center px-4 py-2 w-full text-0077b6 dark:text-90e0ef rounded-lg
              hover:bg-ade8f4 dark:hover:bg-023e8a transition-colors duration-200 mb-2"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            <span className="ml-3">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 w-full text-white rounded-lg
              bg-0077b6 hover:bg-023e8a transition-colors duration-200"
          >
            <LogOut size={20} />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}
