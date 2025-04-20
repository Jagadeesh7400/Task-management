"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, Send } from "lucide-react"
import ZidioLogo from "@/components/ui/ZidioLogo"
import { useAuth } from "@/hooks/useAuth"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import "@/styles/auth.css"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const navigate = useNavigate()
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-color to-secondary-color dark:from-dark-color dark:to-primary-color p-4">
      <div className="w-full max-w-md">
        <Card className="bg-white dark:bg-dark-color dark:bg-opacity-80 rounded-lg shadow-xl overflow-hidden">
          <CardHeader className="flex flex-col items-center">
            <ZidioLogo className="h-12 w-12 mb-4" />
            <CardTitle className="text-2xl font-bold text-center text-primary-color dark:text-secondary-color">Forgot Password</CardTitle>
            <CardDescription className="text-center text-gray-600 dark:text-gray-300 mb-6">
              Enter your email and we'll send you a link to reset your password
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 sm:p-8">
            {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

            {success ? (
              <div className="text-center">
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                  Password reset link has been sent to your email.
                </div>
                <Link to="/login" className="inline-flex items-center text-primary-color dark:text-secondary-color hover:underline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to login
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full"
                    placeholder="your@email.com"
                  />
                </div>

                <Button
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
                </Button>

                <div className="text-center">
                  <Link to="/login" className="inline-flex items-center text-primary-color dark:text-secondary-color hover:underline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to login
                  </Link>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
