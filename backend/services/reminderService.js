const cron = require('node-cron');
const Task = require('../models/Task');
const User = require('../models/User');
const { sendTaskReminderEmail } = require('../utils/emailService');

/**
 * @fileOverview Reminder service for sending task reminders.
 * @module services/reminderService
 */

/**
 * Start the reminder service that runs every day at 9:00 AM.
 */
exports.startReminderService = () => {
  // Schedule task to run every day at 9:00 AM
  cron.schedule('0 9 * * *', async () => {
    console.log('Running task reminder service...');
    try {
      // Find tasks with deadlines approaching within the next 24 hours
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);

      const tasks = await Task.find({
        deadline: { $gte: now, $lte: tomorrow },
        status: { $ne: 'completed' }, // Exclude completed tasks
      }).populate('userId', 'name email');

      // Send reminder emails for each task
      for (const task of tasks) {
        const user = task.userId;
        if (user && user.email) {
          await sendTaskReminderEmail(user.email, task);
          console.log(`Sent reminder email to ${user.email} for task: ${task.title}`);
        } else {
          console.warn(`User or user email not found for task: ${task.title}`);
        }
      }
      console.log('Task reminder service completed.');
    } catch (error) {
      console.error('Error running task reminder service:', error);
    }
  });
};

/**
 * Sends a task reminder email.
 * @param {string} email - The recipient email address.
 * @param {Object} task - The task details.
 * @returns {Promise<void>}
 */
exports.sendTaskReminderEmail = async (email, task) => {
  try {
    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE, // e.g., 'gmail'
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Define the email options
    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Task Reminder",
      html: `<p>Reminder: Task "${task.title}" is due soon. Please complete it before the deadline.</p>`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log(`Task reminder email sent to ${email} successfully`);
  } catch (error) {
    console.error("Error sending task reminder email:", error);
    throw new Error("Failed to send task reminder email");
  }
};
