"use client"

import { useState, useEffect } from "react"
import { api, checkApiAvailability } from "../services/api"

export const useAdmin = () => {
  const [admins, setAdmins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAdmins = async () => {
    const isApiAvailable = await checkApiAvailability()
    if (!isApiAvailable) {
      setAdmins([{ id: 1, name: "Mock Admin" }, { id: 2, name: "Mock Admin 2" }])
      setLoading(false)
      return
    }
    try {
      const response = await api.get("/admin")
      setAdmins(response.data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  const getUsers = async (params) => {
    try {
      const response = await api.get("/admin/users", { params })
      return response.data
    } catch (err) {
      throw err
    }
  }

  const getStats = async () => {
    try {
      const response = await api.get("/admin/stats")
      return response.data
    } catch (error) {
      throw error
    }
  }

  const getUser = async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`)
      return response.data
    } catch (error) {
      throw error
    }
  }

  const updateUser = async (userId, userData) => {
    try {
      const response = await api.put(`/users/${userId}`, userData)
      return response.data
    } catch (error) {
      throw error
    }
  }

  const deleteUser = async (userId) => {
    try {
      await api.delete(`/admin/users/${userId}`)
    } catch (err) {
      throw err
    }
  }

  useEffect(() => {
    fetchAdmins()
  }, [])

  return { admins, loading, error, getUsers, deleteUser, getStats, getUser, updateUser }
}
