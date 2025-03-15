"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Send } from "lucide-react"
import ZidioLogo from "../../components/ui/ZidioLogo"
import { useAuth } from "../../hooks/useAuth"

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
    <div className="auth-wrapper">
      <div className="auth-box">
        <div className="auth-header">
          <ZidioLogo className="auth-logo" />
        </div>

        <h2 className="auth-title">Forgot Password</h2>
        <p className="auth-text">
          Enter your email and we'll send you a link to reset your password.
        </p>

        {error && <div className="auth-error">{error}</div>}

        {success ? (
          <div className="text-center">
            <div className="auth-success">
              Password reset link has been sent to your email.
            </div>
            <Link to="/login" className="auth-link">
              <ArrowLeft className="auth-btn-icon" />
              Back to login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-input-group">
              <label htmlFor="email" className="auth-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="auth-input"
                placeholder="your@email.com"
              />
            </div>

            <button type="submit" disabled={isLoading} className="auth-btn">
              {isLoading ? (
                <span className="auth-loading">
                  <svg
                    className="auth-spinner"
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
                <span className="auth-btn-text">
                  <Send className="auth-btn-icon" />
                  Send Reset Link
                </span>
              )}
            </button>

            <div className="text-center">
              <Link to="/login" className="auth-link">
                <ArrowLeft className="auth-btn-icon" />
                Back to login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
