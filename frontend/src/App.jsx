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
import UserEdit from "@/pages/admin/UserEdit"
import Unauthorized from "@/pages/Unauthorized"
import { checkApiAvailability } from "@/services/api"
import LoadingScreen from "@/components/ui/LoadingScreen"
import { AuthProvider } from "@/hooks/useAuth"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import TasksPage from "@/pages/TasksPage"
import MeetingsPage from "@/pages/MeetingsPage"
import TeamsPage from "@/pages/TeamsPage"
import ManageTeamsPage from "@/pages/admin/ManageTeamsPage"
import { useTheme, ThemeProvider } from "@/hooks/useTheme"

const App = () => {
  const [isChecking, setIsChecking] = useState(true)
  const [apiAvailable, setApiAvailable] = useState(true)
  const { theme } = useTheme()

  useEffect(() => {
    const checkApi = async () => {
      const isAvailable = await checkApiAvailability()
      setApiAvailable(isAvailable)
      setIsChecking(false)
    }

    checkApi()
  }, [])

  if (isChecking) {
    return <LoadingScreen />
  }

  const demoMode = !apiAvailable

  return (
    <ThemeProvider>
      <div className={`${theme === "dark" ? "dark" : ""}`}>
        <Router>
          {demoMode && (
            <div className="demo-mode-banner">Backend API not available. Running in demo mode with mock data.</div>
          )}
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login demoMode={demoMode} />} />
            <Route path="/register" element={<Register demoMode={demoMode} />} />
            <Route path="/forgot-password" element={<ForgotPassword demoMode={demoMode} />} />
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
            </Route>

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  )
}

export default App
