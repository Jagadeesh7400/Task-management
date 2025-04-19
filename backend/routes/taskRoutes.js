const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

/**
 * @fileOverview Task routes.
 * @module routes/taskRoutes
 */

// Get all tasks
router.get("/", taskController.getTasks);

// Get a single task
router.get("/:id", taskController.getTask);

// Create a new task
router.post("/", taskController.createTask);

// Update a task
router.put("/:id", taskController.updateTask);

// Delete a task
router.delete("/:id", taskController.deleteTask);

// Get task statistics
router.get("/stats", taskController.getTaskStats);

module.exports = router;
