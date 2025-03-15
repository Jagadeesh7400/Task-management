// This script creates the first admin user in the database
require("dotenv").config()
const mongoose = require("mongoose")
const User = require("../models/User")
const bcrypt = require("bcryptjs")

// Admin credentials
const adminData = {
  name: "Admin User",
  email: "admin@zidio.com",
  password: "securePassword123", // This will be hashed
  role: "admin",
}

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to MongoDB")

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminData.email })
    if (existingAdmin) {
      console.log("Admin user already exists")
      mongoose.connection.close()
      return
    }

    // Create admin user
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(adminData.password, salt)

    const admin = new User({
      name: adminData.name,
      email: adminData.email,
      password: hashedPassword,
      role: adminData.role,
    })

    await admin.save()
    console.log("Admin user created successfully")

    mongoose.connection.close()
  } catch (error) {
    console.error("Error creating admin user:", error)
    mongoose.connection.close()
  }
}

createAdmin()

