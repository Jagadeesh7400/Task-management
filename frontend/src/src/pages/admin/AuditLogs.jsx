"use client"

import { useState, useEffect } from "react"
import { useAdmin } from "../../hooks/useAdmin"
import { Download, Filter, RefreshCw, Search, User, FileText, Activity } from "lucide-react"
import { exportToCSV } from "../../utils/exportUtils"
import "../../styles/admin.css"

export default function AuditLogs() {
  const { getAuditLogs } = useAdmin()
  const [logs, setLogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
  })

  // Filter states
  const [userId, setUserId] = useState("")
  const [action, setAction] = useState("")
  const [resourceType, setResourceType] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const fetchLogs = async (page = 1) => {
    setIsLoading(true)
    try {
      const result = await getAuditLogs({
        userId,
        action,
        resourceType,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        page,
        limit: pagination.limit,
      })

      setLogs(result.logs)
      setPagination(result.pagination)
    } catch (error) {
      console.error("Error fetching audit logs:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  const handleFilter = (e) => {
    e.preventDefault()
    fetchLogs(1) // Reset to first page when filtering
  }

  const handleReset = () => {
    setUserId("")
    setAction("")
    setResourceType("")
    setStartDate("")
    setEndDate("")
    fetchLogs(1)
  }

  const handleExport = () => {
    const data = logs.map((log) => ({
      User: log.userId?.name || "Unknown",
      Action: log.action,
      Resource: log.resourceType,
      ResourceID: log.resourceId || "N/A",
      IP: log.ipAddress || "N/A",
      Timestamp: new Date(log.timestamp).toLocaleString(),
    }))

    exportToCSV(data, `audit-logs-${new Date().toISOString().split("T")[0]}`)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  const getActionColor = (action) => {
    switch (action) {
      case "login":
      case "logout":
        return "text-info-color"
      case "create":
        return "text-success-color"
      case "update":
        return "text-warning-color"
      case "delete":
        return "text-danger-color"
      default:
        return "text-dark-color dark:text-light-color"
    }
  }

  const getActionIcon = (action) => {
    switch (action) {
      case "login":
      case "logout":
        return <Activity className="h-4 w-4" />
      case "create":
      case "update":
      case "delete":
        return <FileText className="h-4 w-4" />
      case "view":
        return <Search className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary-color dark:text-secondary-color">Audit Logs</h1>
          <p className="text-dark-color dark:text-light-color opacity-80">Track all user activities in the system</p>
        </div>

        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <button
            onClick={handleExport}
            className="flex items-center px-4 py-2 glass border border-white border-opacity-20 rounded-lg
            text-dark-color dark:text-light-color hover:bg-white hover:bg-opacity-10 transition-all group"
            disabled={logs.length === 0}
          >
            <Download className="mr-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
            Export Logs
          </button>

          <button
            onClick={() => fetchLogs(pagination.page)}
            className="glass dark:bg-dark-color dark:bg-opacity-50 rounded-lg p-2 text-dark-color dark:text-light-color hover:bg-white hover:bg-opacity-10 transition-colors"
            title="Refresh"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="glass dark:bg-dark-color dark:bg-opacity-50 rounded-lg shadow-lg border border-white border-opacity-20 p-4 md:p-6 animate-slide-up">
        <form onSubmit={handleFilter} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          <div className="group">
            <label className="block text-sm font-medium text-dark-color dark:text-light-color mb-1 group-hover:text-primary-color dark:group-hover:text-secondary-color transition-colors">
              Action
            </label>
            <select
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className="w-full px-3 py-2 glass dark:bg-dark-color dark:bg-opacity-50
              border border-white border-opacity-20 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-primary-color dark:focus:ring-secondary-color
              text-dark-color dark:text-light-color transition-all"
            >
              <option value="">All Actions</option>
              <option value="login">Login</option>
              <option value="logout">Logout</option>
              <option value="create">Create</option>
              <option value="update">Update</option>
              <option value="delete">Delete</option>
              <option value="view">View</option>
            </select>
          </div>

          <div className="group">
            <label className="block text-sm font-medium text-dark-color dark:text-light-color mb-1 group-hover:text-primary-color dark:group-hover:text-secondary-color transition-colors">
              Resource Type
            </label>
            <select
              value={resourceType}
              onChange={(e) => setResourceType(e.target.value)}
              className="w-full px-3 py-2 glass dark:bg-dark-color dark:bg-opacity-50
              border border-white border-opacity-20 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-primary-color dark:focus:ring-secondary-color
              text-dark-color dark:text-light-color transition-all"
            >
              <option value="">All Resources</option>
              <option value="user">User</option>
              <option value="task">Task</option>
              <option value="setting">Setting</option>
            </select>
          </div>

          <div className="group">
            <label className="block text-sm font-medium text-dark-color dark:text-light-color mb-1 group-hover:text-primary-color dark:group-hover:text-secondary-color transition-colors">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 glass dark:bg-dark-color dark:bg-opacity-50
              border border-white border-opacity-20 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-primary-color dark:focus:ring-secondary-color
              text-dark-color dark:text-light-color transition-all"
            />
          </div>

          <div className="group">
            <label className="block text-sm font-medium text-dark-color dark:text-light-color mb-1 group-hover:text-primary-color dark:group-hover:text-secondary-color transition-colors">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 glass dark:bg-dark-color dark:bg-opacity-50
              border border-white border-opacity-20 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-primary-color dark:focus:ring-secondary-color
              text-dark-color dark:text-light-color transition-all"
            />
          </div>

          <div className="flex items-end gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-primary-color text-white rounded-md hover:bg-secondary-color
              transition-all hover:-translate-y-1 flex-1"
            >
              <Filter className="h-4 w-4 inline mr-2" />
              Filter
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 glass border border-white border-opacity-20 rounded-md
              text-dark-color dark:text-light-color hover:bg-white hover:bg-opacity-10 transition-all"
            >
              Reset
            </button>
          </div>
        </form>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-color dark:border-secondary-color"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white divide-opacity-20">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-dark-color dark:text-light-color opacity-70 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-dark-color dark:text-light-color opacity-70 uppercase tracking-wider">
                      Action
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-dark-color dark:text-light-color opacity-70 uppercase tracking-wider">
                      Resource
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-dark-color dark:text-light-color opacity-70 uppercase tracking-wider">
                      IP Address
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-dark-color dark:text-light-color opacity-70 uppercase tracking-wider">
                      Timestamp
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white divide-opacity-10">
                  {logs.length > 0 ? (
                    logs.map((log) => (
                      <tr key={log._id} className="hover:bg-white hover:bg-opacity-5 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full glass flex items-center justify-center text-primary-color dark:text-secondary-color font-medium">
                              {log.userId?.name?.charAt(0) || <User size={16} />}
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-dark-color dark:text-light-color">
                                {log.userId?.name || "Unknown"}
                              </p>
                              <p className="text-xs text-dark-color dark:text-light-color opacity-60">
                                {log.userId?.email || ""}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`flex items-center ${getActionColor(log.action)}`}>
                            {getActionIcon(log.action)}
                            <span className="ml-1 capitalize">{log.action}</span>
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div>
                            <p className="text-sm text-dark-color dark:text-light-color capitalize">
                              {log.resourceType}
                            </p>
                            {log.resourceId && (
                              <p className="text-xs text-dark-color dark:text-light-color opacity-60">
                                ID: {log.resourceId}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-dark-color dark:text-light-color opacity-80">
                          {log.ipAddress || "N/A"}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-dark-color dark:text-light-color opacity-80">
                          {formatDate(log.timestamp)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-8 text-center text-dark-color dark:text-light-color opacity-60"
                      >
                        No audit logs found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex justify-between items-center mt-6">
                <div className="text-sm text-dark-color dark:text-light-color opacity-80">
                  Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                  {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} entries
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => fetchLogs(Math.max(1, pagination.page - 1))}
                    disabled={pagination.page === 1}
                    className="px-3 py-1 glass rounded-md text-dark-color dark:text-light-color
                    hover:bg-white hover:bg-opacity-10 transition-colors
                    disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                    // Show pages around current page
                    let pageNum = pagination.page - 2 + i
                    if (pageNum < 1) pageNum += 5
                    if (pageNum > pagination.pages) pageNum -= 5
                    if (pageNum < 1 || pageNum > pagination.pages) return null

                    return (
                      <button
                        key={pageNum}
                        onClick={() => fetchLogs(pageNum)}
                        className={`w-8 h-8 rounded-md flex items-center justify-center
                        ${
                          pagination.page === pageNum
                            ? "bg-primary-color text-white"
                            : "glass text-dark-color dark:text-light-color hover:bg-white hover:bg-opacity-10"
                        } transition-colors`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}

                  <button
                    onClick={() => fetchLogs(Math.min(pagination.pages, pagination.page + 1))}
                    disabled={pagination.page === pagination.pages}
                    className="px-3 py-1 glass rounded-md text-dark-color dark:text-light-color
                    hover:bg-white hover:bg-opacity-10 transition-colors
                    disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

