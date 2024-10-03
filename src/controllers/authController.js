const Teacher = require('../models/teacherModel');
const jwt = require('jsonwebtoken');

// Register a new teacher
exports.registerTeacher = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const teacher = await Teacher.create({ name, email, password });

    const token = jwt.sign({ id: teacher._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: 'Error registering teacher', error });
  }
};

// Login a teacher
exports.loginTeacher = async (req, res) => {
  const { email, password } = req.body;

  try {
    const teacher = await Teacher.findOne({ email });

    if (!teacher || !(await teacher.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: teacher._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: 'Error logging in teacher', error });
  }
};
