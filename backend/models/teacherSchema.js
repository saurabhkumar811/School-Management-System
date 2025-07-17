const mongoose = require("mongoose");

const salaryBreakupSchema = new mongoose.Schema({
  basic: { type: Number },
  hra: { type: Number },
  da: { type: Number },
  specialAllowance: { type: Number },
  transportAllowance: { type: Number },
  medicalAllowance: { type: Number },
  pf: { type: Number },
  pt: { type: Number },
  tds: { type: Number },
  otherDeductions: { type: Number },
  netSalary: { type: Number }
}, { _id: false });

const appraisalSchema = new mongoose.Schema({
  date: Date,
  score: Number,
  incrementAmount: Number,
  remarks: String
}, { _id: false });

const documentUploadsSchema = new mongoose.Schema({
  resume: String,
  qualificationCertificates: [String],
  idProof: String,
  experienceLetters: [String],
  joiningLetter: String
}, { _id: false });

const leaveBalanceSchema = new mongoose.Schema({
  cl: { type: Number, default: 0 },
  sl: { type: Number, default: 0 },
  pl: { type: Number, default: 0 }
}, { _id: false });

const teacherSchema = new mongoose.Schema({
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', },
  employeeCode: { type: String, unique: true, required: true },
  fullName: { type: String, required: true },
  dob: Date,
  gender: String,
  contactNumber: String,
  email: { type: String, unique: true, required: true },
  address: String,
  emergencyContact: {
    name: String,
    relation: String,
    phone: String
  },
  photo: String,
  designation: String,
  department: String,
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'subject' }],
  classesAssigned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'sclass' }],
  dateOfJoining: Date,
  employmentType: { type: String, enum: ['Permanent', 'Contract', 'Part-time', 'Visiting'] },
  reportingAuthority: String,
  qualification: String,
  experienceYears: Number,
  annualCTC: Number,
  monthlyGross: Number,
  salaryBreakup: salaryBreakupSchema,
  paymentCycle: { type: String, enum: ['Monthly', 'Quarterly'] },
  paymentMode: { type: String, enum: ['Bank Transfer', 'Cheque', 'Cash'] },
  bankAccountNumber: String,
  bankName: String,
  ifscCode: String,
  panNumber: String,
  aadharNumber: String,
  workingDaysPerMonth: Number,
  leaveBalance: leaveBalanceSchema,
  attendanceRecord: [{
    date: Date,
    status: { type: String, enum: ['Present', 'Absent', 'Half-day', 'Late'] }
  }],
  appraisalHistory: [appraisalSchema],
  performanceScore: Number,
  lastIncrementDate: Date,
  lastIncrementAmount: Number,
  documents: documentUploadsSchema,
  timetable: [{ day: String, periods: [String] }],
  feedback: [{ class: String, rating: Number, remarks: String }],
  remarksOnStudents: [{ student: { type: mongoose.Schema.Types.ObjectId, ref: 'student' }, remark: String }],
  username: String,
  password: String,
  digitalSignature: String
}, { timestamps: true });

module.exports = mongoose.model("teacher", teacherSchema);
