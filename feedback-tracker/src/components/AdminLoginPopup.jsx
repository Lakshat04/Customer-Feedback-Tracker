import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLoginPopup.css";

const AdminLoginPopup = ({ onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Sign In and Sign Up
  const [adminDetails, setAdminDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isSignUp
      ? "http://localhost:5000/api/admin/signup"
      : "http://localhost:5000/api/admin/signin";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminDetails),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.message || "An error occurred");
      } else {
        alert(data.message);

        if (!isSignUp) {
          // Save session ID locally for tracking logout
          localStorage.setItem("sessionId", data.sessionId);

          onClose();
          navigate("/admin");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing your request.");
    }
  };

  const handleLogout = async () => {
    const sessionId = localStorage.getItem("sessionId");

    if (!sessionId) {
      alert("No active session found.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/admin/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.message || "An error occurred during logout.");
      } else {
        alert(`Logged out successfully. Time spent: ${data.totalTimeSpent}`);
        localStorage.removeItem("sessionId"); // Clear session ID
        navigate("/"); // Redirect to home
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while logging out.");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={adminDetails.name}
                onChange={handleChange}
                required
              />
            </label>
          )}
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={adminDetails.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={adminDetails.password}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
        </form>
        <div className="toggle-link">
          {isSignUp ? (
            <p>
              Already have an account?{" "}
              <button
                type="button"
                className="toggle-button"
                onClick={() => setIsSignUp(false)}
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              Are you a new user?{" "}
              <button
                type="button"
                className="toggle-button"
                onClick={() => setIsSignUp(true)}
              >
                Sign Up
              </button>
            </p>
          )}
        </div>
        <button className="close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default AdminLoginPopup;
