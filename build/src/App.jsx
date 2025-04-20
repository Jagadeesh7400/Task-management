"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import MainLayout from "@/components/layout/MainLayout"
import Login from "@/pages/auth/Login"
import Register from "@/pages/auth/Register"
import ForgotPassword from "@/pages/auth/ForgotPassword"
import VerifyEmail from "@/pages/auth/VerifyEmail"
import TaskBoard from "@/components/tasks/TaskBoard"
import Profile from "@/pages/Profile"
import AdminDashboard from "@/pages/admin/AdminDashboard"
import UserManagement from "@/pages/admin/UserManagement"
import Unauthorized from "@/pages/Unauthorized"
import { checkApiAvailability } from "@/services/api"
import LoadingScreen from "@/components/ui/LoadingScreen"
import { AuthProvider } from "@/hooks/useAuth"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import TasksPage from "@/pages/TasksPage"
import MeetingsPage from "@/pages/MeetingsPage"
import TeamsPage from "@/pages/TeamsPage"
import ManageTeamsPage from "@/pages/admin/ManageTeamsPage"
import UserEdit from "@/pages/admin/UserEdit"
import "@/styles/main.css"
import "@/styles/index.css"
import "@/styles/layout.css"
import "@/styles/tasks.css"
import "@/styles/admin.css"
import "@/styles/auth.css"
import "@/styles/profile.css"
import "@/styles/meetings.css"


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true")
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"))
  const [apiAvailable, setApiAvailable] = useState(true)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(storedIsLoggedIn)
    setUserRole(localStorage.getItem("userRole"))

    const checkApi = async () => {
      const isAvailable = await checkApiAvailability()
      setApiAvailable(isAvailable)
      setIsChecking(false)
    }

    checkApi()
  }, [])

  const setAuthStatus = (status, role) => {
    setIsLoggedIn(status)
    setUserRole(role)
    localStorage.setItem("isLoggedIn", status.toString())
    if (role) {
      localStorage.setItem("userRole", role)
    } else {
      localStorage.removeItem("userRole")
    }
  }

  if (isChecking) {
    return <LoadingScreen />
  }

  const demoMode = !apiAvailable

  return (
    <AuthProvider setAuthStatus={setAuthStatus}>
      <Router>
        {demoMode && (
          <div className="demo-mode-banner">Backend API not available. Running in demo mode with mock data.</div>
        )}
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={!isLoggedIn ? <Login demoMode={demoMode} /> : <Navigate to="/dashboard" />} />
          <Route
            path="/register"
            element={!isLoggedIn ? <Register demoMode={demoMode} /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/forgot-password"
            element={!isLoggedIn ? <ForgotPassword demoMode={demoMode} /> : <Navigate to="/dashboard" />}
          />
          <Route path="/verify-email/:token" element={<VerifyEmail demoMode={demoMode} />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="dashboard" element={<TaskBoard />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="meetings" element={<MeetingsPage />} />
            <Route path="teams" element={<TeamsPage />} />

            {/* Admin routes */}
            <Route path="admin">
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route
                path="users"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <UserManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="users/:id/edit"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <UserEdit />
                  </ProtectedRoute>
                }
              />
              <Route
                path="users/new"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <UserEdit />
                  </ProtectedRoute>
                }
              />
              <Route
                path="teams"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <ManageTeamsPage />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="admin/*" element={<Navigate to="/unauthorized" />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
