import axios from "axios"

// Create an axios instance
export const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  // Add timeout to prevent hanging requests
  timeout: 10000,
})

// Add a request interceptor to add the auth token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle network errors
    if (!error.response) {
      console.error("Network error: Please check your connection")
      // You could dispatch an action to show a network error notification
      return Promise.reject(new Error("Network error. Please check your connection."))
    }

    // Handle 401 Unauthorized errors (token expired or invalid)
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token")
      localStorage.removeItem("user")

      // Only redirect if we're not already on the login page
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login"
      }
    }

    return Promise.reject(error)
  },
)

// Add a helper function to check if the API is available
export const checkApiAvailability = async (baseURL = "http://localhost:5000/api/v1") => {
  try {
    await api.get("/health-check", { timeout: 5000 })
    return true
  } catch (error) {
    console.warn("API server might be unavailable:", error.message)
    return false
  }
}
