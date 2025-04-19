const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

/**
 * @fileOverview Authentication routes.
 * @module routes/authRoutes
 */

// Register with email verification
router.post("/register", authController.register);

// Verify email
router.get("/verify-email/:token", authController.verifyEmail);

// Login
router.post("/login", authController.login);

// Forgot password
router.post("/forgot-password", authController.forgotPassword);

// Reset password
router.post("/reset-password", authController.resetPassword);

module.exports = router;
