const cron = require("node-cron")
const Task = require("../models/Task")
const User = require("../models/User")
const { sendTaskReminderEmail } = require("../utils/emailService")

// Schedule task to run every 15 minutes
const startReminderService = () => {
  console.log("Starting task reminder service...")

  // Schedule to run every 15 minutes
  cron.schedule("*/15 * * * *", async () => {
    try {
      const now = new Date()
      const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000)

      // Find tasks that are due within the next hour and not completed
      const tasks = await Task.find({
        status: "pending",
        deadline: {
          $gt: now,
          $lt: oneHourFromNow,
        },
      }).populate("userId", "name email")

      console.log(`Found ${tasks.length} tasks due within the next hour`)

      // Send reminder emails
      for (const task of tasks) {
        if (task.userId && task.userId.email) {
          try {
            await sendTaskReminderEmail(task.userId.email, task.title, task.deadline)
            console.log(`Reminder sent for task: ${task.title} to ${task.userId.email}`)
          } catch (emailError) {
            console.error(`Failed to send reminder email for task ${task._id}:`, emailError)
          }
        }
      }
    } catch (error) {
      console.error("Error in reminder service:", error)
    }
  })
}

module.exports = { startReminderService }

