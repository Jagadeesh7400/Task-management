"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Download, Plus } from "lucide-react"
import { useAuth } from "../../hooks/useAuth"
import AdminAnalytics from "../../components/admin/AdminAnalytics"

export default function AdminDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview") // overview, users, tasks

  return (
    <div className="admin-dashboard-container animate-fade-in">
      <div className="admin-dashboard-header flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="admin-dashboard-title text-2xl font-bold text-primary-color dark:text-secondary-color">Admin Dashboard</h1>
          <p className="admin-dashboard-welcome text-dark-color dark:text-light-color opacity-80">Welcome back, {user?.name || "Admin"}</p>
        </div>

        <div className="admin-dashboard-actions mt-4 md:mt-0 flex flex-wrap gap-2">
          <Link
            to="/admin/users/new"
            className="flex items-center px-4 py-2 bg-primary-color text-white rounded-lg 
            hover:bg-secondary-color transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
          >
            <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform" />
            Add User
          </Link>

          <button
            className="flex items-center px-4 py-2 glass border border-white border-opacity-20 rounded-lg
            text-dark-color dark:text-light-color hover:bg-white hover:bg-opacity-10 transition-all group"
          >
            <Download className="mr-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
            Export Report
          </button>
        </div>
      </div>

      {/* Dashboard Tabs */}
      <div className="admin-dashboard-tabs mb-6">
        <div className="flex border-b border-white border-opacity-20">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 text-sm font-medium glass ${
              activeTab === "overview"
                ? "text-primary-color dark:text-secondary-color border-b-2 border-primary-color dark:border-secondary-color"
                : "text-dark-color dark:text-light-color hover:text-primary-color dark:hover:text-secondary-color"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-4 py-2 text-sm font-medium glass ${
              activeTab === "users"
                ? "text-primary-color dark:text-secondary-color border-b-2 border-primary-color dark:border-secondary-color"
                : "text-dark-color dark:text-light-color hover:text-primary-color dark:hover:text-secondary-color"
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab="tasks"}
            className={`px-4 py-2 text-sm font-medium glass ${
              activeTab === "tasks"
                ? "text-primary-color dark:text-secondary-color border-b-2 border-primary-color dark:border-secondary-color"
                : "text-dark-color dark:text-light-color hover:text-primary-color dark:hover:text-secondary-color"
            }`}
          >
            Tasks
          </button>
        </div>
      </div>

      {/* Dashboard Content */}
      {activeTab === "overview" && <AdminAnalytics />}

      {activeTab === "users" && (
        <div className="glass dark:bg-dark-color dark:bg-opacity-50 rounded-lg shadow-lg border border-white border-opacity-20 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="admin-users-title text-lg font-semibold text-primary-color dark:text-secondary-color">Recent Users</h2>
            <Link to="/admin/users" className="text-sm text-primary-color dark:text-secondary-color hover:underline">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            {/* User table content */}
            <p className="admin-users-message text-center py-4 text-dark-color dark:text-light-color">
              Click on "Users" tab or "View All" to see detailed user management
            </p>
          </div>
        </div>
      )}

      {activeTab === "tasks" && (
        <div className="glass dark:bg-dark-color dark:bg-opacity-50 rounded-lg shadow-lg border border-white border-opacity-20 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="admin-tasks-title text-lg font-semibold text-primary-color dark:text-secondary-color">Recent Tasks</h2>
            <Link to="/admin/tasks" className="text-sm text-primary-color dark:text-secondary-color hover:underline">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            {/* Task table content */}
            <p className="admin-tasks-message text-center py-4 text-dark-color dark:text-light-color">
              Click on "Tasks" tab or "View All" to see detailed task management
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
