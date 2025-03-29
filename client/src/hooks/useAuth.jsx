"use client"

import { useState, useEffect, useCallback, createContext, useContext } from "react"
import { api } from "../services/api"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const isApiAvailable = await checkApiAvailability();
      if (!isApiAvailable) {
        // Use stored user data if API is unavailable
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
        return;
      }
      try {
        const token = localStorage.getItem("token")

        if (token) {
          try {
            // First try to get the user from localStorage as a fallback
            const storedUser = localStorage.getItem("user")
            if (storedUser) {
              setUser(JSON.parse(storedUser))
            }

            // Then validate with the backend
            const response = await api.get("/auth/validate-token");
            if (response.data && response.data.user) {
              setUser(response.data.user)
            }
          } catch (error) {
            console.warn("Token validation failed:", error.message)
            // If it's a 404 error, the endpoint might not exist yet
            if (error.response && error.response.status === 404) {
              console.info("Token validation endpoint not found. Using stored user data instead.")
              // Keep the user logged in if we have local data
              const storedUser = localStorage.getItem("user")
              if (!storedUser) {
                localStorage.removeItem("token")
              }
            } else {
              // For other errors, clear the auth data
              localStorage.removeItem("token")
              localStorage.removeItem("user")
              setUser(null)
            }
          }
        }
      } catch (error) {
        console.error("Authentication error:", error)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser(null)
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

      // If verification is successful, set the user and token
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))
      setUser(response.data.user)

      return response.data
    } catch (error) {
      console.error("Email verification error:", error)
      throw error.response?.data || { message: "Verification failed" }
    }
  }, [])

  const login = useCallback(async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password })

      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))
      setUser(response.data.user)

      return response.data.user
    } catch (error) {
      console.error("Login error:", error)
      throw error.response?.data || { message: "Login failed" }
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      // In a real app, this would make an API call
      await api.post("/auth/logout")

      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setUser(null)
    } catch (error) {
      console.error("Logout error:", error)
      // Still remove local storage items even if API call fails
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setUser(null)
    }
  }, [])

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
