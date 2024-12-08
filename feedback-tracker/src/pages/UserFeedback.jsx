import { useState } from "react";

const UserFeedback = ({ onSubmitFeedback }) => {
  const [type, setType] = useState(""); // Feedback type
  const [message, setMessage] = useState(""); // Feedback message
  const [isSubmitted, setIsSubmitted] = useState(false); // Submission status

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type && message) {
      onSubmitFeedback({ type, message, status: "Open" });
      setType("");
      setMessage("");
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000); // Reset submission status
    }
  };

  return (
    <div className="feedback-container">
      <h1>User Feedback</h1>
      <p>We value your feedback! Please share your complaints, suggestions, or compliments below.</p>
      
      <form className="feedback-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="type">Feedback Type:</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">-- Select Type --</option>
            <option value="Complaint">Complaint</option>
            <option value="Suggestion">Suggestion</option>
            <option value="Compliment">Compliment</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="message">Your Message:</label>
          <textarea
            id="message"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your feedback here..."
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="btn-submit"
          disabled={!type || !message}
        >
          Submit Feedback
        </button>
      </form>

      {isSubmitted && (
        <div className="feedback-success">
          Thank you for your feedback! It has been successfully submitted.
        </div>
      )}
    </div>
  );
};

export default UserFeedback;
