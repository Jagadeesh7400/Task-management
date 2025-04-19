const Meeting = require("../models/Meeting");
const { v4: uuidv4 } = require('uuid'); // Import UUID

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
    let query = {};
    // If user is not an admin, only show meetings they are a part of
    if (req.user.role !== 'admin') {
      query = {
        $or: [
          { createdBy: req.user.id }, // Meetings created by the user
          { participants: req.user.id }  // Meetings the user is a participant in
        ]
      };
    }
    const meetings = await Meeting.find(query).populate("participants", "name email").populate("teams", "name");
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
    const meeting = await Meeting.findOne({
      _id: req.params.id,
      $or: [
        { createdBy: req.user.id },
        { participants: req.user.id }
      ]
    }).populate(
      "participants",
      "name email"
    ).populate("teams", "name");

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

    const jitsiRoomId = uuidv4(); // Generate unique Jitsi Room ID

    const meeting = new Meeting({
      title,
      description,
      startTime,
      endTime,
      participants,
      teams,
      createdBy: req.user.id,
      purpose,
      jitsiRoomId,
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
    const { title, description, startTime, endTime, participants, teams, purpose, jitsiRoomId } =
      req.body;

    const meeting = await Meeting.findOne({
      _id: req.params.id,
      createdBy: req.user.id
    });

    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found or unauthorized" });
    }

    const updatedMeeting = await Meeting.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        startTime,
        endTime,
        participants,
        teams,
        purpose,
        jitsiRoomId,
      },
      { new: true }
    );

    if (!updatedMeeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    res.json(updatedMeeting);
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
     const meeting = await Meeting.findOne({
      _id: req.params.id,
      createdBy: req.user.id
    });

    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found or unauthorized" });
    }
    
    const deletedMeeting = await Meeting.findByIdAndDelete(req.params.id);

    if (!deletedMeeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    res.json({ message: "Meeting deleted successfully" });
  } catch (error) {
    console.error("Delete meeting error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
