"use client"

import { useState, useEffect } from "react"
import { Edit, Trash, Search, UserPlus, Filter, RefreshCw } from "lucide-react"
import { useAdmin } from "../../hooks/useAdmin"
import { Link } from "react-router-dom"
import "../../styles/admin.css"

export default function UserManagement() {
  const { getUsers, deleteUser } = useAdmin()
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [sortBy, setSortBy] = useState("createdAt")
  const [sortOrder, setSortOrder] = useState("desc")
  const [confirmDelete, setConfirmDelete] = useState(null)

  const fetchUsers = async () => {
    setIsLoading(true)
    try {
      const usersData = await getUsers({
        search: searchQuery,
        sort: `${sortBy}:${sortOrder}`,
      })
      setUsers(usersData)
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [sortBy, sortOrder])

  const handleSearch = (e) => {
    e.preventDefault()
    fetchUsers()
  }

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId)
      setUsers(users.filter((user) => user.id !== userId))
      setConfirmDelete(null)
    } catch (error) {
      console.error("Error deleting user:", error)
    }
  }

  const filteredUsers = users.filter((user) => {
    if (roleFilter === "all") return true
    return user.role === roleFilter
  })

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary-color dark:text-secondary-color">User Management</h1>
          <p className="text-dark-color dark:text-light-color opacity-80">Manage all users in the system</p>
        </div>

        <Link
          to="/admin/users/new"
          className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-primary-color text-white rounded-lg 
          hover:bg-secondary-color transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
        >
          <UserPlus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform" />
          Add User
        </Link>
      </div>

      <div className="glass dark:bg-dark-color dark:bg-opacity-50 rounded-lg shadow-lg border border-white border-opacity-20 p-4 md:p-6 animate-slide-up">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <form onSubmit={handleSearch} className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 pl-10 glass dark:bg-dark-color dark:bg-opacity-50
                border border-white border-opacity-20 rounded-md 
                focus:outline-none focus:ring-2 focus:ring-primary-color dark:focus:ring-secondary-color
                text-dark-color dark:text-light-color transition-all"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-dark-color dark:text-light-color opacity-60" />
            <button type="submit" className="hidden">
              Search
            </button>
          </form>

          <div className="flex flex-wrap gap-2">
            <div className="glass dark:bg-dark-color dark:bg-opacity-50 rounded-lg p-2 flex items-center gap-2">
              <Filter className="h-4 w-4 text-dark-color dark:text-light-color opacity-60" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="text-sm glass dark:bg-dark-color dark:bg-opacity-50 border border-white border-opacity-20 rounded px-2 py-1 text-dark-color dark:text-light-color"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            <div className="glass dark:bg-dark-color dark:bg-opacity-50 rounded-lg p-2 flex items-center gap-2">
              <span className="text-sm text-dark-color dark:text-light-color">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm glass dark:bg-dark-color dark:bg-opacity-50 border border-white border-opacity-20 rounded px-2 py-1 text-dark-color dark:text-light-color"
              >
                <option value="name">Name</option>
                <option value="email">Email</option>
                <option value="createdAt">Date Created</option>
                <option value="taskCount">Task Count</option>
              </select>

              <button
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="text-sm glass dark:bg-dark-color dark:bg-opacity-50 border border-white border-opacity-20 rounded px-2 py-1 text-dark-color dark:text-light-color"
              >
                {sortOrder === "asc" ? "↑" : "↓"}
              </button>
            </div>

            <button
              onClick={fetchUsers}
              className="glass dark:bg-dark-color dark:bg-opacity-50 rounded-lg p-2 text-dark-color dark:text-light-color hover:bg-white hover:bg-opacity-10 transition-colors"
              title="Refresh"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-color dark:border-secondary-color"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white divide-opacity-20">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-dark-color dark:text-light-color opacity-70 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-dark-color dark:text-light-color opacity-70 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-dark-color dark:text-light-color opacity-70 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-dark-color dark:text-light-color opacity-70 uppercase tracking-wider">
                    Tasks
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-dark-color dark:text-light-color opacity-70 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-dark-color dark:text-light-color opacity-70 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white divide-opacity-10">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-white hover:bg-opacity-5 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full glass flex items-center justify-center text-primary-color dark:text-secondary-color font-medium">
                            {user.name.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-dark-color dark:text-light-color">{user.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-dark-color dark:text-light-color opacity-80">
                        {user.email}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${
                            user.role === "admin"
                              ? "bg-primary-color bg-opacity-10 text-primary-color dark:text-secondary-color"
                              : "bg-info-color bg-opacity-10 text-info-color"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-dark-color dark:text-light-color opacity-80">
                        {user.taskCount || 0}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-dark-color dark:text-light-color opacity-80">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Link
                            to={`/admin/users/${user.id}/edit`}
                            className="text-primary-color dark:text-secondary-color hover:text-secondary-color dark:hover:text-primary-color transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => setConfirmDelete(user.id)}
                            className="text-danger-color hover:text-red-700 transition-colors"
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-dark-color dark:text-light-color opacity-60">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fade-in">
          <div className="glass dark:bg-dark-color dark:bg-opacity-90 rounded-lg shadow-xl w-full max-w-md animate-slide-up">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-danger-color mb-4">Confirm Deletion</h3>
              <p className="text-dark-color dark:text-light-color mb-6">
                Are you sure you want to delete this user? This action cannot be undone and will also delete all tasks
                associated with this user.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="px-4 py-2 glass border border-white border-opacity-20 rounded-md
                  text-dark-color dark:text-light-color hover:bg-white hover:bg-opacity-10 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteUser(confirmDelete)}
                  className="px-4 py-2 bg-danger-color text-white rounded-md hover:bg-red-700
                  transition-all hover:-translate-y-1"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
