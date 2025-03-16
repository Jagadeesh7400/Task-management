"use client"

import { useCallback } from "react"
import { useAuth } from "./useAuth"

// Mock data for task completion stats
const generateMockTaskCompletionData = (timeRange) => {
  let labels = []
  let data = []

  if (timeRange === "week") {
    labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  } else if (timeRange === "month") {
    labels = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`)
  } else {
    labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  }

  data = labels.map((name) => ({
    name,
    completed: Math.floor(Math.random() * 10) + 1,
    pending: Math.floor(Math.random() * 8) + 1,
  }))

  return data
}

// Mock data for task trend
const generateMockTaskTrendData = (timeRange) => {
  let labels = []
  let data = []

  if (timeRange === "week") {
    labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  } else if (timeRange === "month") {
    labels = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`)
  } else {
    labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  }

  data = labels.map((name) => ({
    name,
    created: Math.floor(Math.random() * 15) + 5,
    completed: Math.floor(Math.random() * 10) + 1,
  }))

  return data
}

// Mock data for tasks by priority
const generateMockTasksByPriority = () => {
  return [
    { name: "High", value: Math.floor(Math.random() * 30) + 10 },
    { name: "Medium", value: Math.floor(Math.random() * 50) + 20 },
    { name: "Low", value: Math.floor(Math.random() * 40) + 15 },
  ]
}

// Mock data for user performance
const generateMockUserPerformanceData = () => {
  return [
    { name: "John Doe", completed: 24, total: 30 },
    { name: "Jane Smith", completed: 18, total: 22 },
    { name: "Bob Johnson", completed: 15, total: 20 },
    { name: "Alice Brown", completed: 12, total: 15 },
    { name: "Charlie Davis", completed: 10, total: 12 },
  ]
}

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
      const totalUsers = 25
      const totalTasks = 120
      const completedTasks = 78
      const completionRate = Math.round((completedTasks / totalTasks) * 100)
      const activeUsers = 18

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

  const getUser = useCallback(
    async (userId) => {
      if (!user || user.role !== "admin") {
        throw new Error("Unauthorized")
      }

      try {
        // In a real app, this would make an API call
        // const response = await api.get(`/admin/users/${userId}`);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Mock user data
        const mockUsers = [
          {
            id: "1",
            name: "Admin User",
            email: "admin@zidio.com",
            role: "admin",
            occupation: "System Administrator",
            location: "New York, USA",
            bio: "Experienced system administrator with a passion for building efficient systems.",
            taskCount: 5,
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: "2",
            name: "Regular User",
            email: "user@zidio.com",
            role: "user",
            occupation: "Web Developer",
            location: "San Francisco, USA",
            bio: "Frontend developer specializing in React and modern JavaScript frameworks.",
            taskCount: 3,
            createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
          },
        ]

        const foundUser = mockUsers.find((u) => u.id === userId)

        if (!foundUser) {
          throw new Error("User not found")
        }

        return foundUser
      } catch (error) {
        console.error("Get user error:", error)
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

        // Mock tasks data
        const mockTasks = [
          {
            id: "1",
            title: "Complete Project Proposal",
            description: "Finalize the project proposal for the client meeting",
            status: "pending",
            priority: "high",
            deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
            userId: "2",
            user: { name: "Regular User" },
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: "2",
            title: "Review Code Changes",
            description: "Review pull requests and merge approved changes",
            status: "completed",
            priority: "medium",
            deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
            userId: "2",
            user: { name: "Regular User" },
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: "3",
            title: "Team Meeting",
            description: "Weekly team sync to discuss project progress",
            status: "pending",
            priority: "medium",
            deadline: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 minutes from now
            userId: "2",
            user: { name: "Regular User" },
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: "4",
            title: "Client Presentation",
            description: "Present the final project to the client",
            status: "pending",
            priority: "high",
            deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
            userId: "3",
            user: { name: "John Doe" },
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: "5",
            title: "Update Documentation",
            description: "Update project documentation with recent changes",
            status: "completed",
            priority: "low",
            deadline: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
            userId: "3",
            user: { name: "John Doe" },
            createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
          },
        ]

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

  const getTaskCompletionStats = useCallback(
    async (timeRange = "week") => {
      if (!user || user.role !== "admin") {
        throw new Error("Unauthorized")
      }

      try {
        // In a real app, this would make an API call
        // const response = await api.get('/admin/stats/task-completion', { params: { timeRange } });

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 700))

        return {
          taskCompletion: generateMockTaskCompletionData(timeRange),
          taskTrend: generateMockTaskTrendData(timeRange),
          tasksByPriority: generateMockTasksByPriority(),
        }
      } catch (error) {
        console.error("Get task completion stats error:", error)
        throw error
      }
    },
    [user],
  )

  const getUserPerformance = useCallback(
    async (timeRange = "week") => {
      if (!user || user.role !== "admin") {
        throw new Error("Unauthorized")
      }

      try {
        // In a real app, this would make an API call
        // const response = await api.get('/admin/stats/user-performance', { params: { timeRange } });

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 700))

        return {
          topUsers: generateMockUserPerformanceData(),
        }
      } catch (error) {
        console.error("Get user performance error:", error)
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

  const getAuditLogs = useCallback(
    async (options = {}) => {
      if (!user || user.role !== "admin") {
        throw new Error("Unauthorized")
      }

      try {
        // In a real app, this would make an API call
        // const response = await api.get('/admin/audit-logs', { params: options });

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Generate mock audit logs
        const mockLogs = Array.from({ length: 20 }, (_, i) => {
          const actions = ["login", "logout", "create", "update", "delete", "view"]
          const resourceTypes = ["user", "task", "setting"]
          const users = [
            { id: "1", name: "Admin User", email: "admin@zidio.com" },
            { id: "2", name: "Regular User", email: "user@zidio.com" },
            { id: "3", name: "John Doe", email: "john@example.com" },
          ]

          const action = actions[Math.floor(Math.random() * actions.length)]
          const resourceType = resourceTypes[Math.floor(Math.random() * resourceTypes.length)]
          const userId = users[Math.floor(Math.random() * users.length)]

          return {
            _id: `log_${i + 1}`,
            userId,
            action,
            resourceType,
            resourceId: `${resourceType}_${Math.floor(Math.random() * 100) + 1}`,
            ipAddress: `192.168.1.${Math.floor(Math.random() * 255) + 1}`,
            timestamp: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
          }
        })

        // Apply filters
        let filteredLogs = [...mockLogs]

        if (options.userId) {
          filteredLogs = filteredLogs.filter((log) => log.userId.id === options.userId)
        }

        if (options.action) {
          filteredLogs = filteredLogs.filter((log) => log.action === options.action)
        }

        if (options.resourceType) {
          filteredLogs = filteredLogs.filter((log) => log.resourceType === options.resourceType)
        }

        if (options.startDate) {
          filteredLogs = filteredLogs.filter((log) => new Date(log.timestamp) >= new Date(options.startDate))
        }

        if (options.endDate) {
          filteredLogs = filteredLogs.filter((log) => new Date(log.timestamp) <= new Date(options.endDate))
        }

        // Sort by timestamp (newest first)
        filteredLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

        // Pagination
        const page = options.page || 1
        const limit = options.limit || 10
        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const paginatedLogs = filteredLogs.slice(startIndex, endIndex)

        return {
          logs: paginatedLogs,
          pagination: {
            total: filteredLogs.length,
            page,
            limit,
            pages: Math.ceil(filteredLogs.length / limit),
          },
        }
      } catch (error) {
        console.error("Get audit logs error:", error)
        throw error
      }
    },
    [user],
  )

  return {
    getStats,
    getUsers,
    getUser,
    getTasks,
    getTaskCompletionStats,
    getUserPerformance,
    createUser,
    updateUser,
    deleteUser,
    getAuditLogs,
  }
}

