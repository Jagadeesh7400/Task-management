"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Send } from "lucide-react"
import ZidioLogo from "@/components/ui/ZidioLogo"
import { useAuth } from "@/hooks/useAuth"
import "@/styles/auth.css"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const { forgotPassword } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await forgotPassword(email)
      setSuccess(true)
    } catch (err) {
      setError(err.message || "Failed to send reset email. Please try again.")
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

            <h2 className="text-2xl font-bold text-center text-0077b6 dark:text-48cae4 mb-2">Forgot Password</h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
              Enter your email and we'll send you a link to reset your password
            </p>

            {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

            {success ? (
              <div className="text-center">
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                  Password reset link has been sent to your email.
                </div>
                <Link to="/login" className="inline-flex items-center text-0077b6 dark:text-48cae4 hover:underline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to login
                </Link>
              </div>
            ) : (
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
                    className="w-full px-3 py-2 border border-ade8f4 dark:border-023e8a rounded-md 
                      focus:outline-none focus:ring-2 focus:ring-0077b6 dark:focus:ring-48cae4
                      bg-white dark:bg-03045e text-0077b6 dark:text-white"
                    placeholder="your@email.com"
                  />
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
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send className="mr-2 h-4 w-4" />
                      Send Reset Link
                    </span>
                  )}
                </button>

                <div className="text-center">
                  <Link to="/login" className="inline-flex items-center text-0077b6 dark:text-48cae4 hover:underline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to login
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
