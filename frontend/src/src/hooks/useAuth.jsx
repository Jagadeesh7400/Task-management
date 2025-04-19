"use client"

import { useState, useEffect, useCallback, createContext, useContext } from "react"
import { api } from "../services/api"

const AuthContext = createContext(null)

export const AuthProvider = ({ children, setAuthStatus }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token")

        if (token) {
          try {
            const response = await api.get("/auth/validateToken", {
              headers: { Authorization: `Bearer ${token}` },
            })

            if (response.data && response.data.userId) {
              const userDetailsResponse = await api.get(`/users/${response.data.userId}`)
              setUser(userDetailsResponse.data)
              setAuthStatus(true, userDetailsResponse.data.role)
            }
          } catch (error) {
            console.error("Token validation failed:", error)
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            setUser(null)
            setAuthStatus(false, null)
          }
        }
      } catch (error) {
        console.error("Authentication error:", error)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser(null)
        setAuthStatus(false, null)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const register = useCallback(async (name, email, password) => {
    try {
      const response = await api.post("/auth/register", { name, email, password })
      return response.data
    } catch (error) {
      console.error("Registration error:", error)
      throw error.response?.data || { message: "Registration failed" }
    }
  }, [])

  const verifyEmail = useCallback(async (token) => {
    try {
      const response = await api.get(`/auth/verify-email/${token}`)
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))
      setUser(response.data.user)
      setAuthStatus(true, response.data.user.role)

      return response.data
    } catch (error) {
      console.error("Email verification error:", error)
      throw error.response?.data || { message: "Verification failed" }
    }
  }, [setAuthStatus])

  const login = useCallback(async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password })

      api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`

      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))

      setUser(response.data.user)
      setAuthStatus(true, response.data.user.role)
      return response.data.user
    } catch (error) {
      console.error("Login error:", error)
      throw error.response?.data || { message: "Login failed" }
    }
  }, [setAuthStatus])

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout")

      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setUser(null)
      setAuthStatus(false, null)
    } catch (error) {
      console.error("Logout error:", error)

      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setUser(null)
      setAuthStatus(false, null)
    }
  }, [setAuthStatus])

  const forgotPassword = useCallback(async (email) => {
    try {
      const response = await api.post("/auth/forgot-password", { email })
      return response.data
    } catch (error) {
      console.error("Forgot password error:", error)
      throw error.response?.data || { message: "Failed to send reset email" }
    }
  }, [])

  const resetPassword = useCallback(async (token, password) => {
    try {
      const response = await api.post("/auth/reset-password", { token, password })
      return response.data
    } catch (error) {
      console.error("Reset password error:", error)
      throw error.response?.data || { message: "Password reset failed" }
    }
  }, [])

  const updateProfile = useCallback(async (profileData) => {
    try {
      const response = await api.put("/users/profile", profileData)

      const updatedUser = response.data
      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUser(updatedUser)

      return updatedUser
    } catch (error) {
      console.error("Update profile error:", error)
      throw error.response?.data || { message: "Profile update failed" }
    }
  }, [])

  const value = {
    user,
    isLoading,
    register,
    verifyEmail,
    login,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile,
    setAuthStatus,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}
