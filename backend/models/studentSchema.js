const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema({
  fatherName: String,
  fatherOccupation: String,
  fatherMobile: String,
  motherName: String,
  motherOccupation: String,
  motherMobile: String,
  guardianName: String,
  guardianRelation: String,
  guardianContact: String,
  guardianAddress: String
}, { _id: false });

const feeHistorySchema = new mongoose.Schema({
  date: Date,
  amountPaid: Number,
  mode: String,
  receipt: String
}, { _id: false });

const marksSchema = new mongoose.Schema({
  term: String,
  subjects: [{
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'subject' },
    marksObtained: Number,
    maxMarks: Number,
    grade: String,
    remarks: String
  }],
  total: Number,
  rank: Number,
  reportCard: String
}, { _id: false });

const documentUploadsSchema = new mongoose.Schema({
  birthCertificate: String,
  transferCertificate: String,
  previousReportCard: String,
  aadharCard: String,
  passportPhoto: String,
  medicalCertificate: String
}, { _id: false });

const healthSchema = new mongoose.Schema({
  height: Number,
  weight: Number,
  medicalConditions: [String],
  allergies: [String],
  emergencyContactPerson: String,
  emergencyContactNumber: String
}, { _id: false });

const attendanceMonthSchema = new mongoose.Schema({
  month: String,
  year: Number,
  totalWorkingDays: Number,
  daysPresent: Number,
  daysAbsent: Number,
  lateMarks: Number
}, { _id: false });

const studentSchema = new mongoose.Schema({
  admissionNumber: { type: String, unique: true, required: true },
  fullName: { type: String, required: true },
  dob: Date,
  gender: String,
  photo: String,
  bloodGroup: String,
  nationality: String,
  religion: String,
  mobile: String,
  email: { type: String, unique: true },
  address: String,
  city: String,
  state: String,
  pinCode: String,
  parentDetails: parentSchema,
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'sclass' },
  section: String,
  rollNumber: Number,
  academicYear: String,
  admissionDate: Date,
  admissionMode: String,
  previousSchool: String,
  scholarship: String,
  monthlyAttendance: [attendanceMonthSchema],
  feeCategory: String,
  totalFees: Number,
  installmentPlan: String,
  feeHistory: [feeHistorySchema],
  outstandingBalance: Number,
  lastPaymentDate: Date,
  paymentMode: String,
  scholarshipOrDiscount: String,
  marks: [marksSchema],
  documents: documentUploadsSchema,
  health: healthSchema,
  username: String,
  password: String,
  lastLogin: Date,
  activityLogs: [{ date: Date, activity: String }]
}, { timestamps: true });

module.exports = mongoose.model("student", studentSchema);
