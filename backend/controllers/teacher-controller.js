const Teacher = require("../models/teacherSchema.js");
const bcrypt = require("bcrypt");

function mapTeacherFiles(req, teacherData) {
  // Handle single photo and digitalSignature
  if (req.files && req.files["photo"]) {
    teacherData.photo = req.files["photo"][0].path;
  }
  if (req.files && req.files["digitalSignature"]) {
    teacherData.digitalSignature = req.files["digitalSignature"][0].path;
  }

  // Documents (initialize if not present)
  teacherData.documents = teacherData.documents || {};

  if (req.files) {
    // Single file documents
    ["resume", "idProof", "joiningLetter"].forEach((docField) => {
      if (req.files[`documents.${docField}`]) {
        teacherData.documents[docField] =
          req.files[`documents.${docField}`][0].path;
      }
    });
    // Multiple file documents
    ["qualificationCertificates", "experienceLetters"].forEach((docField) => {
      if (req.files[`documents.${docField}`]) {
        teacherData.documents[docField] = req.files[
          `documents.${docField}`
        ].map((file) => file.path);
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

    // ✅ Validate schoolId
    // if (!teacherData.schoolId) {
    //   return res.status(400).json({ error: "schoolId is required" });
    // }

    // Parse nested JSON fields if sent as strings from frontend
    ["emergencyContact", "salaryBreakup", "leaveBalance", "documents"].forEach(
      (field) => {
        try {
          if (teacherData[field] && typeof teacherData[field] === "string") {
            teacherData[field] = JSON.parse(teacherData[field]);
          }
        } catch (err) {
          console.warn(`Invalid JSON for ${field}, skipping parse.`);
        }
      }
    );

    // Parse arrays
    ["subjects", "classesAssigned"].forEach((field) => {
      try {
        if (teacherData[field] && typeof teacherData[field] === "string") {
          {
            teacherData[field] = JSON.parse(teacherData[field]);
          }
        }
      } catch (err) {
        console.warn(`Invalid JSON for ${field}, skipping parse.`);
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

    const teacher = await Teacher.findOne({ email })
      .populate("classesAssigned", "sclassName")
      .populate("subjects", "subjectName");

    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    const valid = await bcrypt.compare(password, teacher.password);
    if (!valid) return res.status(401).json({ message: "Invalid password" });

    // Return teacher data safely
    const response = {
      _id: teacher._id,
      name: teacher.fullName,
      email: teacher.email,
      role: "Teacher",
      // school: teacher.schoolId,  // Include schoolId here
      classesAssigned: teacher.classesAssigned || [],
      subjects: teacher.subjects || [],
      teachSclass: teacher.classesAssigned[0] || null,
      teachSubject: teacher.subjects[0] || null,
    };

    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTeacherDetail = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id)
      .populate("subjects")
      .populate("classesAssigned")
      .populate("remarksOnStudents.student");
    if (!teacher) return res.status(404).json({ error: "Teacher not found" });
    teacher.password = undefined;
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find()
      .populate("subjects")
      .populate("classesAssigned");

    res.status(200).json(teachers);
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
    ["emergencyContact", "salaryBreakup", "leaveBalance", "documents"].forEach(
      (field) => {
        if (updateData[field] && typeof updateData[field] === "string") {
          updateData[field] = JSON.parse(updateData[field]);
        }
      }
    );
    ["subjects", "classesAssigned"].forEach((field) => {
      if (updateData[field] && typeof updateData[field] === "string") {
        updateData[field] = JSON.parse(updateData[field]);
      }
    });

    // Map file uploads to updateData
    mapTeacherFiles(req, updateData);

    const teacher = await Teacher.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
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
// exports.deleteTeacher = async (req, res) => {
//   res.json({ message: "deleteTeacher endpoint hit" });
// };
exports.deleteTeacher = async (req, res) => {
  try {
    const teacherId = req.params.id;

    if (!teacherId) {
      return res.status(400).json({ message: "Teacher ID is required" });
    }

    const deletedTeacher = await Teacher.findByIdAndDelete(teacherId);

    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (err) {
    console.error("Delete Teacher Error:", err);
    res.status(500).json({ error: "Failed to delete teacher" });
  }
};

exports.updateTeacherSubject = async (req, res) => {
  try {
    const { teacherId, subjects } = req.body;

    if (!teacherId || !subjects) {
      return res
        .status(400)
        .json({ error: "teacherId and subjects are required" });
    }

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    // Get the Subject model
    const Subject = require("../models/subjectSchema.js");

    // multiple subject assignment
    const subjectsToAdd = Array.isArray(subjects) ? subjects : [subjects];

    // Update teacher's subjects array
    subjectsToAdd.forEach((sub) => {
      if (!teacher.subjects.includes(sub)) {
        teacher.subjects.push(sub);
      }
    });

    // Update the teacher field in Subject model
    await Subject.updateMany(
      { _id: { $in: subjectsToAdd } },
      { teacher: teacherId }
    );

    await teacher.save();
    const updatedTeacher = await Teacher.findById(teacherId)
      .populate("classesAssigned", "sclassName")
      .populate("subjects", "subName subCode");

    res.status(200).json({
      message: "Subject assigned to teacher successfully.",
      teacher: updatedTeacher,
    });
  } catch (err) {
    console.error("Update Teacher Subject Error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.teacherAttendance = async (req, res) => {
  res.json({ message: "teacherAttendance endpoint hit" });
};

exports.assignTeacherClass = async (req, res) => {
  try {
    const { teacherId, classId } = req.body;

    if (!teacherId || !classId) {
      return res
        .status(400)
        .json({ error: "teacherId and classId are required." });
    }

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found." });
    }

    // Update classesAssigned field
    if (!teacher.classesAssigned.includes(classId)) {
      teacher.classesAssigned.push(classId);
    }

    await teacher.save();

    const updatedTeacher = await Teacher.findById(teacherId)
      .populate("classesAssigned", "sclassName")
      .populate("subjects", "subName subCode");

    res.status(200).json({
      message: "Class assigned to teacher successfully.",
      teacher: updatedTeacher,
    });
  } catch (err) {
    console.error("Assign Teacher Class Error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.removeTeacherClass = async (req, res) => {
  try {
    const { teacherId, classId } = req.body;

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) return res.status(404).json({ error: "Teacher not found." });

    teacher.classesAssigned = teacher.classesAssigned.filter(id => id.toString() !== classId);
    await teacher.save();

    const updatedTeacher = await Teacher.findById(teacherId)
      .populate('classesAssigned', 'sclassName')
      .populate('subjects', 'subName subCode');

    res.status(200).json({ message: "Class removed.", teacher: updatedTeacher });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeTeacherSubject = async (req, res) => {
  try {
    const { teacherId, subjectId } = req.body;

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) return res.status(404).json({ error: "Teacher not found." });

    teacher.subjects = teacher.subjects.filter(id => id.toString() !== subjectId);
    await teacher.save();

    // Get the Subject model and remove teacher reference
    const Subject = require("../models/subjectSchema.js");
    await Subject.findByIdAndUpdate(subjectId, { $unset: { teacher: "" } });

    const updatedTeacher = await Teacher.findById(teacherId)
      .populate('classesAssigned', 'sclassName')
      .populate('subjects', 'subName subCode');

    res.status(200).json({ message: "Subject removed.", teacher: updatedTeacher });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get teacher's class-subject assignments
exports.getTeacherClassSubjects = async (req, res) => {
  try {
    const { teacherId } = req.params;

    if (!teacherId) {
      return res.status(400).json({ error: "Teacher ID is required" });
    }

    const teacher = await Teacher.findById(teacherId)
      .populate("classesAssigned", "sclassName")
      .populate("subjects", "subName subCode");

    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    // Get the Subject model
    const Subject = require("../models/subjectSchema.js");

    // Sync existing assignments if needed
    if (teacher.subjects.length > 0) {
      await Subject.updateMany(
        { _id: { $in: teacher.subjects.map(sub => sub._id) } },
        { teacher: teacherId }
      );
    }

    // Find subjects assigned to this teacher
    const assignedSubjects = await Subject.find({ teacher: teacherId })
      .populate("sclassName", "sclassName")
      .populate("teacher", "name");

    // Group subjects by class
    const classSubjectMap = {};

    assignedSubjects.forEach(subject => {
      const className = subject.sclassName.sclassName;
      if (!classSubjectMap[className]) {
        classSubjectMap[className] = [];
      }
      classSubjectMap[className].push({
        _id: subject._id,
        subName: subject.subName,
        subCode: subject.subCode
      });
    });

    // Create response with class-subject assignments
    const classAssignments = teacher.classesAssigned.map(cls => ({
      class: {
        _id: cls._id,
        sclassName: cls.sclassName
      },
      subjects: classSubjectMap[cls.sclassName] || []
    }));

    res.status(200).json({
      teacher: {
        _id: teacher._id,
        name: teacher.fullName,
        email: teacher.email
      },
      classAssignments,
      allSubjects: teacher.subjects
    });
  } catch (err) {
    console.error("Get Teacher Class Subjects Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Sync all teacher-subject assignments (for fixing existing data)
exports.syncTeacherSubjectAssignments = async (req, res) => {
  try {
    const Subject = require("../models/subjectSchema.js");

    // Get all teachers with their subjects
    const teachers = await Teacher.find().populate("subjects");

    let updatedCount = 0;

    for (const teacher of teachers) {
      if (teacher.subjects.length > 0) {
        // Update subjects to point to this teacher
        const result = await Subject.updateMany(
          { _id: { $in: teacher.subjects.map(sub => sub._id) } },
          { teacher: teacher._id }
        );
        updatedCount += result.modifiedCount;
      }
    }

    res.status(200).json({
      message: `Synced ${updatedCount} subject assignments for ${teachers.length} teachers`,
      updatedCount,
      teacherCount: teachers.length
    });
  } catch (err) {
    console.error("Sync Teacher Subject Assignments Error:", err);
    res.status(500).json({ error: err.message });
  }
};