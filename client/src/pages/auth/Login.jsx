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
    <div className="auth-wrapper">
      <div className="auth-box">
        <div className="auth-card">
          <div className="auth-header">
            <ZidioLogo className="auth-logo" />
          </div>

          <h2 className="auth-title">Login to Zidio</h2>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div>
              <label htmlFor="email" className="auth-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="auth-input"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="auth-label">
                Password
              </label>
              <div className="auth-input-group">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="auth-input"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="auth-icon-btn"
                >
                  {showPassword ? <EyeOff className="auth-icon" /> : <Eye className="auth-icon" />}
                </button>
              </div>
            </div>

            <div className="auth-options">
              <div className="auth-remember">
                <input id="remember-me" type="checkbox" className="auth-checkbox" />
                <label htmlFor="remember-me" className="auth-label">
                  Remember me
                </label>
              </div>

              <Link to="/forgot-password" className="auth-link">
                Forgot password?
              </Link>
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
                    <circle className="auth-spinner-bg" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="auth-spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                <span className="auth-btn-text">
                  <LogIn className="auth-btn-icon" />
                  Login
                </span>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p className="auth-text">
              Don't have an account?{" "}
              <Link to="/register" className="auth-link">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
