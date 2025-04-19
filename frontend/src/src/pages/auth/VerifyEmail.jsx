"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react"
import ZidioLogo from "../../../components/ui/ZidioLogo"
import { useAuth } from "../../hooks/useAuth"
import "../../styles/auth.css"

export default function VerifyEmail() {
  const { token } = useParams()
  const navigate = useNavigate()
  const { verifyEmail } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setError("Invalid verification link")
        setIsLoading(false)
        return
      }

      try {
        await verifyEmail(token)
        setIsSuccess(true)
      } catch (err) {
        setError(err.message || "Verification failed. The link may be invalid or expired.")
      } finally {
        setIsLoading(false)
      }
    }

    verify()
  }, [token, verifyEmail])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-color to-secondary-color dark:from-dark-color dark:to-primary-color p-4 animate-fade-in">
      <div className="w-full max-w-md animate-slide-up">
        <div className="glass dark:bg-dark-color dark:bg-opacity-80 rounded-lg shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex justify-center mb-8">
              <ZidioLogo className="h-12 w-12" />
            </div>

            <h2 className="text-2xl font-bold text-center text-primary-color dark:text-secondary-color mb-6">
              Email Verification
            </h2>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-color dark:border-secondary-color"></div>
                <p className="mt-4 text-dark-color dark:text-light-color">Verifying your email...</p>
              </div>
            ) : isSuccess ? (
              <div className="text-center py-6">
                <div className="flex justify-center mb-4">
                  <CheckCircle
                    className="h-16 w-16 text-success-color animate-bounce"
                    style={{ animationDuration: "2s" }}
                  />
                </div>
                <h3 className="text-xl font-semibold text-success-color mb-2">Email Verified Successfully!</h3>
                <p className="text-dark-color dark:text-light-color mb-6">
                  Your email has been verified. You can now log in to your account.
                </p>
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 bg-primary-color text-white rounded-lg 
                  hover:bg-secondary-color transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  Go to Login
                </Link>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="flex justify-center mb-4">
                  <XCircle className="h-16 w-16 text-danger-color animate-shake" />
                </div>
                <h3 className="text-xl font-semibold text-danger-color mb-2">Verification Failed</h3>
                <p className="text-dark-color dark:text-light-color mb-6">{error}</p>
                <Link
                  to="/login"
                  className="inline-flex items-center text-primary-color dark:text-secondary-color hover:underline"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

