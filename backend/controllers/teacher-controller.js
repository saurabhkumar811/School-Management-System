const Teacher = require('../models/teacherSchema.js');
const bcrypt = require('bcrypt');

function mapTeacherFiles(req, teacherData) {
  // Handle single photo and digitalSignature
  if (req.files && req.files['photo']) {
    teacherData.photo = req.files['photo'][0].path;
  }
  if (req.files && req.files['digitalSignature']) {
    teacherData.digitalSignature = req.files['digitalSignature'][0].path;
  }

  // Documents (initialize if not present)
  teacherData.documents = teacherData.documents || {};

  if (req.files) {
    // Single file documents
    ['resume', 'idProof', 'joiningLetter'].forEach((docField) => {
      if (req.files[`documents.${docField}`]) {
        teacherData.documents[docField] = req.files[`documents.${docField}`][0].path;
      }
    });
    // Multiple file documents
    ['qualificationCertificates', 'experienceLetters'].forEach((docField) => {
      if (req.files[`documents.${docField}`]) {
        teacherData.documents[docField] = req.files[`documents.${docField}`].map(file => file.path);
      }
    });
  }
}

exports.teacherRegister = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const teacherData = {
      ...req.body,
      password: hashedPassword,
    };

    // Parse nested JSON fields if sent as strings from frontend
    ['emergencyContact', 'salaryBreakup', 'leaveBalance', 'documents'].forEach((field) => {
      if (teacherData[field] && typeof teacherData[field] === 'string') {
        teacherData[field] = JSON.parse(teacherData[field]);
      }
    });

    // Parse arrays
    ['subjects', 'classesAssigned'].forEach((field) => {
      if (teacherData[field] && typeof teacherData[field] === 'string') {
        teacherData[field] = JSON.parse(teacherData[field]);
      }
    });

    // Map file uploads to teacherData
    mapTeacherFiles(req, teacherData);

    const teacher = new Teacher(teacherData);
    const result = await teacher.save();
    result.password = undefined;
    res.status(201).json(result);
  } catch (err) {
    console.error("Teacher Register Error:", err);
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

    // Parse stringified nested fields from frontend
    ['emergencyContact', 'salaryBreakup', 'leaveBalance', 'documents'].forEach((field) => {
      if (updateData[field] && typeof updateData[field] === 'string') {
        updateData[field] = JSON.parse(updateData[field]);
      }
    });
    ['subjects', 'classesAssigned'].forEach((field) => {
      if (updateData[field] && typeof updateData[field] === 'string') {
        updateData[field] = JSON.parse(updateData[field]);
      }
    });

    // Map file uploads to updateData
    mapTeacherFiles(req, updateData);

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
