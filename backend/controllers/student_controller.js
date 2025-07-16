const Student = require('../models/studentSchema.js');
const bcrypt = require('bcrypt');

exports.studentRegister = async (req, res) => {
  try {
    console.log("📥 Incoming Form Data:", req.body);
    console.log("📸 File:", req.file);

    // ✅ 1. Parse JSON strings (like parentDetails)
    if (req.body.parentDetails && typeof req.body.parentDetails === "string") {
      req.body.parentDetails = JSON.parse(req.body.parentDetails);
    }

    // ✅ 2. Optional: Parse  other nested objects if added in future (marks, health, etc.)

    // ✅ 3. Set photo path
    const studentData = {
      ...req.body,
      photo: req.file ? req.file.path.replace(/\\/g, "/") : null // fix for Windows path
    };

    // ✅ 4. Create and save student
    const student = new Student(studentData);
    await student.save();

    console.log("✅ Student registered successfully");
    res.status(201).json({ message: "Student registered successfully", student });

  } catch (err) {
    console.error("❌ Error registering student:", err);
    res.status(500).json({
      message: "Failed to register student",
      error: err.message,
      stack: err.stack
    });
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

// exports.getStudents = async (req, res) => {
//   try {
//     const students = await Student.find().select('-password');
//     res.json(students);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
exports.getStudents = async (req, res) => {
  const adminId = req.params.id;
  const { classId } = req.query;

  try {
    const filter = { admin: adminId };
    if (classId) {
      filter.sclassName = classId;
    }

    const students = await Student.find(filter)
      .populate('sclassName')
      .populate('school')
      .select('-password'); // optional, to hide password field

    res.status(200).json(students);
  } catch (error) {
    console.error("Error in getStudents:", error);
    res.status(500).json({ error: "Failed to fetch students" });
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
