const express = require("express")
const cron = require('node-cron');
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const authRoutes = require("./routes/authRoutes")
const taskRoutes = require("./routes/taskRoutes")
const userRoutes = require("./routes/userRoutes")
const adminRoutes = require("./routes/adminRoutes")
const { authenticateToken } = require("./middleware/authMiddleware")
const { startReminderService } = require('./services/reminderService');
const { deleteOldLogs } = require('./services/auditService');

// Load environment variables
dotenv.config()

// Create Express app
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/tasks", authenticateToken, taskRoutes)
app.use("/api/users", userRoutes)
app.use("/api/admin", authenticateToken, adminRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: "Something went wrong!" })
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// Start the reminder service
startReminderService();

// Schedule cleanup of old audit logs (run daily at midnight)
cron.schedule('0 0 * * *', async () => {
  try {
    const deletedCount = await deleteOldLogs(90); // Delete logs older than 90 days
    console.log(`Deleted ${deletedCount} old audit logs`);
  } catch (error) {
    console.error('Error cleaning up old audit logs:', error);
  }
});
