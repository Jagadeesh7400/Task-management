"use client"

import { useState, useRef, useEffect } from "react"
import { Bell, Menu, Search, X } from 'lucide-react'
import { useAuth } from "../../hooks/useAuth"
import NotificationPanel from "../notifications/NotificationPanel"

export default function Navbar({ onMenuButtonClick }) {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const searchInputRef = useRef(null)
  const notificationRef = useRef(null)

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [showSearch])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    // Implement search functionality
    console.log("Searching for:", searchQuery)
  }

  return (
    <header className="navbar glass dark:bg-dark-color dark:bg-opacity-80 border-b border-white border-opacity-20 animate-slide-down">
      <div className="navbar-content flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center">
          <button 
            onClick={onMenuButtonClick} 
            className="p-2 rounded-md text-primary-color dark:text-secondary-color 
              hover:bg-white hover:bg-opacity-20 transition-colors md:hidden"
          >
            <Menu size={24} />
          </button>

          {!showSearch && (
            <h1 className="navbar-title ml-2 text-xl font-semibold text-primary-color dark:text-secondary-color hidden md:block">
              Zidio Task Management
            </h1>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {showSearch ? (
            <form onSubmit={handleSearch} className="relative w-full md:w-64 animate-slide-up">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 pl-10 pr-4 text-sm glass
                  border border-white border-opacity-20 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-primary-color dark:focus:ring-secondary-color
                  placeholder-gray-500 dark:placeholder-gray-400"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-primary-color dark:text-secondary-color" />
              <button type="button" onClick={() => setShowSearch(false)} className="absolute right-3 top-2.5">
                <X className="h-4 w-4 text-primary-color dark:text-secondary-color" />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 rounded-md text-primary-color dark:text-secondary-color 
                hover:bg-white hover:bg-opacity-20 transition-colors"
            >
              <Search size={20} />
            </button>
          )}

          <div className="notification-container relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-md text-primary-color dark:text-secondary-color 
                hover:bg-white hover:bg-opacity-20 transition-colors"
            >
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-danger-color animate-pulse"></span>
            </button>

            {showNotifications && <NotificationPanel />}
          </div>

          <div className="user-info flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary-color flex items-center justify-center text-white
              hover:bg-secondary-color transition-colors cursor-pointer">
              {user?.name?.charAt(0) || "U"}
            </div>
            <span className="hidden md:block text-sm font-medium text-dark-color dark:text-light-color">
              {user?.name || "User"}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
