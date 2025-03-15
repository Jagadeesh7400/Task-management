"use client"

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./useAuth";

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useAuth();

  // Fetch notifications
  const fetchNotifications = useCallback(async () => {
    if (!user) return;
    
    try {
      // In a real app, this would be an API call
      // const response = await api.get('/notifications');
      // setNotifications(response.data);
      
      // For now, we'll use mock data
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
      ];
      
      setNotifications(mockNotifications);
      setUnreadCount(mockNotifications.filter(n => !n.read).length);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  }, [user]);

  // Mark notification as read
  const markAsRead = useCallback(async (id) => {
    try {
      // In a real app, this would be an API call
      // await api.put(`/notifications/${id}/read`);
      
      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  }, []);

  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    try {
      // In a real app, this would be an API call
      // await api.put('/notifications/read-all');
      
      setNotifications(prev => 
        prev.map(n => ({ ...n, read: true }))
      );
      setUnreadCount(0);
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  }, []);

  // Add a new notification (for real-time updates)
  const addNotification = useCallback((notification) => {
    setNotifications(prev => [notification, ...prev]);
    if (!notification.read) {
      setUnreadCount(prev => prev + 1);
    }
  }, []);

  // Check for task deadlines and create notifications
  useEffect(() => {
    if (!user) return;
    
    // Fetch notifications on mount
    fetchNotifications();
    
    // Set up polling for new notifications (in a real app, use WebSockets)
    const interval = setInterval(() => {
      fetchNotifications();
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [user, fetchNotifications]);

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    addNotification,
    fetchNotifications
  };
}
