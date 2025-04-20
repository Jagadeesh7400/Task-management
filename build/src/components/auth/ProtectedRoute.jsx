"use client"

import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import LoadingScreen from "@/components/ui/LoadingScreen"

export default function ProtectedRoute({ children, requireAdmin = false, requireVerified = true }) {
  const { user, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!user) {
    // Redirect to login page and save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (requireVerified && !user.isVerified) {
    // Redirect to verification reminder page
    return <Navigate to="/verification-required" replace />
  }

  if (requireAdmin && user.role !== "admin") {
    // Redirect to unauthorized page
    return <Navigate to="/unauthorized" replace />
  }

  return children
}
