const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// === TEACHER UPLOAD SETUP ===
const teacherStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/teachers/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const teacherUpload = multer({ storage: teacherStorage });

// === STUDENT UPLOAD SETUP ===
const studentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/students/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const studentUpload = multer({ storage: studentStorage });

// ===== CONTROLLERS =====

// ---- Admin
const {
  adminRegister,
  adminLogIn,
  getAdminDetail
} = require('../controllers/admin-controller.js');

// ---- Sclass
const {
  sclassCreate,
  sclassList,
  deleteSclass,
  deleteSclasses,
  getSclassDetail,
  getSclassStudents
} = require('../controllers/class-controller.js');

// ---- Complain
const { complainCreate, complainList } = require('../controllers/complain-controller.js');

// ---- Notice
const {
  noticeCreate,
  noticeList,
  deleteNotices,
  deleteNotice,
  updateNotice
} = require('../controllers/notice-controller.js');

// ---- Student ---
// USE THE ACTUAL FILENAME of your edited student controller below:
const {
  studentRegister,
  studentLogIn,
  getStudents,
  getStudentDetail,
  deleteStudents,
  deleteStudent,
  updateStudent,
  studentAttendance,
  deleteStudentsByClass,
  updateExamResult,
  clearAllStudentsAttendanceBySubject,
  clearAllStudentsAttendance,
  removeStudentAttendanceBySubject,
  removeStudentAttendance,
  getStudentCount
} = require('../controllers/student_controller.js');

// ---- Subject
const {
  subjectCreate,
  classSubjects,
  deleteSubjectsByClass,
  getSubjectDetail,
  deleteSubject,
  freeSubjectList,
  allSubjects,
  deleteSubjects
} = require('../controllers/subject-controller.js');

// ---- Teacher
const {
  teacherRegister,
  teacherLogIn,
  getTeachers,
  getTeacherDetail,
  deleteTeachers,
  deleteTeachersByClass,
  deleteTeacher,
  updateTeacherSubject,
  updateTeacher,
  teacherAttendance,
  assignTeacherClass,
  removeTeacherClass,
  removeTeacherSubject,
  getTeacherClassSubjects,
  syncTeacherSubjectAssignments
} = require('../controllers/teacher-controller.js');

// ========== ROUTES ==========

// Admin
router.post('/AdminReg', adminRegister);
router.post('/AdminLogin', adminLogIn);
router.get("/Admin/:id", getAdminDetail);

// Student
router.post('/StudentReg', studentUpload.single('photo'), studentRegister);
router.post('/StudentLogin', studentLogIn);
router.get("/Students/:id", getStudents);
router.get("/Student/:id", getStudentDetail);
router.delete("/Students/:id", deleteStudents);
router.delete("/StudentsClass/:id", deleteStudentsByClass);
router.delete("/Student/:id", deleteStudent);
router.put("/Student/:id", studentUpload.single('photo'), updateStudent);
router.put('/UpdateExamResult/:id', updateExamResult);
router.put('/StudentAttendance/:id', studentAttendance);
router.put('/RemoveAllStudentsSubAtten/:id', clearAllStudentsAttendanceBySubject);
router.put('/RemoveAllStudentsAtten/:id', clearAllStudentsAttendance);
router.put('/RemoveStudentSubAtten/:id', removeStudentAttendanceBySubject);
router.put('/RemoveStudentAtten/:id', removeStudentAttendance);

// Teacher
router.post(
  '/TeacherReg',
  teacherUpload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'digitalSignature', maxCount: 1 },
    { name: 'documents.resume', maxCount: 1 },
    { name: 'documents.idProof', maxCount: 1 },
    { name: 'documents.joiningLetter', maxCount: 1 },
    { name: 'documents.qualificationCertificates', maxCount: 10 },
    { name: 'documents.experienceLetters', maxCount: 10 }
  ]),
  teacherRegister
);
router.post('/TeacherLogin', teacherLogIn);
router.get("/Teachers/:id", getTeachers);
router.get("/Teachers", getTeachers);
router.get("/Teacher/:id", getTeacherDetail);
router.get("/TeacherClassSubjects/:teacherId", getTeacherClassSubjects);
router.post("/SyncTeacherSubjects", syncTeacherSubjectAssignments);
router.delete("/Teachers/:id", deleteTeachers);
router.delete("/TeachersClass/:id", deleteTeachersByClass);
router.delete("/Teacher/:id", deleteTeacher);
router.put("/TeacherSubject", updateTeacherSubject);
router.put('/TeacherAssignClass', assignTeacherClass);
router.put('/RemoveTeacherClass', removeTeacherClass);
router.put('/RemoveTeacherSubject', removeTeacherSubject);

router.put(
  '/Teacher/:id',
  teacherUpload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'digitalSignature', maxCount: 1 },
    { name: 'documents.resume', maxCount: 1 },
    { name: 'documents.idProof', maxCount: 1 },
    { name: 'documents.joiningLetter', maxCount: 1 },
    { name: 'documents.qualificationCertificates', maxCount: 10 },
    { name: 'documents.experienceLetters', maxCount: 10 }
  ]),
  updateTeacher
);
router.post('/TeacherAttendance/:id', teacherAttendance);

// Notice
router.post('/NoticeCreate', noticeCreate);
router.get('/NoticeList/:id', noticeList);
router.delete("/Notices/:id", deleteNotices);
router.delete("/Notice/:id", deleteNotice);
router.put("/Notice/:id", updateNotice);

// Complain
router.post('/ComplainCreate', complainCreate);
router.get('/ComplainList/:id', complainList);

// Sclass
router.post('/SclassCreate', sclassCreate);
router.get('/SclassList/:id', sclassList);
router.get("/Sclass/:id", getSclassDetail);
router.get("/Sclass/Students/:id", getSclassStudents);
router.delete("/Sclasses/:id", deleteSclasses);
router.delete("/Sclass/:id", deleteSclass);

// Subject
router.post('/SubjectCreate', subjectCreate);
router.get('/AllSubjects/:id', allSubjects);
router.get('/ClassSubjects/:id', classSubjects);
router.get('/FreeSubjectList/:id', freeSubjectList);
router.get("/Subject/:id", getSubjectDetail);
router.delete("/Subject/:id", deleteSubject);
router.delete("/Subjects/:id", deleteSubjects);
router.delete("/SubjectsClass/:id", deleteSubjectsByClass);
module.exports = router;
