const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  occupation: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  bio: {
    type: String,
  },
  profilePhoto: {
    type: String,
  },
  socialLinks: {
    twitter: String,
    linkedin: String,
    github: String,
    facebook: String,
  },
  // Add these fields for email verification
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  verificationExpires: Date,
  // Add these fields for password reset
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model("User", userSchema)

