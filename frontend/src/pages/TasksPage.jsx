"use client"

import { useState, useEffect } from "react"
import { List, LayoutGrid } from "lucide-react"
import TaskBoard from "../components/tasks/TaskBoard"
import Dashboard from "./Dashboard"
import "../../styles/tasks.css"
import { useTasks } from "@/hooks/useTasks"

export default function TasksPage() {
  const [viewMode, setViewMode] = useState("board") // board, list
  const { tasks, isLoading, fetchTasks } = useTasks()

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  return (
    <div className="animate-fade-in">
      <div className="flex justify-end mb-4">
        <div className="glass dark:bg-dark-color dark:bg-opacity-50 rounded-lg p-1 flex">
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-md ${
              viewMode === "list"
                ? "bg-primary-color text-white"
                : "text-dark-color dark:text-light-color hover:bg-white hover:bg-opacity-10"
            }`}
            title="List View"
          >
            <List size={18} />
          </button>
          <button
            onClick={() => setViewMode("board")}
            className={`p-2 rounded-md ${
              viewMode === "board"
                ? "bg-primary-color text-white"
                : "text-dark-color dark:text-light-color hover:bg-white hover:bg-opacity-10"
            }`}
            title="Board View"
          >
            <LayoutGrid size={18} />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-color dark:border-secondary-color"></div>
        </div>
      ) : (
        <>
          {viewMode === "board" && <TaskBoard />}
          {viewMode === "list" && <Dashboard />}
        </>
      )}
    </div>
  )
}
