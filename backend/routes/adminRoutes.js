const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { authenticateToken, isAdmin } = require("../middleware/authMiddleware");

/**
 * @fileOverview Admin routes.
 * @module routes/adminRoutes
 */

// Get admin dashboard statistics
router.get("/stats", authenticateToken, isAdmin, adminController.getStats);

// Get all users (admin only)
router.get("/users", authenticateToken, isAdmin, adminController.getUsers);

// Get all tasks (admin only)
router.get("/tasks", authenticateToken, isAdmin, adminController.getTasks);

// Create a new user (admin only)
router.post("/users", authenticateToken, isAdmin, adminController.createUser);

// Update a user (admin only)
router.put("/users/:id", authenticateToken, isAdmin, adminController.updateUser);

// Delete a user (admin only)
router.delete("/users/:id", authenticateToken, isAdmin, adminController.deleteUser);

// Get user performance (admin only)
router.get("/users/:id/performance", authenticateToken, isAdmin, adminController.getUserPerformance);

module.exports = router;
