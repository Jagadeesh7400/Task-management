"use client"

import { useState } from "react"
import { List, LayoutGrid } from "lucide-react"
import TaskBoard from "../components/tasks/TaskBoard"
import Dashboard from "./Dashboard" // Reuse the existing Dashboard for list view
import "../../styles/tasks.css"

export default function TasksPage() {
  const [viewMode, setViewMode] = useState("board") // board, list

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

      {viewMode === "board" ? <TaskBoard /> : <Dashboard />}
    </div>
  )
}

