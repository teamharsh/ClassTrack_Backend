const express = require('express');
const { markAttendance, getAttendanceForDate } = require('../controllers/attendanceController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/:classId', protect, markAttendance);           // Mark attendance for a student
router.get('/:classId/:date', protect, getAttendanceForDate); // Get attendance for a specific date

module.exports = router;
