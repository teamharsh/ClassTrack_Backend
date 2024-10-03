const express = require('express');
const { addStudent, getStudentsInClass } = require('../controllers/studentController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/:classId', protect, addStudent);          // Add a student to a class
router.get('/:classId', protect, getStudentsInClass);   // Get all students in a class

module.exports = router;
