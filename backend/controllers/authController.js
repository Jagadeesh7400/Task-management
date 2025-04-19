const User = require("../models/User")
const { sendResetPasswordEmail } = require("../utils/emailService")
const crypto = require("crypto")
const { sendVerificationEmail } = require("../utils/emailService")
const jwt = require("jsonwebtoken") // Import jwt for token validation

// Register with email verification
exports.validateToken = async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from headers
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.json({ message: "Token is valid", userId: decoded.id });
  });
}

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex")
    const verificationExpires = Date.now() + 24 * 60 * 60 * 1000 // 24 hours

    // Create new user
    const user = new User({
      name,
      email,
      password,
      verificationToken,
      verificationExpires,
      isVerified: false,
    })

    await user.save()

    // Send verification email
    await sendVerificationEmail(user.email, verificationToken)

    res.status(201).json({
      message: "Registration successful. Please check your email to verify your account.",
    })
  } catch (error) {
    console.error("Registration error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

// Verify email
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params

    // Find user with the verification token
    const user = await User.findOne({
      verificationToken: token,
      verificationExpires: { $gt: Date.now() },
    })

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired verification token" })
    }

    // Update user as verified
    user.isVerified = true
    user.verificationToken = undefined
    user.verificationExpires = undefined
    await user.save()

    // Generate JWT token
    const jwtToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" })

    res.json({
      message: "Email verified successfully",
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Email verification error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    // Check if user is verified
    if (!user.isVerified) {
      return res.status(401).json({ message: "Please verify your email before logging in" })
    }

    // Check password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" })

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        occupation: user.occupation,
        location: user.location,
        bio: user.bio,
        profilePhoto: user.profilePhoto,
        socialLinks: user.socialLinks,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

// Forgot password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Generate reset token
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })

    // Send reset email
    await sendResetPasswordEmail(user.email, resetToken)

    res.json({ message: "Password reset email sent" })
  } catch (error) {
    console.error("Forgot password error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

// Reset password
exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Find user
    const user = await User.findById(decoded.id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Update password
    user.password = password
    await user.save()

    res.json({ message: "Password reset successful" })
  } catch (error) {
    console.error("Reset password error:", error)

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid or expired token" })
    }

    res.status(500).json({ message: "Server error" })
  }
}
