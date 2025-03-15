// server/routes/auditLogRoutes.js
const express = require("express");
const router = express.Router();
const auditService = require("../services/auditService");

// Get audit logs with filtering and pagination
router.get("/", async (req, res) => {
  try {
    const { userId, action, resourceType, startDate, endDate, page, limit } = req.query;
    
    const options = {
      userId,
      action,
      resourceType,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 10
    };
    
    const result = await auditService.getLogs(options);
    res.json(result);
  } catch (error) {
    console.error("Error getting audit logs:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;