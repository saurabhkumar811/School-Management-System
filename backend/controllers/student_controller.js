const Student = require('../models/studentSchema.js');
const bcrypt = require('bcrypt');
const Sclass = require('../models/sclassSchema.js');

// Student Registration
exports.studentRegister = async (req, res) => {
  try {
    console.log("📥 Incoming Form Data:", req.body);

    // if (req.body.parentDetails && typeof req.body.parentDetails === "string") {
    //   req.body.parentDetails = JSON.parse(req.body.parentDetails);
    // }
    const parentDetails = {};
for (const key in req.body) {
  if (key.startsWith("parentDetails.")) {
    const field = key.split(".")[1];
    parentDetails[field] = req.body[key];
  }
}

    const classDoc = await Sclass.findById(req.body.class);
    if (!classDoc) {
      return res.status(400).json({ message: "Invalid class ID" });
    }

    // Hash the password before saving!
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    // const studentData = {
    //   ...req.body,
    //   photo: req.file ? req.file.path.replace(/\\/g, "/") : null
    // };
     const studentData = {
  ...req.body,
  parentDetails, // 👈 override the flat parentDetails with nested object
  photo: req.file ? req.file.path.replace(/\\/g, "/") : null
};

    const student = new Student(studentData);
    await student.save();

    console.log("✅ Student registered successfully");
    // Never send password back
    student.password = undefined;
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

// Student Login using roll and password (matching frontend)
exports.studentLogIn = async (req, res) => {
  try {
    const { roll, password } = req.body; // Use 'roll' (or 'rollNumber') field
    // Adjust field name as per studentSchema.js (replace 'roll' with 'rollNumber' if different)
    const student = await Student.findOne({ roll }); 
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
  const adminId = req.params.id;
  const {classId} = req.query;
  console.log("class ID : ",classId);
  console.log("Admin ID : ",adminId);
  try {
    // 🔍 Build filter
    const classFilter = { school: adminId };
    if (classId) classFilter._id = classId;

    // 🎯 Find matching classes for that admin
    const classes = await Sclass.find(classFilter).select('_id');
    const classIds = classes.map(cls => cls._id);

    // 🧠 Now find students in those classes
    const students = await Student.find({ class: { $in: classIds } })
      .populate({
        path: 'class',
        select: 'sclassName school',
        populate: {
          path: 'school',
          model: 'admin', // 👈 use your actual Admin model name
          select: 'name email' // or whatever admin info you want
        }
      })
      .select('-password');
      console.log(students);
    res.status(200).json(students);
  } catch (error) {
    console.error("❌ Error in getStudents:", error);
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

exports.getStudentCount = async (req, res) => {
  try {
    const count = await Student.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    console.error("❌ Error getting student count:", err);
    res.status(500).json({ message: "Failed to get student count", error: err.message });
  }
};
