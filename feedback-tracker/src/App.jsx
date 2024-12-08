import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import UserFeedback from "./pages/UserFeedback";
import { useState, useEffect } from "react";
import { feedbackData } from "./data/feedbackData";
import ManageFeedback from "./pages/ManageFeedback";
import AdminConfirmationPopup from "./components/AdminConfirmationPopup";
import AdminLoginPopup from "./components/AdminLoginPopup";
import Slider from "react-slick"; // Import slider component
import "./styles.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  const [feedbacks, setFeedbacks] = useState(feedbackData);
  const [showAdminConfirmation, setShowAdminConfirmation] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/admin") {
      setStartTime(new Date());
    }
  }, [location.pathname]);

  const handleFeedbackSubmission = (newFeedback) => {
    setFeedbacks((prevFeedbacks) => [
      ...prevFeedbacks,
      { id: prevFeedbacks.length + 1, ...newFeedback },
    ]);
  };

  const handleAdminLinkClick = () => {
    if (location.pathname !== "/admin") {
      setShowAdminConfirmation(true);
    }
  };

  const handleAdminConfirmation = (isAdmin) => {
    setShowAdminConfirmation(false);
    if (isAdmin) {
      setShowAdminLogin(true);
    }
  };

  const handleAdminLoginClose = () => {
    setShowAdminLogin(false);
  };

  const handleLogout = async () => {
    const sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      alert("No active session found.");
      return;
    }

    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;

    const endTime = new Date();
    const timeSpentInMinutes = Math.floor((endTime - startTime) / 60000);

    try {
      const response = await fetch("http://localhost:5000/api/admin/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, timeSpentInMinutes }),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.message || "An error occurred during logout.");
      } else {
        alert(`Logged out successfully. Time spent: ${timeSpentInMinutes} minutes.`);
        localStorage.removeItem("sessionId");
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while logging out.");
    }
  };

  // Slider settings with autoplay
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, // Enable automatic sliding
    autoplaySpeed: 3000, // Slide every 3 seconds
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/feedback">Submit Feedback</Link>
        <span onClick={handleAdminLinkClick} style={{ cursor: "pointer" }}>
          Admin Dashboard
        </span>
        {location.pathname === "/admin" && (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>

      {showAdminConfirmation && (
        <AdminConfirmationPopup onConfirm={handleAdminConfirmation} />
      )}
      {showAdminLogin && <AdminLoginPopup onClose={handleAdminLoginClose} />}

      <Routes>
        <Route
          path="/feedback"
          element={<UserFeedback onSubmitFeedback={handleFeedbackSubmission} />}
        />
        <Route
          path="/admin"
          element={
            <AdminDashboard feedbacks={feedbacks} setFeedbacks={setFeedbacks} />
          }
        />
        <Route
          path="/"
          element={
            <div className="home-page">
              <section className="hero">
                <div className="hero-content">
                  <h1>Welcome to the Feedback Hub!</h1>
                  <p>
                    We believe in the power of your feedback to drive positive
                    change. Help us improve by sharing your thoughts!
                  </p>
                  <Link to="/feedback" className="cta-button">
                    Share Your Feedback
                  </Link>
                </div>
              </section>

              {/* About Us Section */}
              <section className="about-us">
                <h2>About Us</h2>
                <p>
                  At Feedback Hub, we value every piece of feedback. Our goal is to create a community where voices are heard and improvements are made based on your thoughts and ideas. Join us in shaping a better future with your valuable input.
                </p>
              </section>

              {/* Featured Feedback Section */}
              <section className="featured-feedback">
                <h2>Featured Feedback</h2>
                <Slider {...sliderSettings}>
                  {feedbacks.map((feedback) => (
                    <div className="feedback-card" key={feedback.id}>
                      <blockquote className="feedback-message">
                        "{feedback.message}"
                      </blockquote>
                      <p className="feedback-author">— {feedback.name}</p>
                    </div>
                  ))}
                </Slider>
              </section>

              <section className="call-to-action">
                <h2>Your Feedback Drives Us</h2>
                <p>Every piece of feedback helps us grow. Share yours today!</p>
                <Link to="/feedback" className="cta-button">
                  Submit Your Thoughts
                </Link>
              </section>
            </div>
          }
        />
        <Route path="/manage-feedback" element={<ManageFeedback />} />
      </Routes>
    </>
  );
};

export default App;
