const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  type: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: "Open" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
