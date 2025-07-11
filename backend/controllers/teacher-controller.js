const Teacher = require('../models/teacherSchema.js');
const bcrypt = require('bcrypt');

exports.teacherRegister = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const teacher = new Teacher({
      ...req.body,
      password: hashedPassword,
      photo: req.file ? req.file.path : undefined
    });
    const result = await teacher.save();
    result.password = undefined;
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.teacherLogIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const teacher = await Teacher.findOne({ email });
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    const valid = await bcrypt.compare(password, teacher.password);
    if (!valid) return res.status(401).json({ message: "Invalid password" });
    teacher.password = undefined;
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTeacherDetail = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id)
      .populate('subjects')
      .populate('classesAssigned')
      .populate('remarksOnStudents.student');
    if (!teacher) return res.status(404).json({ error: 'Teacher not found' });
    teacher.password = undefined;
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().select('-password');
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTeacher = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.body.password) {
      updateData.password = await bcrypt.hash(req.body.password, 10);
    }
    if (req.file) {
      updateData.photo = req.file.path;
    }
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (teacher) teacher.password = undefined;
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTeachers = async (req, res) => {
  res.json({ message: "deleteTeachers endpoint hit" });
};
exports.deleteTeachersByClass = async (req, res) => {
  res.json({ message: "deleteTeachersByClass endpoint hit" });
};
exports.deleteTeacher = async (req, res) => {
  res.json({ message: "deleteTeacher endpoint hit" });
};
exports.updateTeacherSubject = async (req, res) => {
  res.json({ message: "updateTeacherSubject endpoint hit" });
};
exports.teacherAttendance = async (req, res) => {
  res.json({ message: "teacherAttendance endpoint hit" });
};
