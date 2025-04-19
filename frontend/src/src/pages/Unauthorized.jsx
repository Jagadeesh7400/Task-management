"use client"

import { Link } from "react-router-dom"
import { ArrowLeft, ShieldAlert } from "lucide-react"
import ZidioLogo from "../../components/ui/ZidioLogo"

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-color to-secondary-color dark:from-dark-color dark:to-primary-color p-4 animate-fade-in">
      <div className="w-full max-w-md animate-slide-up">
        <div className="glass dark:bg-dark-color dark:bg-opacity-80 rounded-lg shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex justify-center mb-8">
              <ZidioLogo className="h-12 w-12" />
            </div>

            <div className="text-center">
              <ShieldAlert className="h-16 w-16 text-danger-color mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-danger-color mb-4">Access Denied</h2>
              <p className="text-dark-color dark:text-light-color mb-6">
                You don't have permission to access this page. This area requires administrator privileges.
              </p>
              <Link
                to="/"
                className="inline-flex items-center text-primary-color dark:text-secondary-color hover:underline"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

