const Class = require('../models/classModel');
const Student = require('../models/studentModel');

// Create a new class
exports.createClass = async (req, res) => {
  const { className } = req.body;
  const teacherId = req.user.id; // Assuming JWT middleware adds the user ID to req.user

  try {
    const newClass = await Class.create({
      className,
      teacher: teacherId,
    });

    res.status(201).json(newClass);
  } catch (error) {
    res.status(400).json({ message: 'Error creating class', error });
  }
};

// Get all classes for the logged-in teacher
exports.getClasses = async (req, res) => {
  const teacherId = req.user.id;

  try {
    const classes = await Class.find({ teacher: teacherId }).populate('students');
    res.json(classes);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching classes', error });
  }
};
