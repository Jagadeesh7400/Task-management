const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");
const { authenticateToken, isAdmin } = require("../middleware/authMiddleware");

/**
 * @fileOverview Team routes.
 * @module routes/teamRoutes
 */

// Get all teams
router.get("/", authenticateToken, teamController.getTeams);

// Get a single team
router.get("/:id", authenticateToken, teamController.getTeam);

// Create a new team
router.post("/", authenticateToken, isAdmin, teamController.createTeam);

// Update a team
router.put("/:id", authenticateToken, isAdmin, teamController.updateTeam);

// Delete a team
router.delete("/:id", authenticateToken, isAdmin, teamController.deleteTeam);

module.exports = router;
