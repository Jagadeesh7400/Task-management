"use client"

import { useState, useCallback, createContext, useContext } from "react"
import { useAuth } from "./useAuth"
import { api, checkApiAvailability } from "../services/api"

const TasksContext = createContext(null)

// Mock tasks data
const mockTasks = [
  {
    id: "1",
    title: "Complete Project Proposal",
    description: "Finalize the project proposal for the client meeting",
    status: "pending",
    deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    priority: "high",
    userId: "2",
  },
  {
    id: "2",
    title: "Review Code Changes",
    description: "Review pull requests and merge approved changes",
    status: "completed",
    deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    priority: "medium",
    userId: "2",
  },
  {
    id: "3",
    title: "Team Meeting",
    description: "Weekly team sync to discuss project progress",
    status: "pending",
    deadline: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 minutes from now
    priority: "low",
    userId: "2",
  },
]

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()

  const fetchTasks = useCallback(async () => {
    const isApiAvailable = await checkApiAvailability()
    if (!isApiAvailable) {
      // Use mock tasks if API is unavailable
      setTasks(mockTasks.filter((task) => task.userId === user.id))
      setIsLoading(false)
      return
    }
    if (!user) return

    setIsLoading(true)

    try {
      // In a real app, this would make an API call
      const response = await api.get("/tasks")

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Filter tasks for the current user
      const userTasks = user.role === "admin" ? response.data : response.data.filter((task) => task.userId === user.id)

      setTasks(userTasks)
      return userTasks
    } catch (error) {
      console.error("Fetch tasks error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [user])

  const addTask = useCallback(
    async (taskData) => {
      if (!user) return

      try {
        // In a real app, this would make an API call
        const response = await api.post("/tasks", taskData)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const newTask = {
          id: Date.now().toString(),
          ...taskData,
          status: "pending",
          userId: user.id,
        }

        setTasks((prevTasks) => [...prevTasks, newTask])
        return newTask
      } catch (error) {
        console.error("Add task error:", error)
        throw error
      }
    },
    [user],
  )

  const updateTask = useCallback(async (taskId, taskData) => {
    try {
      // In a real app, this would make an API call
      const response = await api.put(`/tasks/${taskId}`, taskData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, ...taskData } : task)))

      return { id: taskId, ...taskData }
    } catch (error) {
      console.error("Update task error:", error)
      throw error
    }
  }, [])

  const deleteTask = useCallback(async (taskId) => {
    try {
      // In a real app, this would make an API call
      await api.delete(`/tasks/${taskId}`)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
      return true
    } catch (error) {
      console.error("Delete task error:", error)
      throw error
    }
  }, [])

  const value = {
    tasks,
    isLoading,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
  }

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
}

export const useTasks = () => {
  const context = useContext(TasksContext)

  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider")
  }

  return context
}
