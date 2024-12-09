// File: models/AdminSession.js
const mongoose = require("mongoose");

const adminSessionSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  adminName: {
    type: String,
    required: true,  // Make it required to store the name
  },
  loginTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  logoutTime: {
    type: Date,
  },
  totalTimeSpent: {
    type: Number, // Time spent in seconds
    default: 0,
  },
});

const AdminSession = mongoose.model("AdminSession", adminSessionSchema);

module.exports = AdminSession;
