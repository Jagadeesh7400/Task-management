const nodemailer = require("nodemailer");

/**
 * @fileOverview Utility functions for sending emails.
 * @module utils/emailService
 */

/**
 * Sends a verification email.
 * @param {string} email - The recipient email address.
 * @param {string} verificationToken - The verification token.
 * @returns {Promise<void>}
 */
exports.sendVerificationEmail = async (email, verificationToken) => {
  try {
    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE, // e.g., 'gmail'
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const verificationLink = `http://localhost:3000/verify-email/${verificationToken}`;

    // Define the email options
    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification",
      html: `<p>Please click <a href="${verificationLink}">here</a> to verify your email.</p>`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
};

/**
 * Sends a password reset email.
 * @param {string} email - The recipient email address.
 * @param {string} resetToken - The reset token.
 * @returns {Promise<void>}
 */
exports.sendResetPasswordEmail = async (email, resetToken) => {
  try {
    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

    // Define the email options
    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      html: `<p>Please click <a href="${resetLink}">here</a> to reset your password.</p>`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Reset password email sent successfully");
  } catch (error) {
    console.error("Error sending reset password email:", error);
    throw new Error("Failed to send reset password email");
  }
};
