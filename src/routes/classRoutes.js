const express = require('express');
const { createClass, getClasses } = require('../controllers/classController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', protect, createClass); // Create a class
router.get('/', protect, getClasses);   // Get all classes for a teacher

module.exports = router;
