const Task = require("../models/Task");
const User = require("../models/User");

/**
 * @fileOverview Task controller to manage tasks.
 * @module controllers/taskController
 */

/**
 * Get all tasks for the current user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({
      deadline: 1,
    });

    res.json(tasks);
  } catch (error) {
    console.error("Get tasks error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get a single task.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.error("Get task error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Create a new task.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
exports.createTask = async (req, res) => {
  try {
    const { title, description, deadline, isImportant } = req.body;

    const task = new Task({
      title,
      description,
      deadline,
      isImportant: isImportant || false,
      userId: req.user.id,
    });

    await task.save();

    res.status(201).json(task);
  } catch (error) {
    console.error("Create task error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Update a task.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
exports.updateTask = async (req, res) => {
  try {
    const { title, description, status, deadline, isImportant } = req.body;

    // Find task and check ownership
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Update fields
    if (title) task.title = title;
    if (description !== undefined) task.description = description;
    if (status) task.status = status;
    if (deadline) task.deadline = deadline;
    if (isImportant !== undefined) task.isImportant = isImportant;

    await task.save();

    res.json(task);
  } catch (error) {
    console.error("Update task error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Delete a task.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete task error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get task statistics.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
exports.getTaskStats = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments({ userId: req.user.id });
    const completedTasks = await Task.countDocuments({
      userId: req.user.id,
      status: "completed",
    });
    const pendingTasks = await Task.countDocuments({
      userId: req.user.id,
      status: "pending",
    });

    // Calculate overdue tasks
    const now = new Date();
    const overdueTasks = await Task.countDocuments({
      userId: req.user.id,
      status: "pending",
      deadline: { $lt: now },
    });

    res.json({
      total: totalTasks,
      completed: completedTasks,
      pending: pendingTasks,
      overdue: overdueTasks,
      completionRate:
        totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
    });
  } catch (error) {
    console.error("Get task stats error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
