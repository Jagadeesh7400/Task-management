"use client"

import { useState, useEffect } from "react"
import { Plus, Filter, List, LayoutGrid } from "lucide-react"
import TaskCard from "./TaskCard"
import AddTaskModal from "./AddTaskModal"
import ErrorBoundary from "../ErrorBoundary"
import "../../styles/tasks.css"

const TaskBoard = () => {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [viewMode, setViewMode] = useState("board") // 'board' or 'list'
  const [filter, setFilter] = useState("all")

  // Mock data for demonstration
  const mockTasks = [
    {
      id: "1",
      title: "Implement user authentication",
      description: "Add user authentication functionality to the website.",
      status: "completed",
      priority: "high",
      startDate: "2024-04-01",
      endDate: "2024-05-20",
      assignee: "John Doe",
    },
    {
      id: "2",
      title: "Update website content",
      description: "Update the About Us page with new team members.",
      status: "pending",
      priority: "medium",
      startDate: "2024-04-15",
      endDate: "2024-04-30",
      assignee: "Jane Smith",
    },
    {
      id: "3",
      title: "Design new logo",
      description: "Create a new logo for the company rebranding.",
      status: "in-progress",
      priority: "high",
      startDate: "2024-04-10",
      endDate: "2024-05-10",
      assignee: "Mike Johnson",
    },
    {
      id: "4",
      title: "Deploy marketing campaign",
      description: "Launch the new marketing campaign on social media.",
      status: "pending",
      priority: "medium",
      startDate: "2024-04-20",
      endDate: "2024-05-05",
      assignee: "Sarah Williams",
    },
    {
      id: "5",
      title: "Review project timelines",
      description: "Review and adjust project timelines based on new requirements.",
      status: "pending",
      priority: "low",
      startDate: "2024-04-25",
      endDate: "2024-05-01",
      assignee: "David Brown",
    },
    {
      id: "6",
      title: "Drop Database",
      description: "Drop Mongo Db Database",
      status: "pending",
      priority: "critical",
      startDate: "2024-04-28",
      endDate: "2024-05-05",
      assignee: "Alex Chen",
    },
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTasks(mockTasks)
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleAddTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now().toString() }])
  }

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)))
  }

  const getFilteredTasks = () => {
    if (filter === "all") return tasks
    return tasks.filter((task) => task.status === filter)
  }

  const getTasksByStatus = () => {
    return {
      pending: tasks.filter((task) => task.status === "pending"),
      "in-progress": tasks.filter((task) => task.status === "in-progress"),
      completed: tasks.filter((task) => task.status === "completed"),
      deferred: tasks.filter((task) => task.status === "deferred"),
    }
  }

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("taskId", taskId)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e, status) => {
    const taskId = e.dataTransfer.getData("taskId")
    handleStatusChange(taskId, status)
  }

  if (isLoading) {
    return (
      <div className="loading-spinner-container">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  const tasksByStatus = getTasksByStatus()
  const filteredTasks = getFilteredTasks()

  return (
    <div className="task-board-container">
      <div className="board-header">
        <h1>Task Board</h1>

        <div className="board-actions">
          <div className="view-toggle">
            <button
              className={`view-toggle-btn ${viewMode === "board" ? "active" : ""}`}
              onClick={() => setViewMode("board")}
            >
              <LayoutGrid size={18} />
              <span>Board</span>
            </button>
            <button
              className={`view-toggle-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <List size={18} />
              <span>List</span>
            </button>
          </div>

          <div className="filter-dropdown">
            <button className="filter-btn">
              <Filter size={18} />
              <span>Filter</span>
            </button>
            <div className="filter-menu">
              <button className={`filter-option ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>
                All Tasks
              </button>
              <button
                className={`filter-option ${filter === "pending" ? "active" : ""}`}
                onClick={() => setFilter("pending")}
              >
                Pending
              </button>
              <button
                className={`filter-option ${filter === "in-progress" ? "active" : ""}`}
                onClick={() => setFilter("in-progress")}
              >
                In Progress
              </button>
              <button
                className={`filter-option ${filter === "completed" ? "active" : ""}`}
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>
            </div>
          </div>

          <button className="add-task-btn" onClick={() => setShowAddModal(true)}>
            <Plus size={18} />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {viewMode === "board" ? (
        <div className="task-columns">
          <div className="task-column" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, "pending")}>
            <div className="column-header">
              <h2>Pending</h2>
              <span className="task-count">{tasksByStatus.pending.length}</span>
            </div>
            <div className="task-list">
              {tasksByStatus.pending.map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  className="task-card-wrapper"
                >
                  <ErrorBoundary>
                    <TaskCard task={task} />
                  </ErrorBoundary>
                </div>
              ))}
              {tasksByStatus.pending.length === 0 && (
                <div className="empty-column">
                  <p>No pending tasks</p>
                </div>
              )}
            </div>
          </div>

          <div className="task-column" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, "in-progress")}>
            <div className="column-header">
              <h2>In Progress</h2>
              <span className="task-count">{tasksByStatus["in-progress"].length}</span>
            </div>
            <div className="task-list">
              {tasksByStatus["in-progress"].map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  className="task-card-wrapper"
                >
                  <ErrorBoundary>
                    <TaskCard task={task} />
                  </ErrorBoundary>
                </div>
              ))}
              {tasksByStatus["in-progress"].length === 0 && (
                <div className="empty-column">
                  <p>No tasks in progress</p>
                </div>
              )}
            </div>
          </div>

          <div className="task-column" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, "completed")}>
            <div className="column-header">
              <h2>Completed</h2>
              <span className="task-count">{tasksByStatus.completed.length}</span>
            </div>
            <div className="task-list">
              {tasksByStatus.completed.map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  className="task-card-wrapper"
                >
                  <ErrorBoundary>
                    <TaskCard task={task} />
                  </ErrorBoundary>
                </div>
              ))}
              {tasksByStatus.completed.length === 0 && (
                <div className="empty-column">
                  <p>No completed tasks</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="task-table-container">
          <table className="task-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Assignee</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>
                    <span className={`status-badge status-${task.status}`}>{task.status.replace("-", " ")}</span>
                  </td>
                  <td>
                    <span className={`priority-badge priority-${task.priority}`}>{task.priority}</span>
                  </td>
                  <td>{task.startDate}</td>
                  <td>{task.endDate}</td>
                  <td>{task.assignee}</td>
                  <td className="task-actions">
                    <button className="action-btn edit">Edit</button>
                    <button className="action-btn delete">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showAddModal && <AddTaskModal onClose={() => setShowAddModal(false)} onAddTask={handleAddTask} />}
    </div>
  )
}

export default TaskBoard

