const AuditLog = require("../models/AuditLog")

/**
 * Create an audit log entry
 * @param {Object} logData - The audit log data
 * @param {string} logData.userId - The ID of the user performing the action
 * @param {string} logData.action - The action performed (login, logout, create, update, delete, view)
 * @param {string} logData.resourceType - The type of resource (user, task, setting)
 * @param {string} [logData.resourceId] - The ID of the resource
 * @param {Object} [logData.details] - Additional details about the action
 * @param {string} [logData.ipAddress] - The IP address of the user
 * @param {string} [logData.userAgent] - The user agent of the user
 * @returns {Promise<Object>} The created audit log
 */
exports.createLog = async (logData) => {
  try {
    const auditLog = new AuditLog(logData)
    await auditLog.save()
    return auditLog
  } catch (error) {
    console.error("Error creating audit log:", error)
    // Don't throw error to prevent affecting the main operation
  }
}

/**
 * Get audit logs with filtering and pagination
 * @param {Object} options - The options for filtering and pagination
 * @param {string} [options.userId] - Filter by user ID
 * @param {string} [options.action] - Filter by action type
 * @param {string} [options.resourceType] - Filter by resource type
 * @param {string} [options.resourceId] - Filter by resource ID
 * @param {Date} [options.startDate] - Filter by start date
 * @param {Date} [options.endDate] - Filter by end date
 * @param {number} [options.page=1] - The page number
 * @param {number} [options.limit=10] - The number of items per page
 * @returns {Promise<Object>} The audit logs and pagination info
 */
exports.getLogs = async (options = {}) => {
  try {
    const { userId, action, resourceType, resourceId, startDate, endDate, page = 1, limit = 10 } = options

    // Build query
    const query = {}
    if (userId) query.userId = userId
    if (action) query.action = action
    if (resourceType) query.resourceType = resourceType
    if (resourceId) query.resourceId = resourceId

    // Date range
    if (startDate || endDate) {
      query.timestamp = {}
      if (startDate) query.timestamp.$gte = startDate
      if (endDate) query.timestamp.$lte = endDate
    }

    // Calculate pagination
    const skip = (page - 1) * limit

    // Execute query with pagination
    const logs = await AuditLog.find(query)
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit)
      .populate("userId", "name email")

    // Get total count for pagination
    const total = await AuditLog.countDocuments(query)

    return {
      logs,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    }
  } catch (error) {
    console.error("Error getting audit logs:", error)
    throw error
  }
}

/**
 * Delete old audit logs
 * @param {number} days - Delete logs older than this many days
 * @returns {Promise<number>} The number of deleted logs
 */
exports.deleteOldLogs = async (days = 90) => {
  try {
    const date = new Date()
    date.setDate(date.getDate() - days)

    const result = await AuditLog.deleteMany({
      timestamp: { $lt: date },
    })

    return result.deletedCount
  } catch (error) {
    console.error("Error deleting old audit logs:", error)
    throw error
  }
}

