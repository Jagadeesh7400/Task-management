"use client"

import { useState } from "react"
import { Bell, Check, Clock, X } from "lucide-react"

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    title: "Task deadline approaching",
    message: 'Your task "Website Redesign" is due in 30 minutes',
    time: "30 minutes ago",
    read: false,
    type: "deadline",
  },
  {
    id: 2,
    title: "Task completed",
    message: 'You marked "Database Migration" as completed',
    time: "2 hours ago",
    read: true,
    type: "completion",
  },
  {
    id: 3,
    title: "New task assigned",
    message: 'Admin assigned you a new task "API Integration"',
    time: "1 day ago",
    read: true,
    type: "assignment",
  },
]

export default function NotificationPanel() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [filter, setFilter] = useState("all")

  const filteredNotifications =
    filter === "all"
      ? notifications
      : filter === "unread"
        ? notifications.filter((n) => !n.read)
        : notifications.filter((n) => n.read)

  const markAsRead = (id) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const getIcon = (type) => {
    switch (type) {
      case "deadline":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "completion":
        return <Check className="h-5 w-5 text-green-500" />
      case "assignment":
        return <Bell className="h-5 w-5 text-blue-500" />
      default:
        return <Bell className="h-5 w-5 text-0077b6" />
    }
  }

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-03045e rounded-lg shadow-lg overflow-hidden z-50 border border-ade8f4 dark:border-023e8a">
      <div className="p-4 border-b border-ade8f4 dark:border-023e8a">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-0077b6 dark:text-48cae4">Notifications</h3>
          <button onClick={markAllAsRead} className="text-sm text-0077b6 dark:text-48cae4 hover:underline">
            Mark all as read
          </button>
        </div>

        <div className="flex mt-2 space-x-2">
          {["all", "unread", "read"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2 py-1 text-xs rounded-full ${
                filter === f ? "bg-0077b6 text-white" : "bg-ade8f4 dark:bg-023e8a text-0077b6 dark:text-48cae4"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="max-h-80 overflow-y-auto">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-b border-ade8f4 dark:border-023e8a hover:bg-ade8f4 dark:hover:bg-023e8a ${
                !notification.read ? "bg-blue-50 dark:bg-023e8a" : ""
              }`}
            >
              <div className="flex">
                <div className="flex-shrink-0 mr-3">{getIcon(notification.type)}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-medium text-0077b6 dark:text-48cae4">{notification.title}</p>
                    {!notification.read && (
                      <button onClick={() => markAsRead(notification.id)} className="ml-2">
                        <X className="h-4 w-4 text-0077b6 dark:text-48cae4" />
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">No notifications found</div>
        )}
      </div>

      <div className="p-2 border-t border-ade8f4 dark:border-023e8a text-center">
        <button className="text-sm text-0077b6 dark:text-48cae4 hover:underline">View all notifications</button>
      </div>
    </div>
  )
}
