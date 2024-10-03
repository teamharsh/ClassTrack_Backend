const express = require('express');
const router = express.Router();
const { registerTeacher, loginTeacher } = require('../controllers/authController');

// Register route
router.post('/register', registerTeacher);

// Login route
router.post('/login', loginTeacher);

module.exports = router;
