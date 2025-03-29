"use client"

import { useState, useEffect } from "react"
import { Camera, Save, Twitter, Linkedin, Github, Facebook } from "lucide-react"
import "../styles/profile.css"

const Profile = () => {
  const [user, setUser] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    occupation: "",
    location: "",
    bio: "",
    socialLinks: {
      twitter: "",
      linkedin: "",
      github: "",
      facebook: "",
    },
  })

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        occupation: "Full Stack Developer",
        location: "New York, USA",
        bio: "Passionate developer with 5+ years of experience in web and mobile application development. Specialized in React, Node.js, and cloud technologies.",
        socialLinks: {
          twitter: "https://twitter.com/johndoe",
          linkedin: "https://linkedin.com/in/johndoe",
          github: "https://github.com/johndoe",
          facebook: "",
        },
        stats: {
          tasksCompleted: 45,
          tasksInProgress: 12,
          tasksPending: 8,
          completionRate: 78,
        },
      }

      setUser(userData)
      setFormData({
        name: userData.name,
        email: userData.email,
        occupation: userData.occupation || "",
        location: userData.location || "",
        bio: userData.bio || "",
        socialLinks: {
          twitter: userData.socialLinks?.twitter || "",
          linkedin: userData.socialLinks?.linkedin || "",
          github: userData.socialLinks?.github || "",
          facebook: userData.socialLinks?.facebook || "",
        },
      })
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Simulate API call
    setIsLoading(true)
    setTimeout(() => {
      setUser((prev) => ({
        ...prev,
        ...formData,
      }))
      setIsLoading(false)
      setIsEditing(false)
    }, 1000)
  }

  if (isLoading && !user) {
    return (
      <div className="loading-spinner-container">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return (
    <div className="profile-container">
      <div className="profile-header card-3d">
        <div className="profile-cover"></div>

        <div className="profile-avatar-container">
          <div className="profile-avatar">
            {user?.name?.charAt(0) || "U"}
            <button className="avatar-upload">
              <Camera size={16} />
            </button>
          </div>

          <div className="profile-info">
            <h1 className="profile-name">{user?.name}</h1>
            <p className="profile-role">{user?.occupation || "No occupation set"}</p>
          </div>
        </div>

        <div className="profile-actions">
          <button className="edit-profile-btn" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>
      </div>

      {isEditing ? (
        <div className="profile-edit card-3d">
          <form onSubmit={handleSubmit}>
            <div className="form-header">
              <h2>Edit Profile</h2>
            </div>

            <div className="form-body">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="occupation">Occupation</label>
                  <input
                    type="text"
                    id="occupation"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea id="bio" name="bio" rows="4" value={formData.bio} onChange={handleChange}></textarea>
              </div>

              <div className="form-section">
                <h3>Social Links</h3>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="twitter">Twitter</label>
                    <input
                      type="url"
                      id="twitter"
                      name="socialLinks.twitter"
                      value={formData.socialLinks.twitter}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="linkedin">LinkedIn</label>
                    <input
                      type="url"
                      id="linkedin"
                      name="socialLinks.linkedin"
                      value={formData.socialLinks.linkedin}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="github">GitHub</label>
                    <input
                      type="url"
                      id="github"
                      name="socialLinks.github"
                      value={formData.socialLinks.github}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="facebook">Facebook</label>
                    <input
                      type="url"
                      id="facebook"
                      name="socialLinks.facebook"
                      value={formData.socialLinks.facebook}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
              <button type="submit" className="btn-primary" disabled={isLoading}>
                {isLoading ? (
                  <span className="loading-spinner-small"></span>
                ) : (
                  <>
                    <Save size={16} />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <div className="profile-details card-3d">
            <div className="details-header">
              <h2>About</h2>
            </div>
            <div className="details-body">
              <p>{user?.bio || "No bio available"}</p>

              <div className="details-section">
                <h3>Contact Information</h3>
                <div className="contact-info">
                  <div className="contact-item">
                    <span className="contact-label">Email:</span>
                    <span className="contact-value">{user?.email}</span>
                  </div>
                  {user?.location && (
                    <div className="contact-item">
                      <span className="contact-label">Location:</span>
                      <span className="contact-value">{user.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {(user?.socialLinks?.twitter ||
                user?.socialLinks?.linkedin ||
                user?.socialLinks?.github ||
                user?.socialLinks?.facebook) && (
                <div className="details-section">
                  <h3>Social Links</h3>
                  <div className="social-links">
                    {user?.socialLinks?.twitter && (
                      <a
                        href={user.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link twitter"
                      >
                        <Twitter size={16} />
                        <span>Twitter</span>
                      </a>
                    )}

                    {user?.socialLinks?.linkedin && (
                      <a
                        href={user.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link linkedin"
                      >
                        <Linkedin size={16} />
                        <span>LinkedIn</span>
                      </a>
                    )}

                    {user?.socialLinks?.github && (
                      <a
                        href={user.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link github"
                      >
                        <Github size={16} />
                        <span>GitHub</span>
                      </a>
                    )}

                    {user?.socialLinks?.facebook && (
                      <a
                        href={user.socialLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link facebook"
                      >
                        <Facebook size={16} />
                        <span>Facebook</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="profile-stats card-3d">
            <div className="stats-header">
              <h2>Task Statistics</h2>
            </div>
            <div className="stats-body">
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">{user?.stats?.tasksCompleted || 0}</div>
                  <div className="stat-label">Completed</div>
                </div>

                <div className="stat-item">
                  <div className="stat-value">{user?.stats?.tasksInProgress || 0}</div>
                  <div className="stat-label">In Progress</div>
                </div>

                <div className="stat-item">
                  <div className="stat-value">{user?.stats?.tasksPending || 0}</div>
                  <div className="stat-label">Pending</div>
                </div>

                <div className="stat-item">
                  <div className="stat-value">{user?.stats?.completionRate || 0}%</div>
                  <div className="stat-label">Completion Rate</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Profile

