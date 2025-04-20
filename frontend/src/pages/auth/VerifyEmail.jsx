
"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react"
import ZidioLogo from "@/components/ui/ZidioLogo"
import { useAuth } from "@/hooks/useAuth"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import "@/styles/auth.css"

export default function VerifyEmail() {
  const { token } = useParams()
  const navigate = useNavigate()
  const { verifyEmail } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const verify = async () => {
      setIsLoading(true)
      setError("") // Clear any previous errors

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
  }, [token, verifyEmail, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-color to-secondary-color dark:from-dark-color dark:to-primary-color p-4 animate-slide-up">
      <div className="w-full max-w-md">
        <Card className="bg-white dark:bg-dark-color dark:bg-opacity-80 rounded-lg shadow-xl overflow-hidden">
          <CardHeader className="flex flex-col items-center">
            <ZidioLogo className="h-12 w-12 mb-4" />
            <CardTitle className="text-2xl font-bold text-center text-primary-color dark:text-secondary-color mb-2">
              Email Verification
            </CardTitle>
          </CardHeader>

          <CardContent className="flex items-center justify-center p-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-color dark:border-secondary-color"></div>
                <p className="mt-4 text-dark-color dark:text-light-color">Verifying your email...</p>
              </div>
            ) : isSuccess ? (
              <div className="text-center py-6">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-16 w-16 text-success-color animate-bounce" style={{ animationDuration: "2s" }} />
                </div>
                <CardTitle className="text-xl font-semibold text-success-color mb-2">Email Verified Successfully!</CardTitle>
                <CardDescription className="text-dark-color dark:text-light-color mb-6">
                  Your email has been verified. You can now log in to your account.
                </CardDescription>
                <Button variant="outline" onClick={() => navigate("/login")}>
                  Go to Login
                </Button>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="flex justify-center mb-4">
                  <XCircle className="h-16 w-16 text-destructive animate-shake" />
                </div>
                <CardTitle className="text-xl font-semibold text-destructive mb-2">Verification Failed</CardTitle>
                <CardDescription className="text-dark-color dark:text-light-color mb-6">{error}</CardDescription>
                <Button variant="outline" onClick={() => navigate("/login")}>
                  Back to login
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
