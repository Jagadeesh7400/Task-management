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
    deadline: "",
    isImportant: false,
  })

  const { addTask } = useTasks()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Ensure deadline is properly formatted as an ISO string
      const deadline = new Date(task.deadline).toISOString();
      const newTaskData = { ...task, deadline };

      const newTask = await addTask(newTaskData)

      if (newTask) {
        onAddTask(newTask)
        onClose()
      } else {
        console.error("Failed to add task")
      }
    } catch (error) {
      console.error("Error adding task:", error)
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

          <div className="form-group">
            <label htmlFor="deadline">Deadline</label>
            <input
              type="datetime-local"
              id="deadline"
              name="deadline"
              value={task.deadline}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select id="priority" name="priority" value={task.priority} onChange={handleChange}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
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
