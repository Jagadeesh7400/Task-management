"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Save } from "lucide-react"
import { useAdmin } from "../../hooks/useAdmin"
import "../../styles/admin.css"

export default function UserEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getUser, updateUser } = useAdmin()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    occupation: "",
    location: "",
    bio: "",
  })

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true)
      try {
        const userData = await getUser(id)
        setFormData({
          name: userData.name || "",
          email: userData.email || "",
          role: userData.role || "user",
          occupation: userData.occupation || "",
          location: userData.location || "",
          bio: userData.bio || "",
        })
      } catch (error) {
        console.error("Error fetching user:", error)
        setError("Failed to load user data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [id, getUser])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsSaving(true)

    try {
      await updateUser(id, formData)
      setSuccess("User updated successfully")
      setTimeout(() => {
        navigate("/admin/users")
      }, 2000)
    } catch (err) {
      setError(err.message || "Failed to update user")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-color dark:border-secondary-color"></div>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate("/admin/users")}
          className="mr-4 p-2 glass rounded-full hover:bg-white hover:bg-opacity-10 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-dark-color dark:text-light-color" />
        </button>
        <h1 className="text-2xl font-bold text-primary-color dark:text-secondary-color">Edit User</h1>
      </div>

      <div className="glass dark:bg-dark-color dark:bg-opacity-50 rounded-lg shadow-lg border border-white border-opacity-20 p-6 animate-slide-up">
        {error && (
          <div className="mb-6 p-4 bg-danger-color bg-opacity-10 border border-danger-color border-opacity-20 text-danger-color rounded-lg animate-shake">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-success-color bg-opacity-10 border border-success-color border-opacity-20 text-success-color rounded-lg animate-slide-up">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-dark-color dark:text-light-color mb-1 group-hover:text-primary-color dark:group-hover:text-secondary-color transition-colors"
              >
                Full Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 glass dark:bg-dark-color dark:bg-opacity-50
                border border-white border-opacity-20 rounded-md 
                focus:outline-none focus:ring-2 focus:ring-primary-color dark:focus:ring-secondary-color
                text-dark-color dark:text-light-color transition-all"
              />
            </div>

            <div className="group">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-dark-color dark:text-light-color mb-1 group-hover:text-primary-color dark:group-hover:text-secondary-color transition-colors"
              >
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 glass dark:bg-dark-color dark:bg-opacity-50
                border border-white border-opacity-20 rounded-md 
                focus:outline-none focus:ring-2 focus:ring-primary-color dark:focus:ring-secondary-color
                text-dark-color dark:text-light-color transition-all"
              />
            </div>

            <div className="group">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-dark-color dark:text-light-color mb-1 group-hover:text-primary-color dark:group-hover:text-secondary-color transition-colors"
              >
                Role *
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 glass dark:bg-dark-color dark:bg-opacity-50
                border border-white border-opacity-20 rounded-md 
                focus:outline-none focus:ring-2 focus:ring-primary-color dark:focus:ring-secondary-color
                text-dark-color dark:text-light-color transition-all"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="group">
              <label
                htmlFor="occupation"
                className="block text-sm font-medium text-dark-color dark:text-light-color mb-1 group-hover:text-primary-color dark:group-hover:text-secondary-color transition-colors"
              >
                Occupation
              </label>
              <input
                id="occupation"
                name="occupation"
                type="text"
                value={formData.occupation}
                onChange={handleChange}
                className="w-full px-3 py-2 glass dark:bg-dark-color dark:bg-opacity-50
                border border-white border-opacity-20 rounded-md 
                focus:outline-none focus:ring-2 focus:ring-primary-color dark:focus:ring-secondary-color
                text-dark-color dark:text-light-color transition-all"
              />
            </div>

            <div className="group">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-dark-color dark:text-light-color mb-1 group-hover:text-primary-color dark:group-hover:text-secondary-color transition-colors"
              >
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 glass dark:bg-dark-color dark:bg-opacity-50
                border border-white border-opacity-20 rounded-md 
                focus:outline-none focus:ring-2 focus:ring-primary-color dark:focus:ring-secondary-color
                text-dark-color dark:text-light-color transition-all"
              />
            </div>

            <div className="md:col-span-2 group">
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-dark-color dark:text-light-color mb-1 group-hover:text-primary-color dark:group-hover:text-secondary-color transition-colors"
              >
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-3 py-2 glass dark:bg-dark-color dark:bg-opacity-50
                border border-white border-opacity-20 rounded-md 
                focus:outline-none focus:ring-2 focus:ring-primary-color dark:focus:ring-secondary-color
                text-dark-color dark:text-light-color transition-all"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/admin/users")}
              className="px-4 py-2 glass border border-white border-opacity-20 rounded-md
              text-dark-color dark:text-light-color hover:bg-white hover:bg-opacity-10 transition-all"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center px-4 py-2 bg-primary-color text-white rounded-md hover:bg-secondary-color
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-color
              disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              {isSaving ? (
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
                  Saving...
                </span>
              ) : (
                <span className="flex items-center">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

