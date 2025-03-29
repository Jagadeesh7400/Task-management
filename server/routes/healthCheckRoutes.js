const express = require("express");
const router = express.Router();

// Health check endpoint
router.get("/health-check", (req, res) => {
  res.status(200).json({ message: "API is running" });
});

module.exports = router;
