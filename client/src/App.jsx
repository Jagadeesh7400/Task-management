"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { AuthProvider, useAuth } from "./hooks/useAuth"
import { TasksProvider } from "./hooks/useTasks"
import { ThemeProvider } from "./hooks/useTheme"
import MainLayout from "./components/layout/MainLayout"
import Unauthorized from "./pages/Unauthorized"
import VerifyEmail from "./pages/auth/VerifyEmail"
import AuditLogs from "./pages/admin/AuditLogs"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import ForgotPassword from "./pages/auth/ForgotPassword"
import Dashboard from "./pages/Dashboard"
import Profile from "./pages/Profile"
import AdminDashboard from "./pages/admin/AdminDashboard"

// Protected route component
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return null // Show loading screen in MainLayout
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  if (requireAdmin && user.role !== "admin") {
    return <Navigate to="/" />
  }

  return children
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TasksProvider>
          <Router>
            <Routes>
              {/* Auth routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Protected routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <MainLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="tasks" element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />

                {/* Admin routes */}
                <Route
                  path="admin"
                  element={
                    <ProtectedRoute requireAdmin>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="admin/audit-logs"
                  element={
                    <ProtectedRoute requireAdmin>
                      <AuditLogs />
                    </ProtectedRoute>
                  }
                />
              </Route>

              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/verify-email/:token" element={<VerifyEmail />} />
            </Routes>
          </Router>

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 5000,
              style: {
                background: "#fff",
                color: "#0077b6",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "0.5rem",
                padding: "0.75rem 1rem",
              },
            }}
          />
        </TasksProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
