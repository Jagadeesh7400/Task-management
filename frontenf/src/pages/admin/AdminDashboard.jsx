"use client"

import { useState, useEffect } from "react"
import { Users, CheckSquare, AlertTriangle, BarChart2 } from "lucide-react"
import "../../styles/admin.css"

const AdminDashboard = () => {
  const [stats, setStats] = useState(null)
  const [recentUsers, setRecentUsers] = useState([])
  const [recentTasks, setRecentTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("week")

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        totalUsers: 125,
        activeUsers: 87,
        totalTasks: 342,
        completedTasks: 198,
        pendingTasks: 144,
        overdueRate: 12,
        completionRate: 58,
      })

      setRecentUsers([
        { id: 1, name: "John Doe", email: "john@example.com", role: "user", lastActive: "2 hours ago" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: "admin", lastActive: "5 hours ago" },
        { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "user", lastActive: "1 day ago" },
        { id: 4, name: "Sarah Williams", email: "sarah@example.com", role: "user", lastActive: "2 days ago" },
      ])

      setRecentTasks([
        {
          id: 1,
          title: "Implement user authentication",
          status: "completed",
          assignee: "John Doe",
          deadline: "2024-04-20",
        },
        { id: 2, title: "Update website content", status: "pending", assignee: "Jane Smith", deadline: "2024-04-30" },
        { id: 3, title: "Design new logo", status: "in-progress", assignee: "Mike Johnson", deadline: "2024-05-10" },
        {
          id: 4,
          title: "Deploy marketing campaign",
          status: "pending",
          assignee: "Sarah Williams",
          deadline: "2024-05-05",
        },
      ])

      setIsLoading(false)
    }, 1000)
  }, [timeRange])

  if (isLoading) {
    return (
      <div className="loading-spinner-container">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>

        <div className="time-range-selector">
          <button
            className={`time-range-btn ${timeRange === "week" ? "active" : ""}`}
            onClick={() => setTimeRange("week")}
          >
            Week
          </button>
          <button
            className={`time-range-btn ${timeRange === "month" ? "active" : ""}`}
            onClick={() => setTimeRange("month")}
          >
            Month
          </button>
          <button
            className={`time-range-btn ${timeRange === "year" ? "active" : ""}`}
            onClick={() => setTimeRange("year")}
          >
            Year
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card card-3d">
          <div className="stat-icon users">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Users</h3>
            <div className="stat-value">{stats.totalUsers}</div>
            <div className="stat-comparison positive">
              <span>↑ 12%</span> from last {timeRange}
            </div>
          </div>
        </div>

        <div className="stat-card card-3d">
          <div className="stat-icon tasks">
            <CheckSquare size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Tasks</h3>
            <div className="stat-value">{stats.totalTasks}</div>
            <div className="stat-comparison positive">
              <span>↑ 8%</span> from last {timeRange}
            </div>
          </div>
        </div>

        <div className="stat-card card-3d">
          <div className="stat-icon completion">
            <BarChart2 size={24} />
          </div>
          <div className="stat-content">
            <h3>Completion Rate</h3>
            <div className="stat-value">{stats.completionRate}%</div>
            <div className="stat-comparison positive">
              <span>↑ 5%</span> from last {timeRange}
            </div>
          </div>
        </div>

        <div className="stat-card card-3d">
          <div className="stat-icon overdue">
            <AlertTriangle size={24} />
          </div>
          <div className="stat-content">
            <h3>Overdue Rate</h3>
            <div className="stat-value">{stats.overdueRate}%</div>
            <div className="stat-comparison negative">
              <span>↓ 3%</span> from last {timeRange}
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-charts">
        <div className="chart-container card-3d">
          <div className="chart-header">
            <h2>Task Completion</h2>
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-color completed"></span>
                <span>Completed</span>
              </div>
              <div className="legend-item">
                <span className="legend-color pending"></span>
                <span>Pending</span>
              </div>
            </div>
          </div>
          <div className="chart-content">
            <div className="completion-chart">
              {/* This would be replaced with a real chart library like Chart.js */}
              <div className="chart-placeholder">
                <div className="chart-bar" style={{ height: "60%", backgroundColor: "var(--status-completed)" }}></div>
                <div className="chart-bar" style={{ height: "75%", backgroundColor: "var(--status-completed)" }}></div>
                <div className="chart-bar" style={{ height: "45%", backgroundColor: "var(--status-completed)" }}></div>
                <div className="chart-bar" style={{ height: "80%", backgroundColor: "var(--status-completed)" }}></div>
                <div className="chart-bar" style={{ height: "65%", backgroundColor: "var(--status-completed)" }}></div>
                <div className="chart-bar" style={{ height: "50%", backgroundColor: "var(--status-completed)" }}></div>
                <div className="chart-bar" style={{ height: "70%", backgroundColor: "var(--status-completed)" }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="chart-container card-3d">
          <div className="chart-header">
            <h2>User Activity</h2>
          </div>
          <div className="chart-content">
            <div className="activity-chart">
              {/* This would be replaced with a real chart library like Chart.js */}
              <div className="chart-placeholder line-chart">
                <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="line-svg">
                  <path
                    d="M0,50 L10,45 L20,48 L30,40 L40,35 L50,30 L60,25 L70,30 L80,20 L90,15 L100,10"
                    stroke="var(--primary-blue)"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-tables">
        <div className="table-container card-3d">
          <div className="table-header">
            <h2>Recent Users</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Last Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar">{user.name.charAt(0)}</div>
                      <div>
                        <div className="user-name">{user.name}</div>
                        <div className="user-email">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`role-badge ${user.role}`}>{user.role}</span>
                  </td>
                  <td>{user.lastActive}</td>
                  <td>
                    <div className="table-actions">
                      <button className="action-btn edit">Edit</button>
                      <button className="action-btn delete">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-container card-3d">
          <div className="table-header">
            <h2>Recent Tasks</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Status</th>
                <th>Assignee</th>
                <th>Deadline</th>
              </tr>
            </thead>
            <tbody>
              {recentTasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>
                    <span className={`status-badge status-${task.status}`}>{task.status.replace("-", " ")}</span>
                  </td>
                  <td>{task.assignee}</td>
                  <td>{task.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

