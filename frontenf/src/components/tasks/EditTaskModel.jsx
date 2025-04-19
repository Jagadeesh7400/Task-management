"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { useTasks } from "../../hooks/useTasks"
import "../../styles/tasks.css"

export default function EditTaskModal({ isOpen, onClose, task, onTaskUpdated }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [priority, setPriority] = useState("low")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const { updateTask } = useTasks()

  useEffect(() => {
    if (task) {
      setTitle(task.title || "")
      setDescription(task.description || "")

      // Format date and time from deadline
      const deadline = new Date(task.deadline)
      setDate(deadline.toISOString().split("T")[0])
      setTime(deadline.toTimeString().slice(0, 5))

      setPriority(task.priority || "low")
    }
  }, [task])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!title || !date || !time) {
      setError("Please fill in all required fields")
      return
    }

    const deadline = new Date(`${date}T${time}`)

    if (isNaN(deadline.getTime())) {
      setError("Invalid date or time")
      return
    }

    setIsLoading(true)

    try {
      await updateTask(task.id, {
        title,
        description,
        deadline: deadline.toISOString(),
        priority,
      })

      onTaskUpdated()
    } catch (err) {
      setError(err.message || "Failed to update task. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen || !task) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fade-in">
      <div className="glass dark:bg-dark-color dark:bg-opacity-90 rounded-lg shadow-xl w-full max-w-md animate-slide-up">
        <div className="flex justify-between items-center p-4 border-b border-white border-opacity-20">
          <h2 className="text-lg font-semibold text-primary-color dark:text-secondary-color">Edit Task</h2>
          <button
            onClick={onClose}
            className="text-dark-color dark:text-light-color opacity-60 hover:opacity-100 hover:text-danger-color transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          {error && (
            <div className="mb-4 p-3 bg-danger-color bg-opacity-10 border border-danger-color border-opacity-20 text-danger-color rounded animate-shake">
              {error}
            </div>
          )}

          <div className="mb-4 group">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-dark-color dark:text-light-color mb-1 group-hover:text-primary-color dark:group-hover:text-secondary-color transition-colors"
            >
              Title *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 glass dark:bg-dark-color dark:bg-opacity-50
              border border-white border-opacity-20 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-primary-color dark:focus:ring-secondary-color
              text-dark-color dark:text-light-color transition-all"
              placeholder="Task title"
              required
            />
          </div>

          <div className="mb-4 group">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-dark-color dark:text-light-color mb-1 group-hover:text-primary-color dark:group-hover:text-secondary-color transition-colors"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 glass dark:bg-dark-color dark:bg-opacity-50
              border border-white border-opacity-20 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-primary-color dark:focus:ring-secondary-color
              text-dark-color dark:text-light-color transition-all"
              placeholder="Task description"
            />
          </div>

          <div className="mb-4 group">
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-dark-color dark:text-light-color mb-1 group-hover:text-primary-color dark:group-hover:text-secondary-color transition-colors"
            >
              Priority
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-3 py-2 glass dark:bg-dark-color dark:bg-opacity-50
                border border-white border-opacity-20 rounded-md 
                focus:outline-none focus:ring-2 focus:ring-primary-color dark:focus:ring-secondary-color
                text-dark-color dark:text-light-color transition-all"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="group">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-dark-color dark:text-light-color mb-1 group-hover:text-primary-color dark:group-hover:text-secondary-color transition-colors"
              >
                Date *
              </label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 glass dark:bg-dark-color dark:bg-opacity-50
                border border-white border-opacity-20 rounded-md 
                focus:outline-none focus:ring-2 focus:ring-primary-color dark:focus:ring-secondary-color
                text-dark-color dark:text-light-color transition-all"
                required
              />
            </div>

            <div className="group">
              <label
                htmlFor="time"
                className="block text-sm font-medium text-dark-color dark:text-light-color mb-1 group-hover:text-primary-color dark:group-hover:text-secondary-color transition-colors"
              >
                Time *
              </label>
              <input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 glass dark:bg-dark-color dark:bg-opacity-50
                border border-white border-opacity-20 rounded-md 
                focus:outline-none focus:ring-2 focus:ring-primary-color dark:focus:ring-secondary-color
                text-dark-color dark:text-light-color transition-all"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 glass border border-white border-opacity-20 rounded-md
              text-dark-color dark:text-light-color hover:bg-white hover:bg-opacity-10 transition-all"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-primary-color text-white rounded-md hover:bg-secondary-color
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-color
              disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:-translate-y-1"
            >
              {isLoading ? "Updating..." : "Update Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

