const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
