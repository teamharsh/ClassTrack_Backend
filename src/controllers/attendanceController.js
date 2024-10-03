const Attendance = require('../models/attendanceModel');
const Student = require('../models/studentModel');

// Mark attendance for a student
exports.markAttendance = async (req, res) => {
  const { studentId, status } = req.body;
  const { classId } = req.params;
  const date = new Date();

  try {
    const student = await Student.findById(studentId);

    if (!student || student.class.toString() !== classId) {
      return res.status(400).json({ message: 'Invalid student or class' });
    }

    const attendance = await Attendance.create({
      class: classId,
      student: studentId,
      date,
      status,
    });

    res.status(201).json(attendance);
  } catch (error) {
    res.status(400).json({ message: 'Error marking attendance', error });
  }
};

// Get attendance records for a class on a specific date
exports.getAttendanceForDate = async (req, res) => {
  const { classId, date } = req.params;

  try {
    const attendanceRecords = await Attendance.find({ class: classId, date: new Date(date) }).populate('student');
    res.json(attendanceRecords);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching attendance records', error });
  }
};
