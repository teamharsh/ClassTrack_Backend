const Student = require('../models/studentModel');
const Class = require('../models/classModel');

// Add a student to a class
exports.addStudent = async (req, res) => {
  const { name, rollNumber } = req.body;
  const { classId } = req.params;

  try {
    const newStudent = await Student.create({
      name,
      rollNumber,
      class: classId,
    });

    // Add student to the class
    const classObj = await Class.findById(classId);
    classObj.students.push(newStudent._id);
    await classObj.save();

    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: 'Error adding student', error });
  }
};

// Get all students in a class
exports.getStudentsInClass = async (req, res) => {
  const { classId } = req.params;

  try {
    const students = await Student.find({ class: classId });
    res.json(students);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching students', error });
  }
};
