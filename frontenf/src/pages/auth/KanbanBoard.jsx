"use client"

import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Plus, Filter, Search, Clock } from "lucide-react"
import { useTasks } from "../hooks/useTasks"
import AddTaskModal from "../components/tasks/AddTaskModal"
import "../../styles/auth.css"

export default function KanbanBoard() {
  const { tasks, isLoading, fetchTasks, updateTask } = useTasks()
  const [columns, setColumns] = useState({
    pending: {
      id: "pending",
      title: "Pending",
      taskIds: [],
    },
    inProgress: {
      id: "inProgress",
      title: "In Progress",
      taskIds: [],
    },
    completed: {
      id: "completed",
      title: "Completed",
      taskIds: [],
    },
  })
  const [showAddTaskModal, setShowAddTaskModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("all") // all, high, medium, low
  const [filteredTasks, setFilteredTasks] = useState({})

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  useEffect(() => {
    if (tasks) {
      // Group tasks by status
      const pendingTasks = tasks.filter((task) => task.status === "pending")
      const inProgressTasks = tasks.filter((task) => task.status === "inProgress")
      const completedTasks = tasks.filter((task) => task.status === "completed")

      // Apply filters
      let filtered = [...tasks]

      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        filtered = filtered.filter(
          (task) =>
            task.title.toLowerCase().includes(query) ||
            (task.description && task.description.toLowerCase().includes(query)),
        )
      }

      if (priorityFilter !== "all") {
        filtered = filtered.filter((task) => task.priority === priorityFilter)
      }

      // Create a map of all tasks for quick lookup
      const taskMap = {}
      filtered.forEach((task) => {
        taskMap[task.id] = task
      })

      // Update columns with filtered tasks
      setColumns({
        pending: {
          ...columns.pending,
          taskIds: pendingTasks.filter((task) => filtered.some((t) => t.id === task.id)).map((task) => task.id),
        },
        inProgress: {
          ...columns.inProgress,
          taskIds: inProgressTasks.filter((task) => filtered.some((t) => t.id === task.id)).map((task) => task.id),
        },
        completed: {
          ...columns.completed,
          taskIds: completedTasks.filter((task) => filtered.some((t) => t.id === task.id)).map((task) => task.id),
        },
      })

      setFilteredTasks(taskMap)
    }
  }, [tasks, searchQuery, priorityFilter])

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result

    // If there's no destination or the item was dropped back to its original position
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return
    }

    // Get the task that was dragged
    const task = filteredTasks[draggableId]

    // If the task was moved to a different column, update its status
    if (destination.droppableId !== source.droppableId) {
      try {
        await updateTask(draggableId, {
          ...task,
          status: destination.droppableId,
        })

        // Refresh tasks after update
        fetchTasks()
      } catch (error) {
        console.error("Error updating task status:", error)
      }
      return
    }

    // If the task was reordered within the same column
    const column = columns[source.droppableId]
    const newTaskIds = Array.from(column.taskIds)

    // Remove the task from its old position
    newTaskIds.splice(source.index, 1)
    // Insert the task at its new position
    newTaskIds.splice(destination.index, 0, draggableId)

    // Update the column with the new task order
    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    }

    // Update the state with the new column
    setColumns({
      ...columns,
      [newColumn.id]: newColumn,
    })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    // Search is already applied in the useEffect
  }

  const getColumnBackgroundColor = (columnId) => {
    switch (columnId) {
      case "pending":
        return "from-blue-500/20 to-blue-600/20 dark:from-blue-900/30 dark:to-blue-800/30"
      case "inProgress":
        return "from-yellow-500/20 to-yellow-600/20 dark:from-yellow-900/30 dark:to-yellow-800/30"
      case "completed":
        return "from-green-500/20 to-green-600/20 dark:from-green-900/30 dark:to-green-800/30"
      default:
        return "from-gray-500/20 to-gray-600/20 dark:from-gray-900/30 dark:to-gray-800/30"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-danger-color"
      case "medium":
        return "bg-warning-color"
      case "low":
        return "bg-info-color"
      default:
        return "bg-gray-400"
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-color dark:border-secondary-color"></div>
      </div>
    )
  }

  return (
    <div className="kanban-board-container animate-fade-in">
      <div className="kanban-board-header flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="kanban-board-title text-2xl font-bold text-primary-color dark:text-secondary-color">Kanban Board</h1>
          <p className="text-dark-color dark:text-light-color opacity-80">Drag and drop tasks to update their status</p>
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
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
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
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="text-sm glass dark:bg-dark-color dark:bg-opacity-50 border border-white border-opacity-20 rounded px-2 py-1 text-dark-color dark:text-light-color"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.values(columns).map((column) => (
            <div key={column.id} className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div
                className={`glass dark:bg-dark-color dark:bg-opacity-50 rounded-lg shadow-lg border border-white border-opacity-20 overflow-hidden bg-gradient-to-br ${getColumnBackgroundColor(column.id)}`}
              >
                <div className="p-4 border-b border-white border-opacity-20">
                  <h2 className="text-lg font-semibold text-dark-color dark:text-light-color flex items-center">
                    {column.title}
                    <span className="ml-2 text-sm bg-white bg-opacity-20 px-2 py-0.5 rounded-full">
                      {column.taskIds.length}
                    </span>
                  </h2>
                </div>

                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`min-h-[500px] p-4 transition-colors ${
                        snapshot.isDraggingOver ? "bg-white bg-opacity-10" : ""
                      }`}
                    >
                      {column.taskIds.length > 0 ? (
                        column.taskIds.map((taskId, index) => {
                          const task = filteredTasks[taskId]
                          if (!task) return null

                          return (
                            <Draggable key={taskId} draggableId={taskId} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`glass dark:bg-dark-color dark:bg-opacity-70 rounded-lg p-4 mb-3 border-l-4 ${
                                    task.priority === "high"
                                      ? "border-danger-color"
                                      : task.priority === "medium"
                                        ? "border-warning-color"
                                        : "border-info-color"
                                  } ${
                                    snapshot.isDragging ? "shadow-lg" : ""
                                  } transition-all hover:-translate-y-1 hover:shadow-md`}
                                >
                                  <h3 className="font-medium text-dark-color dark:text-light-color mb-2">
                                    {task.title}
                                  </h3>
                                  {task.description && (
                                    <p className="text-sm text-dark-color dark:text-light-color opacity-80 mb-3 line-clamp-2">
                                      {task.description}
                                    </p>
                                  )}

                                  <div className="flex flex-wrap items-center justify-between text-xs">
                                    <div className="flex items-center text-dark-color dark:text-light-color opacity-60 mb-1">
                                      <Clock className="h-3 w-3 mr-1" />
                                      {formatDate(task.deadline)}
                                    </div>

                                    {task.priority && (
                                      <div className="flex items-center mb-1">
                                        <div
                                          className={`h-2 w-2 rounded-full ${getPriorityColor(task.priority)} mr-1`}
                                        ></div>
                                        <span className="capitalize text-dark-color dark:text-light-color opacity-80">
                                          {task.priority}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          )
                        })
                      ) : (
                        <div className="flex flex-col items-center justify-center h-32 text-dark-color dark:text-light-color opacity-60">
                          <p>No tasks in this column</p>
                          {column.id === "pending" && (
                            <button
                              onClick={() => setShowAddTaskModal(true)}
                              className="mt-2 text-sm text-primary-color dark:text-secondary-color hover:underline"
                            >
                              + Add a task
                            </button>
                          )}
                        </div>
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          ))} 
        </div>
      </DragDropContext>

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
