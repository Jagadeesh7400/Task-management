"use client"

import { useState, useEffect } from "react"
import { Activity, Users, CheckSquare, Clock, Calendar } from "lucide-react"
import { useAdmin } from "../../hooks/useAdmin"
import "../../styles/admin.css"

export default function AdminAnalytics() {
  const { getStats } = useAdmin()
  const [stats, setStats] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("week") // week, month, year

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true)
      try {
        const statsData = await getStats()
        setStats(statsData)
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [getStats, timeRange])

  // Mock data for charts
  const taskCompletionData = [
    { name: "Mon", completed: 5, pending: 3 },
    { name: "Tue", completed: 7, pending: 4 },
    { name: "Wed", completed: 4, pending: 6 },
    { name: "Thu", completed: 8, pending: 2 },
    { name: "Fri", completed: 6, pending: 3 },
    { name: "Sat", completed: 3, pending: 1 },
    { name: "Sun", completed: 2, pending: 2 },
  ]

  const userActivityData = [
    { name: "Mon", tasks: 8 },
    { name: "Tue", tasks: 11 },
    { name: "Wed", tasks: 9 },
    { name: "Thu", tasks: 12 },
    { name: "Fri", tasks: 10 },
    { name: "Sat", tasks: 5 },
    { name: "Sun", tasks: 4 },
  ]

  const taskDistributionData = [
    { name: "Completed", value: 45, color: "#48CAE4" },
    { name: "Pending", value: 30, color: "#FFB703" },
    { name: "Overdue", value: 15, color: "#E63946" },
    { name: "In Progress", value: 10, color: "#8338EC" },
  ]

  const topPerformersData = [
    { name: "John Doe", tasks: 24, completion: 92 },
    { name: "Jane Smith", tasks: 18, completion: 88 },
    { name: "Alex Johnson", tasks: 15, completion: 95 },
    { name: "Sarah Williams", tasks: 12, completion: 83 },
    { name: "Michael Brown", tasks: 10, completion: 90 },
  ]

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-color dark:border-secondary-color"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-end mb-4">
        <div className="glass dark:bg-dark-color dark:bg-opacity-50 rounded-lg p-1 flex">
          <button
            onClick={() => setTimeRange("week")}
            className={`px-3 py-1 rounded-md text-sm ${
              timeRange === "week"
                ? "bg-primary-color text-white"
                : "text-dark-color dark:text-light-color hover:bg-white hover:bg-opacity-10"
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeRange("month")}
            className={`px-3 py-1 rounded-md text-sm ${
              timeRange === "month"
                ? "bg-primary-color text-white"
                : "text-dark-color dark:text-light-color hover:bg-white hover:bg-opacity-10"
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setTimeRange("year")}
            className={`px-3 py-1 rounded-md text-sm ${
              timeRange === "year"
                ? "bg-primary-color text-white"
                : "text-dark-color dark:text-light-color hover:bg-white hover:bg-opacity-10"
            }`}
          >
            Year
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass dark:bg-dark-color dark:bg-opacity-50 rounded-lg shadow-lg border border-white border-opacity-20 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-color dark:text-light-color opacity-70">Total Users</p>
              <h3 className="text-2xl font-bold text-primary-color dark:text-secondary-color">
                {stats?.totalUsers || 0}
              </h3>
              <p className="text-xs text-success-color mt-1">
                <span className="inline-block mr-1">↑</span>
                12% from last {timeRange}
              </p>
            </div>
            <div className="p-3 rounded-full bg-primary-color bg-opacity-10 text-primary-color dark:text-secondary-color">
              <Users className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="glass dark:bg-dark-color dark:bg-opacity-50 rounded-lg shadow-lg border border-white border-opacity-20 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-color dark:text-light-color opacity-70">Total Tasks</p>
              <h3 className="text-2xl font-bold text-success-color">{stats?.totalTasks || 0}</h3>
              <p className="text-xs text-success-color mt-1">
                <span className="inline-block mr-1">↑</span>
                8% from last {timeRange}
              </p>
            </div>
            <div className="p-3 rounded-full bg-success-color bg-opacity-10 text-success-color">
              <CheckSquare className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="glass dark:bg-dark-color dark:bg-opacity-50 rounded-lg shadow-lg border border-white border-opacity-20 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-color dark:text-light-color opacity-70">Completion Rate</p>
              <h3 className="text-2xl font-bold text-warning-color">{stats?.completionRate || 0}%</h3>
              <p className="text-xs text-danger-color mt-1">
                <span className="inline-block mr-1">↓</span>
                3% from last {timeRange}
              </p>
            </div>
            <div className="p-3 rounded-full bg-warning-color bg-opacity-10 text-warning-color">
              <Activity className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="glass dark:bg-dark-color dark:bg-opacity-50 rounded-lg shadow-lg border border-white border-opacity-20 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-color dark:text-light-color opacity-70">Avg. Completion Time</p>
              <h3 className="text-2xl font-bold text-info-color">2.4 days</h3>
              <p className="text-xs text-success-color mt-1">
                <span className="inline-block mr-1">↑</span>
                5% faster than last {timeRange}
              </p>
            </div>
            <div className="p-3 rounded-full bg-info-color bg-opacity-10 text-info-color">
              <Clock className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Completion Chart */}
        <div className="glass dark:bg-dark-color dark:bg-opacity-50 rounded-lg shadow-lg border border-white border-opacity-20 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-primary-color dark:text-secondary-color">Task Completion</h3>
            <div className="flex items-center text-sm">
              <span className="inline-block w-3 h-3 rounded-full bg-primary-color mr-1"></span>
              <span className="text-dark-color dark:text-light-color mr-3">Completed</span>
              <span className="inline-block w-3 h-3 rounded-full bg-warning-color mr-1"></span>
              <span className="text-dark-color dark:text-light-color">Pending</span>
            </div>
          </div>
          <div className="h-64">
            <TaskCompletionChart data={taskCompletionData} />
          </div>
        </div>

        {/* User Activity Chart */}
        <div className="glass dark:bg-dark-color dark:bg-opacity-50 rounded-lg shadow-lg border border-white border-opacity-20 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-primary-color dark:text-secondary-color">User Activity</h3>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-dark-color dark:text-light-color opacity-70 mr-1" />
              <span className="text-sm text-dark-color dark:text-light-color">Last 7 days</span>
            </div>
          </div>
          <div className="h-64">
            <UserActivityChart data={userActivityData} />
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Distribution Chart */}
        <div className="glass dark:bg-dark-color dark:bg-opacity-50 rounded-lg shadow-lg border border-white border-opacity-20 p-4">
          <h3 className="text-lg font-semibold text-primary-color dark:text-secondary-color mb-4">Task Distribution</h3>
          <div className="h-64 flex items-center justify-center">
            <TaskDistributionChart data={taskDistributionData} />
          </div>
        </div>

        {/* Top Performers */}
        <div className="glass dark:bg-dark-color dark:bg-opacity-50 rounded-lg shadow-lg border border-white border-opacity-20 p-4">
          <h3 className="text-lg font-semibold text-primary-color dark:text-secondary-color mb-4">Top Performers</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-dark-color dark:text-light-color opacity-70 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-dark-color dark:text-light-color opacity-70 uppercase tracking-wider">
                    Tasks
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-dark-color dark:text-light-color opacity-70 uppercase tracking-wider">
                    Completion
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-dark-color dark:text-light-color opacity-70 uppercase tracking-wider">
                    Progress
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white divide-opacity-10">
                {topPerformersData.map((user, index) => (
                  <tr key={index} className="hover:bg-white hover:bg-opacity-5 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full glass flex items-center justify-center text-primary-color dark:text-secondary-color font-medium">
                          {user.name.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-dark-color dark:text-light-color">{user.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-dark-color dark:text-light-color">
                      {user.tasks}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-dark-color dark:text-light-color">
                      {user.completion}%
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div
                          className="bg-primary-color h-2.5 rounded-full"
                          style={{ width: `${user.completion}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

// Chart Components
function TaskCompletionChart({ data }) {
  return (
    <div className="w-full h-full flex items-end">
      {data.map((item, index) => (
        <div key={index} className="flex-1 flex flex-col items-center">
          <div className="w-full flex flex-col items-center space-y-1">
            <div className="w-8 bg-primary-color rounded-t-md" style={{ height: `${item.completed * 8}px` }}></div>
            <div className="w-8 bg-warning-color rounded-t-md" style={{ height: `${item.pending * 8}px` }}></div>
          </div>
          <div className="text-xs text-dark-color dark:text-light-color mt-2">{item.name}</div>
        </div>
      ))}
    </div>
  )
}

function UserActivityChart({ data }) {
  // Find max value for scaling
  const maxValue = Math.max(...data.map((item) => item.tasks)) * 1.2

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 relative">
        {/* Line */}
        <svg className="w-full h-full">
          <polyline
            points={data
              .map((item, index) => `${(index / (data.length - 1)) * 100}% ${100 - (item.tasks / maxValue) * 100}%`)
              .join(" ")}
            fill="none"
            stroke="#0077B6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Dots */}
          {data.map((item, index) => (
            <circle
              key={index}
              cx={`${(index / (data.length - 1)) * 100}%`}
              cy={`${100 - (item.tasks / maxValue) * 100}%`}
              r="4"
              fill="#0077B6"
            />
          ))}
        </svg>
      </div>
      <div className="h-6 flex justify-between">
        {data.map((item, index) => (
          <div key={index} className="text-xs text-dark-color dark:text-light-color">
            {item.name}
          </div>
        ))}
      </div>
    </div>
  )
}

function TaskDistributionChart({ data }) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  const radius = 80
  const circumference = 2 * Math.PI * radius

  let startAngle = 0

  return (
    <div className="relative w-64 h-64">
      <svg width="100%" height="100%" viewBox="0 0 200 200">
        {data.map((item, index) => {
          const percentage = item.value / total
          const endAngle = startAngle + percentage * 2 * Math.PI

          // Calculate path
          const x1 = 100 + radius * Math.cos(startAngle)
          const y1 = 100 + radius * Math.sin(startAngle)
          const x2 = 100 + radius * Math.cos(endAngle)
          const y2 = 100 + radius * Math.sin(endAngle)

          // Determine if the arc should be drawn as a large arc
          const largeArcFlag = percentage > 0.5 ? 1 : 0

          // Create path
          const path = [
            `M 100 100`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            `Z`,
          ].join(" ")

          const currentStartAngle = startAngle
          startAngle = endAngle

          return <path key={index} d={path} fill={item.color} stroke="#fff" strokeWidth="1" />
        })}
      </svg>

      {/* Legend */}
      <div className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center gap-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: item.color }}></div>
            <span className="text-xs text-dark-color dark:text-light-color">
              {item.name} ({item.value}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

