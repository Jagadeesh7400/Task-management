"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { BarChart, Download, PieChart, Plus, Users } from "lucide-react"
import { useAuth } from "../../hooks/useAuth"
import { useAdmin } from "../../hooks/useAdmin"
import { exportToCSV } from "../../utils/exportUtils"; // Import the export function

export default function AdminDashboard() {
  const { user } = useAuth()
  const { getStats, getUsers, getTasks } = useAdmin()
  const [stats, setStats] = useState(null)
  const [recentUsers, setRecentUsers] = useState([])
  const [recentTasks, setRecentTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const statsData = await getStats()
        const usersData = await getUsers({ limit: 5, sort: "createdAt:desc" })
        const tasksData = await getTasks({ limit: 5, sort: "createdAt:desc" })

        setStats(statsData)
        setRecentUsers(usersData)
        setRecentTasks(tasksData)
      } catch (error) {
        console.error("Error fetching admin data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [getStats, getUsers, getTasks])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-0077b6 dark:border-48cae4"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-0077b6 dark:text-48cae4">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">Welcome back, {user?.name || "Admin"}</p>
        </div>

        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <Link
            to="/admin/users/new"
            className="flex items-center px-4 py-2 bg-0077b6 text-white rounded-lg hover:bg-023e8a transition-colors"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Link>

          <button
            onClick={() => exportTasksToCSV(recentTasks)} // Integrate export functionality
            className="flex items-center px-4 py-2 border border-ade8f4 dark:border-023e8a rounded-lg
              text-0077b6 dark:text-48cae4 hover:bg-ade8f4 dark:hover:bg-023e8a transition-colors"
          >
            <Download className="mr-2 h-4 w-4" />
            Export Tasks
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-03045e bg-opacity-80 backdrop-blur-md rounded-lg shadow p-4 border border-ade8f4 dark:border-023e8a">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-023e8a text-0077b6 dark:text-48cae4 mr-4">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Total Users</p>
              <p className="text-xl font-semibold text-0077b6 dark:text-48cae4">{stats?.totalUsers || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-03045e bg-opacity-80 backdrop-blur-md rounded-lg shadow p-4 border border-ade8f4 dark:border-023e8a">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 dark:bg-023e8a text-green-600 dark:text-green-400 mr-4">
              <BarChart className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Total Tasks</p>
              <p className="text-xl font-semibold text-green-600 dark:text-green-400">{stats?.totalTasks || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-03045e bg-opacity-80 backdrop-blur-md rounded-lg shadow p-4 border border-ade8f4 dark:border-023e8a">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 dark:bg-023e8a text-yellow-600 dark:text-yellow-400 mr-4">
              <PieChart className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Completion Rate</p>
              <p className="text-xl font-semibold text-yellow-600 dark:text-yellow-400">
                {stats?.completionRate ? `${stats.completionRate}%` : "0%"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-03045e bg-opacity-80 backdrop-blur-md rounded-lg shadow p-4 border border-ade8f4 dark:border-023e8a">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 dark:bg-023e8a text-purple-600 dark:text-purple-400 mr-4">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Active Users</p>
              <p className="text-xl font-semibold text-purple-600 dark:text-purple-400">{stats?.activeUsers || 0}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-03045e bg-opacity-80 backdrop-blur-md rounded-lg shadow border border-ade8f4 dark:border-023e8a p-4 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-0077b6 dark:text-48cae4">Recent Users</h2>
            <Link to="/admin/users" className="text-sm text-0077b6 dark:text-48cae4 hover:underline">
              View All
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-ade8f4 dark:divide-023e8a">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Tasks
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ade8f4 dark:divide-023e8a">
                {recentUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-ade8f4 dark:bg-023e8a flex items-center justify-center text-0077b6 dark:text-48cae4 font-medium">
                          {user.name.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-0077b6 dark:text-48cae4">{user.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {user.email}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          user.role === "admin"
                            ? "bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400"
                            : "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {user.taskCount || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white dark:bg-03045e bg-opacity-80 backdrop-blur-md rounded-lg shadow border border-ade8f4 dark:border-023e8a p-4 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-0077b6 dark:text-48cae4">Recent Tasks</h2>
            <Link to="/admin/tasks" className="text-sm text-0077b6 dark:text-48cae4 hover:underline">
              View All
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-ade8f4 dark:divide-023e8a">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Task
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Deadline
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ade8f4 dark:divide-023e8a">
                {recentTasks.map((task) => (
                  <tr key={task.id}>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <p className="text-sm font-medium text-0077b6 dark:text-48cae4">{task.title}</p>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-ade8f4 dark:bg-023e8a flex items-center justify-center text-0077b6 dark:text-48cae4 text-xs font-medium">
                          {task.user?.name?.charAt(0) || "U"}
                        </div>
                        <div className="ml-2">
                          <p className="text-sm text-gray-600 dark:text-gray-300">{task.user?.name || "Unknown"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {new Date(task.deadline).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          task.status === "completed"
                            ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400"
                            : "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
