"use client"

import { useCallback } from "react"
import { useAuth } from "./useAuth"

// Mock users data
const mockUsers = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@zidio.com",
    role: "admin",
    taskCount: 5,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
  },
  {
    id: "2",
    name: "Regular User",
    email: "user@zidio.com",
    role: "user",
    taskCount: 3,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
  },
  {
    id: "3",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    taskCount: 8,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
  },
  {
    id: "4",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    taskCount: 2,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  },
  {
    id: "5",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "user",
    taskCount: 0,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
]

// Mock tasks data
const mockTasks = [
  {
    id: "1",
    title: "Complete Project Proposal",
    description: "Finalize the project proposal for the client meeting",
    status: "pending",
    deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    userId: "2",
    user: { name: "Regular User" },
  },
  {
    id: "2",
    title: "Review Code Changes",
    description: "Review pull requests and merge approved changes",
    status: "completed",
    deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    userId: "2",
    user: { name: "Regular User" },
  },
  {
    id: "3",
    title: "Team Meeting",
    description: "Weekly team sync to discuss project progress",
    status: "pending",
    deadline: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 minutes from now
    userId: "2",
    user: { name: "Regular User" },
  },
  {
    id: "4",
    title: "Client Presentation",
    description: "Present the final project to the client",
    status: "pending",
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    userId: "3",
    user: { name: "John Doe" },
  },
  {
    id: "5",
    title: "Update Documentation",
    description: "Update project documentation with recent changes",
    status: "completed",
    deadline: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    userId: "3",
    user: { name: "John Doe" },
  },
]

export const useAdmin = () => {
  const { user } = useAuth()

  const getStats = useCallback(async () => {
    if (!user || user.role !== "admin") {
      throw new Error("Unauthorized")
    }

    try {
      // In a real app, this would make an API call
      // const response = await api.get('/admin/stats');

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Calculate mock stats
      const totalUsers = mockUsers.length
      const totalTasks = mockTasks.length
      const completedTasks = mockTasks.filter((task) => task.status === "completed").length
      const completionRate = Math.round((completedTasks / totalTasks) * 100)
      const activeUsers = mockUsers.filter((user) => user.taskCount > 0).length

      return {
        totalUsers,
        totalTasks,
        completedTasks,
        completionRate,
        activeUsers,
      }
    } catch (error) {
      console.error("Get admin stats error:", error)
      throw error
    }
  }, [user])

  const getUsers = useCallback(
    async (options = {}) => {
      if (!user || user.role !== "admin") {
        throw new Error("Unauthorized")
      }

      try {
        // In a real app, this would make an API call
        // const response = await api.get('/admin/users', { params: options });

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 600))

        let filteredUsers = [...mockUsers]

        // Apply sorting
        if (options.sort) {
          const [field, order] = options.sort.split(":")
          filteredUsers.sort((a, b) => {
            if (order === "desc") {
              return a[field] > b[field] ? -1 : 1
            } else {
              return a[field] > b[field] ? 1 : -1
            }
          })
        }

        // Apply limit
        if (options.limit) {
          filteredUsers = filteredUsers.slice(0, options.limit)
        }

        return filteredUsers
      } catch (error) {
        console.error("Get admin users error:", error)
        throw error
      }
    },
    [user],
  )

  const getTasks = useCallback(
    async (options = {}) => {
      if (!user || user.role !== "admin") {
        throw new Error("Unauthorized")
      }

      try {
        // In a real app, this would make an API call
        // const response = await api.get('/admin/tasks', { params: options });

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 600))

        let filteredTasks = [...mockTasks]

        // Apply sorting
        if (options.sort) {
          const [field, order] = options.sort.split(":")
          filteredTasks.sort((a, b) => {
            if (order === "desc") {
              return a[field] > b[field] ? -1 : 1
            } else {
              return a[field] > b[field] ? 1 : -1
            }
          })
        }

        // Apply limit
        if (options.limit) {
          filteredTasks = filteredTasks.slice(0, options.limit)
        }

        return filteredTasks
      } catch (error) {
        console.error("Get admin tasks error:", error)
        throw error
      }
    },
    [user],
  )

  const createUser = useCallback(
    async (userData) => {
      if (!user || user.role !== "admin") {
        throw new Error("Unauthorized")
      }

      try {
        // In a real app, this would make an API call
        // const response = await api.post('/admin/users', userData);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const newUser = {
          id: Date.now().toString(),
          ...userData,
          taskCount: 0,
          createdAt: new Date().toISOString(),
        }

        return newUser
      } catch (error) {
        console.error("Create user error:", error)
        throw error
      }
    },
    [user],
  )

  const updateUser = useCallback(
    async (userId, userData) => {
      if (!user || user.role !== "admin") {
        throw new Error("Unauthorized")
      }

      try {
        // In a real app, this would make an API call
        // const response = await api.put(`/admin/users/${userId}`, userData);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800))

        return { id: userId, ...userData }
      } catch (error) {
        console.error("Update user error:", error)
        throw error
      }
    },
    [user],
  )

  const deleteUser = useCallback(
    async (userId) => {
      if (!user || user.role !== "admin") {
        throw new Error("Unauthorized")
      }

      try {
        // In a real app, this would make an API call
        // await api.delete(`/admin/users/${userId}`);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800))

        return true
      } catch (error) {
        console.error("Delete user error:", error)
        throw error
      }
    },
    [user],
  )

  return {
    getStats,
    getUsers,
    getTasks,
    createUser,
    updateUser,
    deleteUser,
  }
}

