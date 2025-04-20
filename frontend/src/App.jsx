
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
import UserEdit from "@/pages/UserEdit"
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

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

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
            <Route path="admin">
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="users/:id/edit" element={<UserEdit />} />
              <Route path="teams" element={<ManageTeamsPage />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
