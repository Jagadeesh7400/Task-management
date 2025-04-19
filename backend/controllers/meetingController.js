const Meeting = require("../models/Meeting");

/**
 * @fileOverview Meeting controller to manage meetings.
 * @module controllers/meetingController
 */

/**
 * Get all meetings.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
exports.getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find().populate("participants", "name email");
    res.json(meetings);
  } catch (error) {
    console.error("Get meetings error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get a single meeting.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
exports.getMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id).populate(
      "participants",
      "name email"
    );

    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    res.json(meeting);
  } catch (error) {
    console.error("Get meeting error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Create a new meeting.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
exports.createMeeting = async (req, res) => {
  try {
    const { title, description, startTime, endTime, participants, teams, purpose } =
      req.body;

    const meeting = new Meeting({
      title,
      description,
      startTime,
      endTime,
      participants,
      teams,
      createdBy: req.user.id,
      purpose,
    });

    await meeting.save();

    res.status(201).json(meeting);
  } catch (error) {
    console.error("Create meeting error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Update a meeting.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
exports.updateMeeting = async (req, res) => {
  try {
    const { title, description, startTime, endTime, participants, teams, purpose } =
      req.body;

    const meeting = await Meeting.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        startTime,
        endTime,
        participants,
        teams,
        purpose,
      },
      { new: true }
    );

    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    res.json(meeting);
  } catch (error) {
    console.error("Update meeting error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Delete a meeting.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
exports.deleteMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndDelete(req.params.id);

    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    res.json({ message: "Meeting deleted successfully" });
  } catch (error) {
    console.error("Delete meeting error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
