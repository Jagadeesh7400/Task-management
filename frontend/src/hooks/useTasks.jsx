"use client"

import { useState, useCallback, createContext, useContext } from "react"
import { useAuth } from "./useAuth"
import { api, checkApiAvailability } from "../services/api"

const TasksContext = createContext(null)

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()

  const fetchTasks = useCallback(async () => {
    if (!user) return

    setIsLoading(true)
    try {
      const response = await api.get("/tasks")
      const userTasks = user.role === "admin" ? response.data : response.data.filter((task) => task.userId === user.id)
      setTasks(userTasks)
    } catch (error) {
      console.error("Fetch tasks error:", error)
    } finally {
      setIsLoading(false)
    }
  }, [user])

  const addTask = useCallback(async (taskData) => {
    if (!user) return

    try {
      const response = await api.post("/tasks", taskData)
      const newTask = response.data
      setTasks((prevTasks) => [...prevTasks, newTask])
      return newTask
    } catch (error) {
      console.error("Add task error:", error)
      throw error
    }
  }, [user])

  const updateTask = useCallback(async (taskId, taskData) => {
    try {
      await api.put(`/tasks/${taskId}`, taskData)
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? { ...task, ...taskData } : task)),
      )
      return { _id: taskId, ...taskData }
    } catch (error) {
      console.error("Update task error:", error)
      throw error
    }
  }, [])

  const deleteTask = useCallback(async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`)
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId))
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
