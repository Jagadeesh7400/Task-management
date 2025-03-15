"use client"

import { useState, useEffect } from "react"
import { CheckCircle } from "lucide-react" // Import CheckCircle for completion icon
import { Calendar, Clock, Edit, Trash, AlertTriangle, Flag } from "lucide-react"

export default function TaskCard({ task, onTaskComplete, className, style }) {
  const [timeLeft, setTimeLeft] = useState("")
  const [isNearDeadline, setIsNearDeadline] = useState(false)
  const [intervalId, setIntervalId] = useState(null)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const deadline = new Date(task.deadline)
      const difference = deadline - now

      if (difference <= 0) {
        // Past deadline
        setTimeLeft("Overdue")
        setIsNearDeadline(true)
        if (intervalId) {
          clearInterval(intervalId)
        }
        return
      }

      // Check if within 10 minutes of deadline
      if (difference <= 10 * 60 * 1000) {
        setIsNearDeadline(true)

        // Calculate minutes and seconds
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft(`${minutes}m ${seconds}s`)

        // If time is up, show completion modal
        if (difference <= 0 && task.status !== "completed") {
          onTaskComplete(task)
        }
      } else {
        // More than 10 minutes left
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))

        if (days > 0) {
          setTimeLeft(`${days}d ${hours}h`)
        } else if (hours > 0) {
          setTimeLeft(`${hours}h ${minutes}m`)
        } else {
          setTimeLeft(`${minutes}m`)
        }

        setIsNearDeadline(false)
      }
    }

    calculateTimeLeft()

    // Set up interval to update time left
    const id = setInterval(calculateTimeLeft, 1000)
    setIntervalId(id)

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [task, onTaskComplete, intervalId])

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const formatTime = (dateString) => {
    const options = { hour: "2-digit", minute: "2-digit" }
    return new Date(dateString).toLocaleTimeString(undefined, options)
  }

  // Get priority color
  const getPriorityColor = () => {
    switch (task.priority) {
      case "high":
        return "text-danger-color"
      case "medium":
        return "text-warning-color"
      case "low":
      default:
        return "text-info-color"
    }
  }

  return (
    <div className={`task-card ${className}`}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.status}</p> {/* Display current status */}
      <button onClick={handleComplete} className="complete-button">
        <CheckCircle /> {/* Icon for completion */}
        Mark as Complete
      </button>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.status}</p> {/* Display current status */}
      <button onClick={handleComplete} className="complete-button">
        <CheckCircle /> {/* Icon for completion */}
        Mark as Complete
      </button>
    <div
      className={`
      glass dark:bg-dark-color dark:bg-opacity-50 rounded-lg shadow-lg overflow-hidden
      border-l-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl
      ${
        task.status === "completed"
          ? "border-l-success-color"
          : isNearDeadline
            ? "border-l-danger-color animate-pulse"
            : task.priority === "high"
              ? "border-l-danger-color"
              : task.priority === "medium"
                ? "border-l-warning-color"
                : "border-l-info-color"
      }
      ${className || ""}
    `}
      style={style}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3
            className={`font-semibold text-dark-color dark:text-light-color ${task.status === "completed" ? "line-through opacity-70" : ""}`}
          >
            {task.title}
          </h3>
          <div className="flex space-x-2">
            <button className="text-dark-color dark:text-light-color opacity-60 hover:opacity-100 hover:text-primary-color dark:hover:text-secondary-color transition-colors">
              <Edit size={16} />
            </button>
            <button className="text-dark-color dark:text-light-color opacity-60 hover:opacity-100 hover:text-danger-color transition-colors">
              <Trash size={16} />
            </button>
          </div> {/* Closing div for task-card */}
    </div> {/* Closing div for the main container */}
        </div>

        <p
          className={`text-sm text-dark-color dark:text-light-color opacity-80 mb-3 ${task.status === "completed" ? "line-through opacity-50" : ""}`}
        >
          {task.description}
        </p>

        <div className="flex flex-wrap gap-y-2 gap-x-4">
          <div className="flex items-center text-xs text-dark-color dark:text-light-color opacity-60">
            <Calendar size={14} className="mr-1" />
            {formatDate(task.deadline)}
          </div>

          <div className="flex items-center text-xs text-dark-color dark:text-light-color opacity-60">
            <Clock size={14} className="mr-1" />
            {formatTime(task.deadline)}
          </div>

          {task.priority && (
            <div className={`flex items-center text-xs ${getPriorityColor()}`}>
              <Flag size={14} className="mr-1" />
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
            </div>
          )}
        </div>
      </div>

      <div
        className={`
        px-4 py-2 text-sm font-medium flex justify-between items-center
        ${
          task.status === "completed"
            ? "bg-success-color bg-opacity-10 text-success-color"
            : isNearDeadline
              ? "bg-danger-color bg-opacity-10 text-danger-color"
              : task.priority === "high"
                ? "bg-danger-color bg-opacity-10 text-danger-color"
                : task.priority === "medium"
                  ? "bg-warning-color bg-opacity-10 text-warning-color"
                  : "bg-info-color bg-opacity-10 text-info-color"
        }
      `}
      >
        <div className="flex items-center">
          {isNearDeadline && task.status !== "completed" ? (
            <AlertTriangle size={14} className="mr-1 animate-pulse" />
          ) : (
            <Clock size={14} className="mr-1" />
          )}
          {task.status === "completed" ? "Completed" : timeLeft}
        </div>

        {task.status !== "completed" && (
          <button
            onClick={() => onTaskComplete(task)}
            className="text-xs glass px-2 py-1 rounded border border-current 
            hover:bg-primary-color hover:text-white dark:hover:bg-secondary-color 
            dark:hover:text-dark-color transition-all hover:-translate-y-1"
          >
            Mark Complete
          </button>
        )}
      </div>
    </div>
  )
}
