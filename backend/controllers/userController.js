const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * @fileOverview User controller to manage user profiles and authentication.
 * @module controllers/userController
 */

/**
 * Middleware to authenticate JWT token
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Next middleware function.
 * @returns {Promise<void>}
 */
exports.authenticateToken = async (req, res, next) => {
  // ... existing code ...
};

/**
 * Middleware to check if user is admin
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Next middleware function.
 * @returns {void}
 */
exports.isAdmin = (req, res, next) => {
  // ... existing code ...
};

/**
 * Middleware to check if user owns the resource or is admin
 * @param {Object} model - Mongoose model.
 * @returns {Function} - Middleware function.
 */
exports.isOwnerOrAdmin = (model) => {
  // ... existing code ...
};

/**
 * Rate limiting middleware
 * @param {number} maxRequests - Maximum number of requests allowed.
 * @param {number} timeWindow - Time window in milliseconds.
 * @returns {Function} - Middleware function.
 */
exports.rateLimiter = (maxRequests, timeWindow) => {
  // ... existing code ...
};

/**
 * Get current user profile
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
exports.getProfile = async (req, res) => {
  res.json(req.user);
};

/**
 * Update user profile
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
exports.updateProfile = async (req, res) => {
  const { name, email } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Update user password
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
exports.updatePassword = async (req, res) => {
  const { password } = req.body;
  try {
    const user = await User.findById(req.user.id);
    user.password = password; // Ensure to hash the password before saving
    await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Upload profile photo
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
exports.uploadProfilePhoto = async (req, res) => {
  // Logic for uploading profile photo
  res.json({ message: "Profile photo uploaded successfully" });
};
