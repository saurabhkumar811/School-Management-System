const Student = require('../models/studentSchema.js');
const bcrypt = require('bcrypt');

exports.studentRegister = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const student = new Student({
      ...req.body,
      password: hashedPassword,
      photo: req.file ? req.file.path : undefined
    });
    const result = await student.save();
    result.password = undefined;
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.studentLogIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (!student) return res.status(404).json({ message: "Student not found" });
    const valid = await bcrypt.compare(password, student.password);
    if (!valid) return res.status(401).json({ message: "Invalid password" });
    student.password = undefined;
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStudentDetail = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('class')
      .populate('marks.subjects.subject');
    if (!student) return res.status(404).json({ error: 'Student not found' });
    student.password = undefined;
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().select('-password');
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.body.password) {
      updateData.password = await bcrypt.hash(req.body.password, 10);
    }
    if (req.file) {
      updateData.photo = req.file.path;
    }
    const student = await Student.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (student) student.password = undefined;
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Dummy implementations for missing functions
exports.deleteStudents = async (req, res) => {
  try {
    const result = await Student.deleteMany({ _id: req.params.id });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const result = await Student.findByIdAndDelete(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.studentAttendance = async (req, res) => {
  res.json({ message: "studentAttendance endpoint hit" });
};
exports.deleteStudentsByClass = async (req, res) => {
  res.json({ message: "deleteStudentsByClass endpoint hit" });
};
exports.updateExamResult = async (req, res) => {
  res.json({ message: "updateExamResult endpoint hit" });
};
exports.clearAllStudentsAttendanceBySubject = async (req, res) => {
  res.json({ message: "clearAllStudentsAttendanceBySubject endpoint hit" });
};
exports.clearAllStudentsAttendance = async (req, res) => {
  res.json({ message: "clearAllStudentsAttendance endpoint hit" });
};
exports.removeStudentAttendanceBySubject = async (req, res) => {
  res.json({ message: "removeStudentAttendanceBySubject endpoint hit" });
};
exports.removeStudentAttendance = async (req, res) => {
  res.json({ message: "removeStudentAttendance endpoint hit" });
};
