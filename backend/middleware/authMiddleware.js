const jwt = require("jsonwebtoken")
const User = require("../models/User")

// Middleware to authenticate JWT token
exports.authenticateToken = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(" ")[1] // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Find user
    const user = await User.findById(decoded.id).select("-password")
    if (!user) {
      return res.status(401).json({ message: "Token is not valid" })
    }

    // Add user to request
    req.user = user
    next()
  } catch (error) {
    console.error("Authentication error:", error)

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Token is not valid" })
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" })
    }

    res.status(500).json({ message: "Server error" })
  }
}

// Middleware to check if user is admin
exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next()
  } else {
    res.status(403).json({ message: "Access denied, admin privileges required" })
  }
}

