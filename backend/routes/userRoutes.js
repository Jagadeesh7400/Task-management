const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticateToken } = require("../middleware/authMiddleware");

/**
 * @fileOverview User routes.
 * @module routes/userRoutes
 */

// Get current user profile
router.get("/profile", authenticateToken, userController.getProfile);

// Update user profile
router.put("/profile", authenticateToken, userController.updateProfile);

// Update user password
router.put("/password", authenticateToken, userController.updatePassword);

module.exports = router;
