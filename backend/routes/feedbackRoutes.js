const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback"); // Import the Feedback model

// @route POST /api/feedback
// @desc Submit user feedback
router.post("/", async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to submit feedback.", error: err.message });
  }
});

module.exports = router;
