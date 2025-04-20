"use client"

import { useState } from "react"
import { Menu, Search, Bell, User, X, Clock, CheckSquare } from "lucide-react"
import "@/styles/layout.css"
import NotificationPanel from "@/components/notifications/NotificationPanel"

const Navbar = ({ toggleSidebar, isAdmin }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    console.log("Searching for:", searchQuery)
    // Implement search functionality
  }

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="menu-button" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>

        <h1 className="page-title">{isAdmin ? "Admin Dashboard" : "Task Manager"}</h1>
      </div>

      <div className="navbar-right">
        {showSearch ? (
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks..."
              className="search-input"
            />
            <button type="submit" className="search-button">
              <Search size={20} />
            </button>
            <button type="button" className="search-close" onClick={() => setShowSearch(false)}>
              <X size={20} />
            </button>
          </form>
        ) : (
          <button className="icon-button" onClick={() => setShowSearch(true)}>
            <Search size={20} />
          </button>
        )}

        <div className="notification-container">
          <button className="icon-button" onClick={() => setShowNotifications(!showNotifications)}>
            <Bell size={20} />
          </button>

          {showNotifications && <NotificationPanel />}
        </div>

        <div className="user-menu">
          <button className="user-button">
            <div className="avatar">
              <User size={20} />
            </div>
            <span className="username">John Doe</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
