"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { useTasks } from "../../hooks/useTasks"
import "../../styles/tasks.css"

const AddTaskModal = ({ onClose, onAddTask }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    startDate: "",
    endDate: "",
    assignee: "",
  })

  const { addTask } = useTasks() // Using useTasks hook to access addTask

  const handleChange = (e) => {
    const { name, value } = e.target
    setTask((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Call the addTask function from the useTasks hook
      const newTask = await addTask(task)

      // If addTask was successful, call the onAddTask callback
      if (newTask) {
        onAddTask(newTask)
        onClose()
      } else {
        console.error("Failed to add task")
      }
    } catch (error) {
      console.error("Error adding task:", error)
      // Handle error as needed, maybe set an error state to display to the user
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container card-3d">
        <div className="modal-header">
          <h2>Add New Task</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" value={task.title} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={task.description}
              onChange={handleChange}
              rows="3"
            ></textarea>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select id="status" name="status" value={task.status} onChange={handleChange}>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="deferred">Deferred</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select id="priority" name="priority" value={task.priority} onChange={handleChange}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={task.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="endDate">End Date</label>
              <input type="date" id="endDate" name="endDate" value={task.endDate} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="assignee">Assignee</label>
            <input type="text" id="assignee" name="assignee" value={task.assignee} onChange={handleChange} required />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddTaskModal
