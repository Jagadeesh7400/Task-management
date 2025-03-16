"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { AuthProvider } from "./hooks/useAuth"
import { TasksProvider } from "./hooks/useTasks"
import { ThemeProvider } from "./hooks/useTheme"
import MainLayout from "./components/layout/MainLayout"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import ForgotPassword from "./pages/auth/ForgotPassword"
import VerifyEmail from "./pages/auth/VerifyEmail"
import Dashboard from "./pages/Dashboard"
import TasksPage from "./pages/TasksPage"
import Profile from "./pages/Profile"
import Unauthorized from "./pages/Unauthorized"
import AdminDashboard from "./pages/admin/AdminDashboard"
import UserManagement from "./pages/admin/UserManagement"
import UserEdit from "./pages/admin/UserEdit"
import AuditLogs from "./pages/admin/AuditLogs"
import ProtectedRoute from "./components/auth/ProtectedRoute"

// Import CSS
import "./styles/index.css"

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
              <Route path="/verify-email/:token" element={<VerifyEmail />} />
              <Route path="/verification-required" element={<div>Please verify your email</div>} />
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
                <Route index element={<Dashboard />} />
                <Route path="tasks" element={<TasksPage />} />
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
                  path="admin/users"
                  element={
                    <ProtectedRoute requireAdmin>
                      <UserManagement />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="admin/users/:id/edit"
                  element={
                    <ProtectedRoute requireAdmin>
                      <UserEdit />
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

