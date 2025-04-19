"use client"

import { useState, useEffect, useCallback } from "react"
import { Calendar, CheckCircle, Clock, Plus, XCircle, Filter, Search, Download } from "lucide-react"
import { useAuth } from "../hooks/useAuth"
import { useTasks } from "../hooks/useTasks"
import TaskCard from "../components/tasks/TaskCard"
import AddTaskModal from "../components/tasks/AddTaskModal"
import TaskCompletionModal from "../components/tasks/TaskCompletionModal"
import { exportTasksToCSV } from "../utils/exportUtils"
import "../../styles/admin.css"

export default function Dashboard() {
  const { user } = useAuth()
  const { tasks, isLoading, fetchTasks } = useTasks()
  const [showAddTaskModal, setShowAddTaskModal] = useState(false)
  const [taskToComplete, setTaskToComplete] = useState(null)
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0,
  })

  // Add these state variables for filtering and sorting
  const [filter, setFilter] = useState("all") // all, pending, completed, overdue
  const [sortBy, setSortBy] = useState("deadline") // deadline, priority, title
  const [sortOrder, setSortOrder] = useState("asc") // asc, desc
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  useEffect(() => {
    if (tasks) {
      const now = new Date()
      const completed = tasks.filter((task) => task.status === "completed").length
      const pending = tasks.filter((task) => task.status === "pending").length
      const overdue = tasks.filter((task) => {
        return task.status === "pending" && new Date(task.deadline) < now
      }).length

      setStats({
        total: tasks.length,
        completed,
        pending,
        overdue,
      })
    }
  }, [tasks])

  const handleTaskCompletion = (task, isCompleted) => {
    setTaskToComplete(null)
    // In a real app, this would update the task status in the backend
    console.log(`Task ${task.id} marked as ${isCompleted ? "completed" : "incomplete"}`)
    fetchTasks()
  }

  // Add this function to filter and sort tasks
  const getFilteredAndSortedTasks = useCallback(() => {
    if (!tasks) return []

    // Filter tasks
    let filteredTasks = [...tasks]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filteredTasks = filteredTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          (task.description && task.description.toLowerCase().includes(query)),
      )
    }

    // Apply status filter
    if (filter === "pending") {
      filteredTasks = filteredTasks.filter((task) => task.status === "pending")
    } else if (filter === "completed") {
      filteredTasks = filteredTasks.filter((task) => task.status === "completed")
    } else if (filter === "overdue") {
      const now = new Date()
      filteredTasks = filteredTasks.filter((task) => task.status === "pending" && new Date(task.deadline) < now)
    }

    // Sort tasks
    filteredTasks.sort((a, b) => {
      if (sortBy === "deadline") {
        return sortOrder === "asc"
          ? new Date(a.deadline) - new Date(b.deadline)
          : new Date(b.deadline) - new Date(a.deadline)
      } else if (sortBy === "priority") {
        const priorityValues = { high: 3, medium: 2, low: 1 }
        return sortOrder === "asc"
          ? priorityValues[a.priority || "low"] - priorityValues[b.priority || "low"]
          : priorityValues[b.priority || "low"] - priorityValues[a.priority || "low"]
      } else if (sortBy === "title") {
        return sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
      }
      return 0
    })

    return filteredTasks
  }, [tasks, filter, sortBy, sortOrder, searchQuery])

  const filteredAndSortedTasks = getFilteredAndSortedTasks()

  const handleSearch = (e) => {
    e.preventDefault()
    // The search is already applied in getFilteredAndSortedTasks
  }

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary-color dark:text-secondary-color">
            Welcome back, {user?.name || "User"}
          </h1>
          <p className="text-dark-color dark:text-light-color opacity-80">Here's an overview of your tasks</p>
        </div>

        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <button
            onClick={() => setShowAddTaskModal(true)}
            className="flex items-center px-4 py-2 bg-primary-color text-white rounded-lg 
            hover:bg-secondary-color transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
          >
            <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform" />
            Add Task
          </button>

          <button
            onClick={() => exportTasksToCSV(filteredAndSortedTasks)}
            className="flex items-center px-4 py-2 glass border border-white border-opacity-20 rounded-lg
            text-dark-color dark:text-light-color hover:bg-white hover:bg-opacity-10 transition-all group"
            disabled={filteredAndSortedTasks.length === 0}
          >
            <Download className="mr-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div
          className="glass dark:bg-dark-color dark:bg-opacity-50 rounded-lg shadow-lg p-4 border border-white border-opacity-20 animate-slide-up cursor-pointer hover:-translate-y-1 transition-transform"
          style={{ animationDelay: "0.1s" }}
          onClick={() => setFilter("all")}
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-color bg-opacity-10 text-primary-color dark:text-secondary-color mr-4">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-dark-color dark:text-light-color opacity-80">Total Tasks</p>
              <p className="text-xl font-semibold text-primary-color dark:text-secondary-color">{stats.total}</p>
            </div>
          </div>
        </div>

        <div
          className="glass dark:bg-dark-color dark:bg-opacity-50 rounded-lg shadow-lg p-4 border border-white border-opacity-20 animate-slide-up cursor-pointer hover:-translate-y-1 transition-transform"
          style={{ animationDelay: "0.2s" }}
          onClick={() => setFilter("completed")}
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-success-color bg-opacity-10 text-success-color mr-4">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-dark-color dark:text-light-color opacity-80">Completed</p>
              <p className="text-xl font-semibold text-success-color">{stats.completed}</p>
            </div>
          </div>
        </div>

        <div
          className="glass dark:bg-dark-color dark:bg-opacity-50 rounded-lg shadow-lg p-4 border border-white border-opacity-20 animate-slide-up cursor-pointer hover:-translate-y-1 transition-transform"
          style={{ animationDelay: "0.3s" }}
          onClick={() => setFilter("pending")}
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-warning-color bg-opacity-10 text-warning-color mr-4">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-dark-color dark:text-light-color opacity-80">Pending</p>
              <p className="text-xl font-semibold text-warning-color">{stats.pending}</p>
            </div>
          </div>
        </div>

        <div
          className="glass dark:bg-dark-color dark:bg-opacity-50 rounded-lg shadow-lg p-4 border border-white border-opacity-20 animate-slide-up cursor-pointer hover:-translate-y-1 transition-transform"
          style={{ animationDelay: "0.4s" }}
          onClick={() => setFilter("overdue")}
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-danger-color bg-opacity-10 text-danger-color mr-4">
              <XCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-dark-color dark:text-light-color opacity-80">Overdue</p>
              <p className="text-xl font-semibold text-danger-color">{stats.overdue}</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="glass dark:bg-dark-color dark:bg-opacity-50 rounded-lg shadow-lg border border-white border-opacity-20 p-4 md:p-6 animate-slide-up"
        style={{ animationDelay: "0.5s" }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-xl font-semibold text-primary-color dark:text-secondary-color">
            {filter === "all"
              ? "All Tasks"
              : filter === "pending"
                ? "Pending Tasks"
                : filter === "completed"
                  ? "Completed Tasks"
                  : "Overdue Tasks"}
          </h2>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <form onSubmit={handleSearch} className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search tasks..."
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

            <div className="glass dark:bg-dark-color dark:bg-opacity-50 rounded-lg p-2 flex items-center gap-2">
              <Filter className="h-4 w-4 text-dark-color dark:text-light-color opacity-60" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm glass dark:bg-dark-color dark:bg-opacity-50 border border-white border-opacity-20 rounded px-2 py-1 text-dark-color dark:text-light-color"
              >
                <option value="deadline">Deadline</option>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>

              <button
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="text-sm glass dark:bg-dark-color dark:bg-opacity-50 border border-white border-opacity-20 rounded px-2 py-1 text-dark-color dark:text-light-color"
              >
                {sortOrder === "asc" ? "↑" : "↓"}
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-color dark:border-secondary-color"></div>
          </div>
        ) : filteredAndSortedTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAndSortedTasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                onTaskComplete={setTaskToComplete}
                className="animate-slide-up"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-dark-color dark:text-light-color opacity-80">
              {searchQuery
                ? "No tasks found matching your search."
                : filter !== "all"
                  ? `No ${filter} tasks found.`
                  : "No tasks found. Create your first task!"}
            </p>
            <button
              onClick={() => setShowAddTaskModal(true)}
              className="mt-4 inline-flex items-center px-4 py-2 bg-primary-color text-white rounded-lg 
              hover:bg-secondary-color transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
            >
              <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform" />
              Add Task
            </button>
          </div>
        )}
      </div>

      {showAddTaskModal && (
        <AddTaskModal
          isOpen={showAddTaskModal}
          onClose={() => setShowAddTaskModal(false)}
          onTaskAdded={() => {
            setShowAddTaskModal(false)
            fetchTasks()
          }}
        />
      )}

      {taskToComplete && (
        <TaskCompletionModal
          isOpen={!!taskToComplete}
          onClose={() => setTaskToComplete(null)}
          task={taskToComplete}
          onComplete={handleTaskCompletion}
        />
      )}
    </div>
  )
}

