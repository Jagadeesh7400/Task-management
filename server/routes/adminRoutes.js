const express = require("express")
const router = express.Router()
const adminController = require("../controllers/adminController")
const { authenticateToken, isAdmin } = require("../middleware/authMiddleware")

// Apply authentication middleware to all routes
router.use(authenticateToken)
router.use(isAdmin)

// Get admin dashboard statistics
router.get("/stats", adminController.getStats)

// Get all users
router.get("/users", adminController.getUsers)

// Get all tasks
router.get("/tasks", adminController.getTasks)

// Create a new user
router.post("/users", adminController.createUser)

// Update a user
router.put("/users/:id", adminController.updateUser)

// Delete a user
router.delete("/users/:id", adminController.deleteUser)

// Get user performance
router.get("/users/:id/performance", adminController.getUserPerformance)

module.exports = router

