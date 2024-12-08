const FeedbackList = ({ feedbacks, updateStatus }) => (
    <div>
      <h3>Feedback List</h3>
      {feedbacks.length > 0 ? (
        feedbacks.map((feedback) => (
          <div key={feedback.id} className="feedback-item">
            <p><strong>Type:</strong> {feedback.type}</p>
            <p><strong>Message:</strong> {feedback.message}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={`status ${feedback.status}`}>
                {feedback.status}
              </span>
            </p>
            {feedback.status !== "Closed" && (
              <button onClick={() => updateStatus(feedback.id, "Resolved")}>
                Mark as Resolved
              </button>
            )}
          </div>
        ))
      ) : (
        <p>No feedback available.</p>
      )}
    </div>
  );
  
  export default FeedbackList;
  