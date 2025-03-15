const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const { authenticateToken } = require("../middleware/authMiddleware")

// Apply authentication middleware to all routes
router.use(authenticateToken)

// Get current user profile
router.get("/profile", userController.getProfile)

// Update user profile
router.put("/profile", userController.updateProfile)

// Update user password
router.put("/password", userController.updatePassword)

// Upload profile photo
router.post("/profile-photo", userController.uploadProfilePhoto)

module.exports = router

