const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes"); // Import feedback routes

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
connectDB();

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/feedback", feedbackRoutes); // Add feedback route

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
