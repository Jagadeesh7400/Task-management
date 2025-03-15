"use client"

import { useNavigate, Link } from "react-router-dom"
import { Home, CheckSquare, User, LogOut, Users, Settings, X, Moon, Sun } from 'lucide-react'
import { useAuth } from "../../hooks/useAuth"
import { useTheme } from "../../hooks/useTheme"
import ZidioLogo from "../ui/ZidioLogo"

export default function Sidebar({ isOpen, setIsOpen, isMobile }) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const isAdmin = user?.role === "admin"

  const handleLogout = async () => {
    await logout()
    navigate("/login")
  }

  const navItems = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/" },
    { name: "Tasks", icon: <CheckSquare size={20} />, path: "/tasks" },
    { name: "Profile", icon: <User size={20} />, path: "/profile" },
    ...(isAdmin ? [{ name: "Admin", icon: <Users size={20} />, path: "/admin" }] : []),
    { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
  ]

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 animate-fade-in" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-30 h-full w-64 
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          glass dark:bg-dark-color
          border-r border-white border-opacity-20
          flex flex-col
          animate-slide-left
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-white border-opacity-20">
          <Link to="/" className="flex items-center space-x-2">
            <ZidioLogo className="h-8 w-8" />
            <span className="text-xl font-bold text-primary-color dark:text-secondary-color">Zidio</span>
          </Link>
          {isMobile && (
            <button 
              onClick={() => setIsOpen(false)} 
              className="md:hidden hover:bg-white hover:bg-opacity-10 p-1 rounded-full transition-colors"
            >
              <X size={24} className="text-primary-color dark:text-secondary-color" />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center px-4 py-3 text-dark-color dark:text-light-color rounded-lg
                  hover:bg-white hover:bg-opacity-20 dark:hover:bg-dark-color dark:hover:bg-opacity-50 
                  transition-all duration-200 group"
              >
                <div className="text-primary-color dark:text-secondary-color group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="ml-3 group-hover:translate-x-1 transition-transform">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-white border-opacity-20">
          <button
            onClick={toggleTheme}
            className="flex items-center px-4 py-2 w-full text-dark-color dark:text-light-color rounded-lg
              hover:bg-white hover:bg-opacity-20 dark:hover:bg-dark-color dark:hover:bg-opacity-50 
              transition-colors duration-200 mb-2 group"
          >
            <div className="text-primary-color dark:text-secondary-color group-hover:rotate-45 transition-transform">
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </div>
            <span className="ml-3">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 w-full text-white rounded-lg
              bg-primary-color hover:bg-secondary-color transition-colors duration-200 group"
          >
            <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}