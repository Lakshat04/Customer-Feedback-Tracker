import React, { useState } from "react";

const FeedbackForm = ({ addFeedback }) => {
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Only submit if the type and message are filled
    if (type && message) {
      addFeedback({ type, message });
      setType(""); // Reset the type field
      setMessage(""); // Reset the message field
    }
  };

  return (
    <div className="feedback-form">
      <h3>Submit Feedback</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="type">Feedback Type</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">Select Type</option>
            <option value="Complaint">Complaint</option>
            <option value="Suggestion">Suggestion</option>
            <option value="Compliment">Compliment</option>
          </select>
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
