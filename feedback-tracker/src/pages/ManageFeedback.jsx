import React, { useState } from "react";
import { feedbackData } from "../data/feedbackData"; // assuming feedbackData is available

const ManageFeedback = () => {
  const [feedbacks, setFeedbacks] = useState(feedbackData);

  // Update feedback status
  const updateStatus = (id, status) => {
    setFeedbacks(
      feedbacks.map((fb) => (fb.id === id ? { ...fb, status } : fb))
    );
  };

  return (
    <div className="manage-feedback-page">
      <h1>Manage Feedback</h1>
      <p>This page will allow admins to manage feedback in detail.</p>

      {/* Feedback Management Section */}
      <div className="manage-feedback">
        <h3>Feedback List</h3>
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback) => (
            <div key={feedback.id} className="feedback-item">
              <p>
                <strong>Type:</strong> {feedback.type}
              </p>
              <p>
                <strong>Message:</strong> {feedback.message}
              </p>
              <p>
                <strong>Status:</strong> {feedback.status}
              </p>
              {feedback.status !== "Closed" && (
                <button
                  onClick={() => updateStatus(feedback.id, "Closed")}
                  className="btn-close"
                >
                  Mark as Closed
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No feedback available.</p>
        )}
      </div>
    </div>
  );
};

export default ManageFeedback;
