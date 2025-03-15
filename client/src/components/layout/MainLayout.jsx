import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import { useAuth } from "../../hooks/useAuth"
import LoadingScreen from "../ui/LoadingScreen"

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { isLoading } = useAuth()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-primary-color to-secondary-color dark:from-dark-color dark:to-primary-color animate-fade-in">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} isMobile={isMobile} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar onMenuButtonClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 animate-slide-up">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

