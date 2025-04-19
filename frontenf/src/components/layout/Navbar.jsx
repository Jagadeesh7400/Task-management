"use client"

import { useState } from "react"
import { Menu, Search, Bell, User, X, Clock, CheckSquare } from "lucide-react"
import "../../styles/layout.css"

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
            <span className="notification-badge">3</span>
          </button>

          {showNotifications && (
            <div className="notification-dropdown">
              <div className="notification-header">
                <h3>Notifications</h3>
                <button>Mark all as read</button>
              </div>

              <div className="notification-list">
                <div className="notification-item unread">
                  <div className="notification-icon task-added">
                    <Bell size={16} />
                  </div>
                  <div className="notification-content">
                    <p>New task assigned: "Update website content"</p>
                    <span>30 minutes ago</span>
                  </div>
                </div>

                <div className="notification-item unread">
                  <div className="notification-icon deadline">
                    <Clock size={16} />
                  </div>
                  <div className="notification-content">
                    <p>Task deadline approaching: "Design new logo"</p>
                    <span>1 hour ago</span>
                  </div>
                </div>

                <div className="notification-item">
                  <div className="notification-icon completed">
                    <CheckSquare size={16} />
                  </div>
                  <div className="notification-content">
                    <p>Task completed: "Implement user authentication"</p>
                    <span>Yesterday</span>
                  </div>
                </div>
              </div>

              <div className="notification-footer">
                <button>View all notifications</button>
              </div>
            </div>
          )}
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

