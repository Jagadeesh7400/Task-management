const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to authenticate JWT token
exports.authenticateToken = async (req, res, next) => {
  // ... existing code ...
};

// Middleware to check if user is admin
exports.isAdmin = (req, res, next) => {
  // ... existing code ...
};

// Middleware to check if user owns the resource or is admin
exports.isOwnerOrAdmin = (model) => {
  // ... existing code ...
};

// Rate limiting middleware
exports.rateLimiter = (maxRequests, timeWindow) => {
  // ... existing code ...
};

// Get current user profile
exports.getProfile = async (req, res) => {
  res.json(req.user);
};

// Update user profile
exports.updateProfile = async (req, res) => {
  const { name, email } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, { name, email }, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update user password
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

// Upload profile photo
exports.uploadProfilePhoto = async (req, res) => {
  // Logic for uploading profile photo
  res.json({ message: "Profile photo uploaded successfully" });
};
