const mongoose = require("mongoose")

const auditLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  action: {
    type: String,
    required: true,
    enum: ["login", "logout", "create", "update", "delete", "view"],
  },
  resourceType: {
    type: String,
    required: true,
    enum: ["user", "task", "setting"],
  },
  resourceId: {
    type: String,
  },
  details: {
    type: Object,
  },
  ipAddress: {
    type: String,
  },
  userAgent: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
})

// Index for faster queries
auditLogSchema.index({ userId: 1, timestamp: -1 })
auditLogSchema.index({ action: 1, timestamp: -1 })
auditLogSchema.index({ resourceType: 1, resourceId: 1 })

module.exports = mongoose.model("AuditLog", auditLogSchema)

