const Team = require("../models/Team");

/**
 * @fileOverview Team controller to manage teams.
 * @module controllers/teamController
 */

/**
 * Get all teams.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
exports.getTeams = async (req, res) => {
  try {
    let query = {};
    if (req.user.role !== 'admin') {
      query = { members: req.user.id };
    }
    const teams = await Team.find(query).populate("members", "name email");
    res.json(teams);
  } catch (error) {
    console.error("Get teams error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get a single team.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
exports.getTeam = async (req, res) => {
  try {
    const team = await Team.findOne({
      _id: req.params.id,
      members: req.user.id // Ensure user is a member
    }).populate(
      "members",
      "name email"
    );

    if (!team) {
      return res.status(404).json({ message: "Team not found or unauthorized" });
    }

    res.json(team);
  } catch (error) {
    console.error("Get team error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Create a new team.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
exports.createTeam = async (req, res) => {
  try {
        if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const { name, description, members, admins } = req.body;

    const team = new Team({
      name,
      description,
      members,
      admins,
    });

    await team.save();

    res.status(201).json(team);
  } catch (error) {
    console.error("Create team error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Update a team.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
exports.updateTeam = async (req, res) => {
  try {
        if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const { name, description, members, admins } = req.body;

    const team = await Team.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        members,
        admins,
      },
      { new: true }
    );

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.json(team);
  } catch (error) {
    console.error("Update team error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Delete a team.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
exports.deleteTeam = async (req, res) => {
  try {
        if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const team = await Team.findByIdAndDelete(req.params.id);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.json({ message: "Team deleted successfully" });
  } catch (error) {
    console.error("Delete team error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
