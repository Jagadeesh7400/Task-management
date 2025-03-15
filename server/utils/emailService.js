const nodemailer = require("nodemailer")

// Create transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
})

// Send verification email
exports.sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${token}`

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Email Verification - Zidio Task Management",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #4e54c8;">Verify Your Email</h1>
        </div>
        <p>Thank you for registering with Zidio Task Management. Please click the button below to verify your email address:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" style="background-color: #4e54c8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Verify Email</a>
        </div>
        <p>This link will expire in 24 hours.</p>
        <p>If you didn't create an account, you can safely ignore this email.</p>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #666;">
          <p>Zidio Task Management</p>
        </div>
      </div>
    `,
  }

  await transporter.sendMail(mailOptions)
}

// Send reset password email
exports.sendResetPasswordEmail = async (email, token) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Password Reset - Zidio Task Management",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #4e54c8;">Reset Your Password</h1>
        </div>
        <p>You requested a password reset. Click the button below to reset your password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #4e54c8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
        </div>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #666;">
          <p>Zidio Task Management</p>
        </div>
      </div>
    `,
  }

  await transporter.sendMail(mailOptions)
}

// Send task reminder email
exports.sendTaskReminderEmail = async (email, taskTitle, deadline) => {
  const formattedDeadline = new Date(deadline).toLocaleString()

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Task Reminder - Zidio Task Management",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #4e54c8;">Task Reminder</h1>
        </div>
        <p>Your task "${taskTitle}" is approaching its deadline.</p>
        <p><strong>Deadline:</strong> ${formattedDeadline}</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.CLIENT_URL}/tasks" style="background-color: #4e54c8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">View Task</a>
        </div>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #666;">
          <p>Zidio Task Management</p>
        </div>
      </div>
    `,
  }

  await transporter.sendMail(mailOptions)
}

// Send welcome email
exports.sendWelcomeEmail = async (email, name) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Welcome to Zidio Task Management",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #4e54c8;">Welcome to Zidio!</h1>
        </div>
        <p>Hello ${name},</p>
        <p>Thank you for joining Zidio Task Management. We're excited to have you on board!</p>
        <p>Get started by creating your first task:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.CLIENT_URL}/tasks" style="background-color: #4e54c8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Create Task</a>
        </div>
        <p>If you have any questions, feel free to reach out to our support team.</p>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #666;">
          <p>Zidio Task Management</p>
        </div>
      </div>
    `,
  }

  await transporter.sendMail(mailOptions)
}

