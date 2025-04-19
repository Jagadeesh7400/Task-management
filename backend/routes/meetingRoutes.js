const express = require("express");
const router = express.Router();
const meetingController = require("../controllers/meetingController");
const { authenticateToken } = require("../middleware/authMiddleware");

/**
 * @fileOverview Meeting routes.
 * @module routes/meetingRoutes
 */

// Get all meetings
router.get("/", authenticateToken, meetingController.getMeetings);

// Get a single meeting
router.get("/:id", authenticateToken, meetingController.getMeeting);

// Create a new meeting
router.post("/", authenticateToken, meetingController.createMeeting);

// Update a meeting
router.put("/:id", authenticateToken, meetingController.updateMeeting);

// Delete a meeting
router.delete("/:id", authenticateToken, meetingController.deleteMeeting);

module.exports = router;
