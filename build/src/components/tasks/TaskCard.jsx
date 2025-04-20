import { Calendar, Clock, Edit, Trash, Flag } from "lucide-react"
import "@/styles/tasks.css"

const TaskCard = ({ task }) => {
  // Early return with error message if task is undefined
  if (!task) {
    return (
      <div className="task-card error">
        <p>Error: Task data is missing</p>
      </div>
    )
  }

  const getStatusClass = () => {
    return `status-${task.status || "pending"}`
  }

  const getPriorityClass = () => {
    return `priority-${task.priority || "medium"}`
  }

  const formatDate = (dateString) => {
    if (!dateString) return "No date"

    try {
      const options = { month: "short", day: "numeric" }
      return new Date(dateString).toLocaleDateString(undefined, options)
    } catch (error) {
      console.error("Date formatting error:", error)
      return "Invalid date"
    }
  }

  return (
    <div className={`task-card card-3d ${getStatusClass()} ${getPriorityClass()}`}>
      <div className="task-header">
        <h3 className="task-title">{task.title || "Untitled Task"}</h3>
        <div className="task-actions">
          <button className="task-action-btn">
            <Edit size={16} />
          </button>
          <button className="task-action-btn">
            <Trash size={16} />
          </button>
        </div>
      </div>

      <p className="task-description">{task.description || "No description provided"}</p>

      <div className="task-meta">
        <div className="task-dates">
          <div className="task-date">
            <Calendar size={14} />
            <span>{formatDate(task.startDate)}</span>
          </div>
          <div className="task-date">
            <Clock size={14} />
            <span>{formatDate(task.endDate)}</span>
          </div>
        </div>

        <div className="task-priority">
          <Flag size={14} />
          <span>{task.priority || "medium"}</span>
        </div>
      </div>

      <div className="task-footer">
        <div className="task-assignee">
          <div className="assignee-avatar">{task.assignee ? task.assignee.charAt(0) : "?"}</div>
          <span>{task.assignee || "Unassigned"}</span>
        </div>

        <div className={`task-status-badge ${getStatusClass()}`}>{(task.status || "pending").replace("-", " ")}</div>
      </div>
    </div>
  )
}

export default TaskCard
