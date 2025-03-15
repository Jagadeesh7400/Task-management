"use client"

import { useState } from "react"
import { Camera, Facebook, Github, Linkedin, Save, Twitter } from "lucide-react"
import { useAuth } from "../hooks/useAuth"

export default function Profile() {
  const { user, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState({
    name: user?.name || "",
    occupation: user?.occupation || "",
    location: user?.location || "",
    bio: user?.bio || "",
    socialLinks: {
      twitter: user?.socialLinks?.twitter || "",
      linkedin: user?.socialLinks?.linkedin || "",
      github: user?.socialLinks?.github || "",
      facebook: user?.socialLinks?.facebook || "",
    },
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      await updateProfile(formData)
      setSuccess("Profile updated successfully")
      setIsEditing(false)
    } catch (err) {
      setError(err.message || "Failed to update profile")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="profile-container max-w-4xl mx-auto">
      <div className="profile-card bg-white dark:bg-03045e bg-opacity-80 backdrop-blur-md rounded-lg shadow border border-ade8f4 dark:border-023e8a overflow-hidden">
        <div className="profile-header h-32 bg-gradient-to-r from-0077b6 to-00b4d8"></div>

        <div className="profile-content px-4 sm:px-6 lg:px-8 pb-6">
          <div className="profile-info flex flex-col sm:flex-row items-center sm:items-end -mt-16 sm:-mt-20 mb-6 sm:space-x-5">
            <div className="profile-photo relative">
              <div className="profile-photo-container w-32 h-32 rounded-full border-4 border-white dark:border-03045e bg-ade8f4 dark:bg-023e8a flex items-center justify-center text-0077b6 dark:text-48cae4 text-4xl font-bold overflow-hidden">
                {user?.profilePhoto ? (
                  <img
                    src={user.profilePhoto || "/placeholder.svg"}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  user?.name?.charAt(0) || "U"
                )}

                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-50 transition-opacity cursor-pointer group">
                  <Camera className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>

            <div className="profile-name mt-4 sm:mt-0 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-0077b6 dark:text-48cae4">{user?.name || "User Profile"}</h1>
              <p className="text-gray-600 dark:text-gray-300">
                {user?.occupation || "No occupation set"}
                {user?.location && ` • ${user.location}`}
              </p>
            </div>

            <div className="profile-edit-button mt-4 sm:mt-0 sm:ml-auto">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-0077b6 text-white rounded-md hover:bg-023e8a"
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>
          </div>

          {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

          {success && (
            <div className="success-message mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">{success}</div>
          )}

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-0077b6 dark:text-48cae4 mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-ade8f4 dark:border-023e8a rounded-md 
                      focus:outline-none focus:ring-2 focus:ring-0077b6 dark:focus:ring-48cae4
                      bg-white dark:bg-03045e text-0077b6 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="occupation" className="block text-sm font-medium text-0077b6 dark:text-48cae4 mb-1">
                    Occupation
                  </label>
                  <input
                    id="occupation"
                    name="occupation"
                    type="text"
                    value={formData.occupation}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-ade8f4 dark:border-023e8a rounded-md 
                      focus:outline-none focus:ring-2 focus:ring-0077b6 dark:focus:ring-48cae4
                      bg-white dark:bg-03045e text-0077b6 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-0077b6 dark:text-48cae4 mb-1">
                    Location
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-ade8f4 dark:border-023e8a rounded-md 
                      focus:outline-none focus:ring-2 focus:ring-0077b6 dark:focus:ring-48cae4
                      bg-white dark:bg-03045e text-0077b6 dark:text-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="bio" className="block text-sm font-medium text-0077b6 dark:text-48cae4 mb-1">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={3}
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-ade8f4 dark:border-023e8a rounded-md 
                      focus:outline-none focus:ring-2 focus:ring-0077b6 dark:focus:ring-48cae4
                      bg-white dark:bg-03045e text-0077b6 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-0077b6 dark:text-48cae4 mb-3">Social Links</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <Twitter className="h-5 w-5 text-[#1DA1F2] mr-2" />
                    <input
                      name="socialLinks.twitter"
                      type="text"
                      value={formData.socialLinks.twitter}
                      onChange={handleChange}
                      placeholder="Twitter URL"
                      className="w-full px-3 py-2 border border-ade8f4 dark:border-023e8a rounded-md 
                        focus:outline-none focus:ring-2 focus:ring-0077b6 dark:focus:ring-48cae4
                        bg-white dark:bg-03045e text-0077b6 dark:text-white"
                    />
                  </div>

                  <div className="flex items-center">
                    <Linkedin className="h-5 w-5 text-[#0A66C2] mr-2" />
                    <input
                      name="socialLinks.linkedin"
                      type="text"
                      value={formData.socialLinks.linkedin}
                      onChange={handleChange}
                      placeholder="LinkedIn URL"
                      className="w-full px-3 py-2 border border-ade8f4 dark:border-023e8a rounded-md 
                        focus:outline-none focus:ring-2 focus:ring-0077b6 dark:focus:ring-48cae4
                        bg-white dark:bg-03045e text-0077b6 dark:text-white"
                    />
                  </div>

                  <div className="flex items-center">
                    <Github className="h-5 w-5 text-gray-800 dark:text-white mr-2" />
                    <input
                      name="socialLinks.github"
                      type="text"
                      value={formData.socialLinks.github}
                      onChange={handleChange}
                      placeholder="GitHub URL"
                      className="w-full px-3 py-2 border border-ade8f4 dark:border-023e8a rounded-md 
                        focus:outline-none focus:ring-2 focus:ring-0077b6 dark:focus:ring-48cae4
                        bg-white dark:bg-03045e text-0077b6 dark:text-white"
                    />
                  </div>

                  <div className="flex items-center">
                    <Facebook className="h-5 w-5 text-[#1877F2] mr-2" />
                    <input
                      name="socialLinks.facebook"
                      type="text"
                      value={formData.socialLinks.facebook}
                      onChange={handleChange}
                      placeholder="Facebook URL"
                      className="w-full px-3 py-2 border border-ade8f4 dark:border-023e8a rounded-md 
                        focus:outline-none focus:ring-2 focus:ring-0077b6 dark:focus:ring-48cae4
                        bg-white dark:bg-03045e text-0077b6 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center px-4 py-2 bg-0077b6 text-white rounded-md hover:bg-023e8a
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
          ) : (
            <div className="profile-details space-y-6">
              <div>
                <h3 className="text-lg font-medium text-0077b6 dark:text-48cae4 mb-2">About</h3>
                <p className="text-gray-600 dark:text-gray-300">{user?.bio || "No bio available"}</p>
              </div>

              {(user?.socialLinks?.twitter ||
                user?.socialLinks?.linkedin ||
                user?.socialLinks?.github ||
                user?.socialLinks?.facebook) && (
                <div>
                  <h3 className="text-lg font-medium text-0077b6 dark:text-48cae4 mb-2">Social Links</h3>
                  <div className="flex flex-wrap gap-4">
                    {user?.socialLinks?.twitter && (
                      <a
                        href={user.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-[#1DA1F2] hover:underline"
                      >
                        <Twitter className="h-5 w-5 mr-1" />
                        Twitter
                      </a>
                    )}

                    {user?.socialLinks?.linkedin && (
                      <a
                        href={user.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-[#0A66C2] hover:underline"
                      >
                        <Linkedin className="h-5 w-5 mr-1" />
                        LinkedIn
                      </a>
                    )}

                    {user?.socialLinks?.github && (
                      <a
                        href={user.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-800 dark:text-white hover:underline"
                      >
                        <Github className="h-5 w-5 mr-1" />
                        GitHub
                      </a>
                    )}

                    {user?.socialLinks?.facebook && (
                      <a
                        href={user.socialLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-[#1877F2] hover:underline"
                      >
                        <Facebook className="h-5 w-5 mr-1" />
                        Facebook
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
