"use client"

import { useState, useEffect } from "react"
import { useTasks } from "../../hooks/useTasks"
import { Plus, Search } from "lucide-react"
import TaskCard from "./TaskCard"
import AddTaskModal from "./AddTaskModal"

export default function TaskBoard() {
  const { tasks, isLoading, fetchTasks } = useTasks()
  const [showAddTaskModal, setShowAddTaskModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredTasks, setFilteredTasks] = useState({
    pending: [],
    inProgress: [],
    completed: [],
    delivered: [],
  })

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  useEffect(() => {
    if (tasks) {
      // Filter and group tasks
      const filtered = {
        pending: tasks.filter(
          (task) =>
            task.status === "pending" &&
            (searchQuery === "" || task.title.toLowerCase().includes(searchQuery.toLowerCase())),
        ),
        inProgress: tasks.filter(
          (task) =>
            task.status === "in-progress" &&
            (searchQuery === "" || task.title.toLowerCase().includes(searchQuery.toLowerCase())),
        ),
        completed: tasks.filter(
          (task) =>
            task.status === "completed" &&
            (searchQuery === "" || task.title.toLowerCase().includes(searchQuery.toLowerCase())),
        ),
        delivered: tasks.filter(
          (task) =>
            task.status === "delivered" &&
            (searchQuery === "" || task.title.toLowerCase().includes(searchQuery.toLowerCase())),
        ),
      }
      setFilteredTasks(filtered)
    }
  }, [tasks, searchQuery])

  const handleSearch = (e) => {
    e.preventDefault()
    // Search is already applied in the useEffect
  }

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("taskId", taskId)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = async (e, status) => {
    e.preventDefault()
    const taskId = e.dataTransfer.getData("taskId")

    // Find the task
    const task = tasks.find((t) => t.id === taskId)
    if (task && task.status !== status) {
      try {
        // Update task status
        await updateTaskStatus(taskId, status)
        // Refresh tasks
        fetchTasks()
      } catch (error) {
        console.error("Error updating task status:", error)
      }
    }
  }

  const updateTaskStatus = async (taskId, status) => {
    // In a real app, this would call the API
    console.log(`Updating task ${taskId} to status: ${status}`)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  return (
    <div className="task-board animate-fade-in">

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary-color dark:text-secondary-color">Task Board</h1>
          <p className="text-dark-color dark:text-light-color opacity-80">Manage and organize your tasks</p>
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

          <form onSubmit={handleSearch} className="relative">
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
          </form>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-color dark:border-secondary-color"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 overflow-x-auto">
          {/* Pending Column */}
          <div
            className="glass dark:bg-dark-color dark:bg-opacity-50 rounded-lg shadow-lg border border-white border-opacity-20 p-4 min-h-[500px] flex flex-col"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "pending")}
          >
            <div className="column-header flex items-center justify-between mb-4">
              <h3 className="column-title font-semibold text-dark-color dark:text-light-color">Pending</h3>

              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-warning-color bg-opacity-20 text-warning-color text-xs">
                {filteredTasks.pending.length}
              </div>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto">
              {filteredTasks.pending.map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  className="cursor-grab active:cursor-grabbing"
                >
                  <TaskCard task={task} onTaskComplete={() => {}} />
                </div>
              ))}
              {filteredTasks.pending.length === 0 && (
                <div className="flex flex-col items-center justify-center h-32 text-dark-color dark:text-light-color opacity-50">
                  <p className="text-sm">No pending tasks</p>
                </div>
              )}
            </div>
          </div>

          {/* In Progress Column */}
          <div
            className="glass dark:bg-dark-color dark:bg-opacity-50 rounded-lg shadow-lg border border-white border-opacity-20 p-4 min-h-[500px] flex flex-col"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "in-progress")}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-dark-color dark:text-light-color">In Progress</h3>
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-info-color bg-opacity-20 text-info-color text-xs">
                {filteredTasks.inProgress.length}
              </div>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto">
              {filteredTasks.inProgress.map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  className="cursor-grab active:cursor-grabbing"
                >
                  <TaskCard task={task} onTaskComplete={() => {}} />
                </div>
              ))}
              {filteredTasks.inProgress.length === 0 && (
                <div className="flex flex-col items-center justify-center h-32 text-dark-color dark:text-light-color opacity-50">
                  <p className="text-sm">No tasks in progress</p>
                </div>
              )}
            </div>
          </div>

          {/* Completed Column */}
          <div
            className="glass dark:bg-dark-color dark:bg-opacity-50 rounded-lg shadow-lg border border-white border-opacity-20 p-4 min-h-[500px] flex flex-col"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "completed")}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-dark-color dark:text-light-color">Completed</h3>
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-success-color bg-opacity-20 text-success-color text-xs">
                {filteredTasks.completed.length}
              </div>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto">
              {filteredTasks.completed.map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  className="cursor-grab active:cursor-grabbing"
                >
                  <TaskCard task={task} onTaskComplete={() => {}} />
                </div>
              ))}
              {filteredTasks.completed.length === 0 && (
                <div className="flex flex-col items-center justify-center h-32 text-dark-color dark:text-light-color opacity-50">
                  <p className="text-sm">No completed tasks</p>
                </div>
              )}
            </div>
          </div>

          {/* Delivered Column */}
          <div
            className="glass dark:bg-dark-color dark:bg-opacity-50 rounded-lg shadow-lg border border-white border-opacity-20 p-4 min-h-[500px] flex flex-col"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "delivered")}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-dark-color dark:text-light-color">Delivered</h3>
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-color bg-opacity-20 text-primary-color text-xs">
                {filteredTasks.delivered.length}
              </div>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto">
              {filteredTasks.delivered.map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  className="cursor-grab active:cursor-grabbing"
                >
                  <TaskCard task={task} onTaskComplete={() => {}} />
                </div>
              ))}
              {filteredTasks.delivered.length === 0 && (
                <div className="flex flex-col items-center justify-center h-32 text-dark-color dark:text-light-color opacity-50">
                  <p className="text-sm">No delivered tasks</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
    </div>
  )
}
