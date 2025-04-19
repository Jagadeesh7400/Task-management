const AuditLog = require('../models/AuditLog');

/**
 * @fileOverview Audit service for managing audit logs.
 * @module services/auditService
 */

/**
 * Deletes audit logs older than the specified number of days.
 * @param {number} days - The number of days to retain logs.
 * @returns {Promise<number>} The number of deleted logs.
 */
exports.deleteOldLogs = async (days) => {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const result = await AuditLog.deleteMany({ timestamp: { $lt: cutoffDate } });
    return result.deletedCount || 0;
  } catch (error) {
    console.error('Error deleting old audit logs:', error);
    throw error;
  }
};
