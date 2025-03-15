"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, LogIn } from "lucide-react"
import ZidioLogo from "../../components/ui/ZidioLogo"
import { useAuth } from "../../hooks/useAuth"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await login(email, password)
      navigate("/")
    } catch (err) {
      setError(err.message || "Failed to login. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-caf0f8 to-0077b6 dark:from-023e8a dark:to-03045e p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-03045e rounded-lg shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex justify-center mb-8">
              <ZidioLogo className="h-12 w-12" />
            </div>

            <h2 className="text-2xl font-bold text-center text-0077b6 dark:text-48cae4 mb-6">Login to Zidio</h2>

            {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-0077b6 dark:text-48cae4 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"  // Correctly formatted autocomplete attribute
                  className="w-full px-3 py-2 border border-ade8f4 dark:border-023e8a rounded-md 
                    focus:outline-none focus:ring-2 focus:ring-0077b6 dark:focus:ring-48cae4
                    bg-white dark:bg-03045e text-0077b6 dark:text-white"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-0077b6 dark:text-48cae4 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"  // Correctly formatted autocomplete attribute
                    className="w-full px-3 py-2 border border-ade8f4 dark:border-023e8a rounded-md 
                      focus:outline-none focus:ring-2 focus:ring-0077b6 dark:focus:ring-48cae4
                      bg-white dark:bg-03045e text-0077b6 dark:text-white"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-0077b6 focus:ring-0077b6 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 dark:text-gray-300">
                    Remember me
                  </label>
                </div>

                <Link to="/forgot-password" className="text-sm text-0077b6 dark:text-48cae4 hover:underline">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md 
                  shadow-sm text-sm font-medium text-white bg-0077b6 hover:bg-023e8a 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-0077b6
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </span>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Don't have an account?{" "}
                <Link to="/register" className="text-0077b6 dark:text-48cae4 hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
