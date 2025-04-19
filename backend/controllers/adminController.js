const User = require("../models/User")
const Task = require("../models/Task")

// Get admin dashboard statistics
exports.getStats = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" })
    }

    // Get total users
    const totalUsers = await User.countDocuments()

    // Get total tasks
    const totalTasks = await Task.countDocuments()

    // Get completed tasks
    const completedTasks = await Task.countDocuments({ status: "completed" })

    // Calculate completion rate
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

    // Get active users (users with at least one task)
    const usersWithTasks = await Task.distinct("userId")
    const activeUsers = usersWithTasks.length

    res.json({
      totalUsers,
      totalTasks,
      completedTasks,
      completionRate,
      activeUsers,
    })
  } catch (error) {
    console.error("Get admin stats error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

// Get all users (admin only)
exports.getUsers = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" })
    }

    // Get query parameters
    const { limit, sort, search } = req.query

    // Build query
    let query = User.find()

    // Apply search if provided
    if (search) {
      query = query.find({
        $or: [{ name: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }],
      })
    }

    // Apply sorting if provided
    if (sort) {
      const [field, order] = sort.split(":")
      const sortOrder = order === "desc" ? -1 : 1
      query = query.sort({ [field]: sortOrder })
    } else {
      // Default sort by createdAt desc
      query = query.sort({ createdAt: -1 })
    }

    // Apply limit if provided
    if (limit) {
      query = query.limit(Number.parseInt(limit))
    }

    // Execute query
    const users = await query.select("-password")

    // Get task count for each user
    const usersWithTaskCount = await Promise.all(
      users.map(async (user) => {
        const taskCount = await Task.countDocuments({ userId: user._id })
        return {
          ...user.toObject(),
          taskCount,
        }
      }),
    )

    res.json(usersWithTaskCount)
  } catch (error) {
    console.error("Get users error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

// Get all tasks (admin only)
exports.getTasks = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" })
    }

    // Get query parameters
    const { limit, sort, userId, status } = req.query

    // Build query
    let query = Task.find()

    // Filter by userId if provided
    if (userId) {
      query = query.find({ userId })
    }

    // Filter by status if provided
    if (status) {
      query = query.find({ status })
    }

    // Apply sorting if provided
    if (sort) {
      const [field, order] = sort.split(":")
      const sortOrder = order === "desc" ? -1 : 1
      query = query.sort({ [field]: sortOrder })
    } else {
      // Default sort by createdAt desc
      query = query.sort({ createdAt: -1 })
    }

    // Apply limit if provided
    if (limit) {
      query = query.limit(Number.parseInt(limit))
    }

    // Execute query and populate user info
    const tasks = await query.populate("userId", "name email")

    // Format response
    const formattedTasks = tasks.map((task) => ({
      ...task.toObject(),
      user: task.userId,
      userId: task.userId._id,
    }))

    res.json(formattedTasks)
  } catch (error) {
    console.error("Get tasks error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

// Create a new user (admin only)
exports.createUser = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" })
    }

    const { name, email, password, role } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      role: role || "user",
    })

    await user.save()

    // Remove password from response
    const userResponse = user.toObject()
    delete userResponse.password

    res.status(201).json(userResponse)
  } catch (error) {
    console.error("Create user error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

// Update a user (admin only)
exports.updateUser = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" })
    }

    const { name, email, role, occupation, location, bio } = req.body

    // Find user
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Update fields
    if (name) user.name = name
    if (email) user.email = email
    if (role) user.role = role
    if (occupation !== undefined) user.occupation = occupation
    if (location !== undefined) user.location = location
    if (bio !== undefined) user.bio = bio

    await user.save()

    // Remove password from response
    const userResponse = user.toObject()
    delete userResponse.password

    res.json(userResponse)
  } catch (error) {
    console.error("Update user error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

// Delete a user (admin only)
exports.deleteUser = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" })
    }

    // Find and delete user
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Delete all tasks associated with the user
    await Task.deleteMany({ userId: req.params.id })

    res.json({ message: "User deleted successfully" })
  } catch (error) {
    console.error("Delete user error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

// Get user performance (admin only)
exports.getUserPerformance = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" })
    }

    const userId = req.params.id

    // Find user
    const user = await User.findById(userId).select("-password")
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Get task statistics
    const totalTasks = await Task.countDocuments({ userId })
    const completedTasks = await Task.countDocuments({
      userId,
      status: "completed",
    })
    const pendingTasks = await Task.countDocuments({
      userId,
      status: "pending",
    })

    // Calculate overdue tasks
    const now = new Date()
    const overdueTasks = await Task.countDocuments({
      userId,
      status: "pending",
      deadline: { $lt: now },
    })

    // Calculate completion rate
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

    // Get task completion history (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const completionHistory = await Task.find({
      userId,
      status: "completed",
      updatedAt: { $gte: thirtyDaysAgo },
    }).sort({ updatedAt: 1 })

    res.json({
      user,
      stats: {
        totalTasks,
        completedTasks,
        pendingTasks,
        overdueTasks,
        completionRate,
      },
      completionHistory,
    })
  } catch (error) {
    console.error("Get user performance error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

