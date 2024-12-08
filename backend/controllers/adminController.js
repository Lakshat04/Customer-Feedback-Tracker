// const Admin = require('../models/Admin');
// const AdminSession = require('../models/AdminSession');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// // Sign-Up Admin
// const signUpAdmin = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if admin already exists
//     const existingAdmin = await Admin.findOne({ email });
//     if (existingAdmin) {
//       return res.status(400).json({ message: 'Admin already exists.' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new admin
//     const newAdmin = new Admin({
//       name,
//       email,
//       password: hashedPassword,
//       createdAt: new Date(),
//     });

//     await newAdmin.save();

//     res.status(201).json({ message: 'Admin signed up successfully.' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Something went wrong.' });
//   }
// };

// // Sign-In Admin
// const signInAdmin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if admin exists
//     const admin = await Admin.findOne({ email });
//     if (!admin) {
//       return res.status(404).json({ message: 'Admin not found.' });
//     }

//     // Verify the password
//     const isPasswordValid = await bcrypt.compare(password, admin.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ message: 'Invalid credentials.' });
//     }

//     // Create a new session for the admin
//     const session = new AdminSession({
//       adminId: admin._id,
//     });
//     await session.save();

//     // Generate a token (optional)
//     const token = jwt.sign({ id: admin._id }, 'your_secret_key', { expiresIn: '1h' });

//     res.status(200).json({ message: 'Admin signed in successfully.', sessionId: session._id });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Something went wrong.' });
//   }
// };

// // Logout Admin
// const logoutAdmin = async (req, res) => {
//   try {
//     const { sessionId } = req.body;

//     if (!sessionId) {
//       return res.status(400).json({ message: 'Session ID is required.' });
//     }

//     // Find the session and update the logout time
//     const adminSession = await AdminSession.findByIdAndUpdate(
//       sessionId,
//       { logoutTime: new Date() },
//       { new: true }
//     );

//     if (!adminSession) {
//       return res.status(404).json({ message: 'Session not found.' });
//     }

//     const timeSpent = Math.abs(new Date(adminSession.logoutTime) - new Date(adminSession.loginTime)) / 1000; // Time in seconds
//     adminSession.totalTimeSpent = timeSpent;
//     await adminSession.save();

//     const totalTimeSpent = `${Math.floor(timeSpent / 60)} minutes`; // Convert to minutes

//     res.status(200).json({ message: 'Logged out successfully.', totalTimeSpent });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Something went wrong.' });
//   }
// };

// // Export controllers
// module.exports = { signUpAdmin, signInAdmin, logoutAdmin };
























const Admin = require('../models/Admin');
const AdminSession = require('../models/AdminSession');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Sign-Up Admin
const signUpAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    await newAdmin.save();

    res.status(201).json({ message: 'Admin signed up successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

// Sign-In Admin
const signInAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found.' });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Create a new session for the admin, including their name
    const newSession = new AdminSession({
      adminId: admin._id,
      adminName: admin.name,  // Store admin name in session
    });

    await newSession.save();

    // Generate a token (optional)
    const token = jwt.sign({ id: admin._id }, 'your_secret_key', { expiresIn: '1h' });

    res.status(200).json({
      message: 'Admin signed in successfully.',
      sessionId: newSession._id,
      token: token, // Optionally send the JWT token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

// Logout Admin
const logoutAdmin = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ message: 'Session ID is required.' });
    }

    // Find the session and update the logout time
    const adminSession = await AdminSession.findById(sessionId);
    if (!adminSession) {
      return res.status(404).json({ message: 'Session not found.' });
    }

    // Update the logout time
    adminSession.logoutTime = new Date();

    // Calculate total time spent (in seconds)
    const timeSpent = Math.abs(new Date(adminSession.logoutTime) - new Date(adminSession.loginTime)) / 1000;
    adminSession.totalTimeSpent = timeSpent;

    await adminSession.save();

    const totalTimeSpent = `${Math.floor(timeSpent / 60)} minutes`; // Convert to minutes

    res.status(200).json({
      message: 'Logged out successfully.',
      totalTimeSpent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

// Fetch session data with admin details (including the admin name)
const getSessionDetails = async (sessionId) => {
  try {
    const session = await AdminSession.findById(sessionId);
    if (!session) {
      throw new Error("Session not found");
    }

    console.log(`Admin: ${session.adminName}`);
    console.log(`Login Time: ${session.loginTime}`);
    console.log(`Logout Time: ${session.logoutTime}`);
    console.log(`Total Time Spent: ${session.totalTimeSpent} seconds`);

    return session;
  } catch (error) {
    console.error("Error fetching session details:", error);
  }
};

// Export controllers
module.exports = { signUpAdmin, signInAdmin, logoutAdmin, getSessionDetails };
