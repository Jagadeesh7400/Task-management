"use client"

import { useState, useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import "../../styles/layout.css"

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const location = useLocation()
  const isAdmin = location.pathname.includes("/admin")

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile) setSidebarOpen(false)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="app-container">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} isAdmin={isAdmin} />

      <div className={`main-content ${sidebarOpen ? "sidebar-open" : ""}`}>
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} isAdmin={isAdmin} />

        <div className="page-container">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default MainLayout

