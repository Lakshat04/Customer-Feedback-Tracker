const express = require('express');
const router = express.Router();
const { signUpAdmin, signInAdmin, logoutAdmin } = require('../controllers/adminController');

// Admin Routes
router.post('/signup', signUpAdmin);
router.post('/signin', signInAdmin);
router.post('/logout', logoutAdmin);

module.exports = router;
