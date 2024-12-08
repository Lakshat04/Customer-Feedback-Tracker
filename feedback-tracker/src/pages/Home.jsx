import { useState } from "react";
import { feedbackData } from "../data/feedbackData";
import FeedbackForm from "../components/FeedbackForm";
import FeedbackList from "../components/FeedbackList";
import StatusFilter from "../components/StatusFilter";

const Home = () => {
  const [feedbacks, setFeedbacks] = useState(feedbackData);
  const [filter, setFilter] = useState("");

  const addFeedback = (feedback) => {
    const newFeedback = { id: feedbacks.length + 1, ...feedback };
    setFeedbacks([...feedbacks, newFeedback]);
  };

  const updateStatus = (id, status) => {
    setFeedbacks(
      feedbacks.map((fb) =>
        fb.id === id ? { ...fb, status } : fb
      )
    );
  };

  const filteredFeedbacks = filter
    ? feedbacks.filter((fb) => fb.status === filter)
    : feedbacks;

  return (
    <div>
      <header className="home-header">
        <h1>Customer Feedback Tracker</h1>
        <p>Track and manage customer feedback efficiently. Submit new feedback or review existing feedback below.</p>
      </header>

      {/* Introduction Section */}
      <section className="home-introduction">
        <h2>About the Feedback Tracker</h2>
        <p>
          Our feedback tracker helps businesses keep track of customer reviews, complaints, and suggestions. 
          Use the form below to submit feedback, filter feedback by status, or manage feedback status updates.
        </p>
      </section>

      {/* Feedback Form */}
      <section className="feedback-form-section">
        <h2>Submit Feedback</h2>
        <FeedbackForm addFeedback={addFeedback} />
      </section>

      {/* Filter and Feedback List */}
      <section className="feedback-list-section">
        <h2>Feedback List</h2>
        <StatusFilter setFilter={setFilter} />
        <FeedbackList feedbacks={filteredFeedbacks} updateStatus={updateStatus} />
      </section>
    </div>
  );
};

export default Home;
