import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Paper,
  Grid,
  TextField,
  Button,
  Typography,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  OutlinedInput,
  Chip,
  Box
} from "@mui/material";

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5001";
// will work if all the enum types are filled and basic salary is given any amount
// Placeholder data for subjects and classes (replace with API fetch in production)
const SUBJECTS = [
  { _id: "sub1", name: "Mathematics" },
  { _id: "sub2", name: "Science" },
  { _id: "sub3", name: "English" }
];
const CLASSES = [
  { _id: "cls1", name: "Class 1" },
  { _id: "cls2", name: "Class 2" },
  { _id: "cls3", name: "Class 3" }
];

function AddTeacher() {
  const [form, setForm] = useState({
    employeeCode: "",
    fullName: "",
    dob: "",
    gender: "",
    contactNumber: "",
    email: "",
    address: "",
    emergencyContact: { name: "", relation: "", phone: "" },
    photo: null,
    designation: "",
    department: "",
    subjects: [],
    classesAssigned: [],
    dateOfJoining: "",
    employmentType: "",
    reportingAuthority: "",
    qualification: "",
    experienceYears: "",
    annualCTC: "",
    monthlyGross: "",
    salaryBreakup: {
      basic: "",
      hra: "",
      da: "",
      specialAllowance: "",
      transportAllowance: "",
      medicalAllowance: "",
      pf: "",
      pt: "",
      tds: "",
      otherDeductions: "",
      netSalary: ""
    },
    paymentCycle: "",
    paymentMode: "",
    bankAccountNumber: "",
    bankName: "",
    ifscCode: "",
    panNumber: "",
    aadharNumber: "",
    workingDaysPerMonth: "",
    leaveBalance: { cl: 0, sl: 0, pl: 0 },
    username: "",
    password: "",
    documents: {
      resume: null,
      qualificationCertificates: [],
      idProof: null,
      experienceLetters: [],
      joiningLetter: null
    },
    digitalSignature: null
  });

  // Handle regular and nested field changes
  const handleChange = (e) => {
    const { name, value, files, type, multiple } = e.target;

    // File fields
    if (name === "photo") {
      setForm({ ...form, photo: files[0] });
    } else if (name.startsWith("documents.")) {
      const field = name.split(".")[1];
      if (multiple) {
        setForm({
          ...form,
          documents: { ...form.documents, [field]: Array.from(files) }
        });
      } else {
        setForm({
          ...form,
          documents: { ...form.documents, [field]: files[0] }
        });
      }
    }
    // Nested fields
    else if (name.startsWith("emergencyContact.")) {
      const field = name.split(".")[1];
      setForm({
        ...form,
        emergencyContact: { ...form.emergencyContact, [field]: value }
      });
    } else if (name.startsWith("salaryBreakup.")) {
      const field = name.split(".")[1];
      setForm({
        ...form,
        salaryBreakup: { ...form.salaryBreakup, [field]: value }
      });
    } else if (name.startsWith("leaveBalance.")) {
      const field = name.split(".")[1];
      setForm({
        ...form,
        leaveBalance: { ...form.leaveBalance, [field]: value }
      });
    }
    // Array fields (subjects, classesAssigned)
    else if (name === "subjects" || name === "classesAssigned") {
      setForm({ ...form, [name]: typeof value === "string" ? value.split(",") : value });
    }
    // Digital signature (file)
    else if (name === "digitalSignature") {
      setForm({ ...form, digitalSignature: files[0] });
    }
    // Regular fields
    else {
      setForm({ ...form, [name]: value });
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append simple fields
    for (const key in form) {
      if (
        [
          "photo",
          "digitalSignature"
        ].includes(key)
      ) {
        if (form[key]) data.append(key, form[key]);
      }
      // Nested objects/arrays
      else if (
        ["emergencyContact", "salaryBreakup", "leaveBalance"].includes(key)
      ) {
        data.append(key, JSON.stringify(form[key]));
      }
      // Subjects/classesAssigned as array of IDs
      else if (["subjects", "classesAssigned"].includes(key)) {
        data.append(key, JSON.stringify(form[key]));
      }
      // Documents (files and arrays of files)
      else if (key === "documents") {
        for (const docKey in form.documents) {
          const docValue = form.documents[docKey];
          if (Array.isArray(docValue)) {
            docValue.forEach((file) => {
              if (file) data.append(`documents.${docKey}`, file);
            });
          } else if (docValue) {
            data.append(`documents.${docKey}`, docValue);
          }
        }
      }
      // Everything else
      else {
        data.append(key, form[key]);
      }
      if (
        !form.employmentType ||
        !form.paymentCycle ||
        !form.paymentMode ||
        !form.salaryBreakup.basic
      ) {
        alert("Please fill all required fields.");
        return;
      }

    }

    try {
      await axios.post(`${REACT_APP_BASE_URL}/TeacherReg`, data);
      alert("Teacher added!");
      // Optionally reset form here
    } catch (err) {
      alert("Error adding teacher: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Add Teacher
        </Typography>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container spacing={2}>
            {/* BASIC INFO */}
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name="employeeCode" label="Employee Code" value={form.employeeCode} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name="fullName" label="Full Name" value={form.fullName} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name="dob" label="Date of Birth" type="date" InputLabelProps={{ shrink: true }} value={form.dob} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name="gender" label="Gender" value={form.gender} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name="contactNumber" label="Contact Number" value={form.contactNumber} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name="email" label="Email" value={form.email} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth name="address" label="Address" value={form.address} onChange={handleChange} />
            </Grid>
            {/* EMERGENCY CONTACT */}
            <Grid item xs={12} sm={4}>
              <TextField fullWidth name="emergencyContact.name" label="Emergency Contact Name" value={form.emergencyContact.name} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth name="emergencyContact.relation" label="Relation" value={form.emergencyContact.relation} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth name="emergencyContact.phone" label="Emergency Phone" value={form.emergencyContact.phone} onChange={handleChange} />
            </Grid>
            {/* PHOTO */}
            <Grid item xs={12}>
              <Button variant="outlined" component="label">
                Upload Photo
                <input type="file" hidden name="photo" accept="image/*" onChange={handleChange} />
              </Button>
              {form.photo && <Typography variant="body2" sx={{ marginLeft: 2 }}>{form.photo.name}</Typography>}
            </Grid>
            {/* DESIGNATION/DEPARTMENT */}
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name="designation" label="Designation" value={form.designation} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name="department" label="Department" value={form.department} onChange={handleChange} />
            </Grid>
            {/* SUBJECTS */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Subjects</InputLabel>
                <Select
                  multiple
                  name="subjects"
                  value={form.subjects}
                  onChange={handleChange}
                  input={<OutlinedInput label="Subjects" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((id) => {
                        const subj = SUBJECTS.find(s => s._id === id);
                        return <Chip key={id} label={subj?.name || id} />;
                      })}
                    </Box>
                  )}
                >
                  {SUBJECTS.map((subject) => (
                    <MenuItem key={subject._id} value={subject._id}>
                      {subject.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* CLASSES ASSIGNED */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Classes Assigned</InputLabel>
                <Select
                  multiple
                  name="classesAssigned"
                  value={form.classesAssigned}
                  onChange={handleChange}
                  input={<OutlinedInput label="Classes Assigned" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((id) => {
                        const cls = CLASSES.find(c => c._id === id);
                        return <Chip key={id} label={cls?.name || id} />;
                      })}
                    </Box>
                  )}
                >
                  {CLASSES.map((cls) => (
                    <MenuItem key={cls._id} value={cls._id}>
                      {cls.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* DATE OF JOINING */}
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name="dateOfJoining" label="Date of Joining" type="date" InputLabelProps={{ shrink: true }} value={form.dateOfJoining} onChange={handleChange} />
            </Grid>
            {/* EMPLOYMENT TYPE */}
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                name="employmentType"
                label="Employment Type"
                value={form.employmentType}
                onChange={handleChange}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Permanent">Permanent</MenuItem>
                <MenuItem value="Contract">Contract</MenuItem>
                <MenuItem value="Part-time">Part-time</MenuItem>
                <MenuItem value="Visiting">Visiting</MenuItem>
              </TextField>
            </Grid>
            {/* REPORTING AUTHORITY */}
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name="reportingAuthority" label="Reporting Authority" value={form.reportingAuthority} onChange={handleChange} />
            </Grid>
            {/* QUALIFICATION */}
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name="qualification" label="Qualification" value={form.qualification} onChange={handleChange} />
            </Grid>
            {/* EXPERIENCE */}
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name="experienceYears" label="Experience (Years)" type="number" value={form.experienceYears} onChange={handleChange} />
            </Grid>
            {/* ANNUAL CTC */}
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name="annualCTC" label="Annual CTC" type="number" value={form.annualCTC} onChange={handleChange} />
            </Grid>
            {/* MONTHLY GROSS */}
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name="monthlyGross" label="Monthly Gross" type="number" value={form.monthlyGross} onChange={handleChange} />
            </Grid>
            {/* SALARY BREAKUP */}
            <Grid item xs={12}>
              <Typography variant="subtitle1">Salary Breakup</Typography>
            </Grid>
            {Object.keys(form.salaryBreakup).map((key) => (
              <Grid item xs={12} sm={4} key={key}>
                <TextField
                  fullWidth
                  name={`salaryBreakup.${key}`}
                  label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  type="number"
                  value={form.salaryBreakup[key]}
                  onChange={handleChange}
                />
              </Grid>
            ))}
            {/* PAYMENT CYCLE & MODE */}
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                name="paymentCycle"
                label="Payment Cycle"
                value={form.paymentCycle}
                onChange={handleChange}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Monthly">Monthly</MenuItem>
                <MenuItem value="Quarterly">Quarterly</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                name="paymentMode"
                label="Payment Mode"
                value={form.paymentMode}
                onChange={handleChange}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                <MenuItem value="Cheque">Cheque</MenuItem>
                <MenuItem value="Cash">Cash</MenuItem>
              </TextField>
            </Grid>
            {/* BANK DETAILS */}
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name="bankAccountNumber" label="Bank Account Number" value={form.bankAccountNumber} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name="bankName" label="Bank Name" value={form.bankName} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name="ifscCode" label="IFSC Code" value={form.ifscCode} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name="panNumber" label="PAN Number" value={form.panNumber} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name="aadharNumber" label="Aadhar Number" value={form.aadharNumber} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name="workingDaysPerMonth" label="Working Days/Month" type="number" value={form.workingDaysPerMonth} onChange={handleChange} />
            </Grid>
            {/* LEAVE BALANCE */}
            <Grid item xs={12}>
              <Typography variant="subtitle1">Leave Balance</Typography>
            </Grid>
            {["cl", "sl", "pl"].map((type) => (
              <Grid item xs={12} sm={4} key={type}>
                <TextField
                  fullWidth
                  name={`leaveBalance.${type}`}
                  label={type.toUpperCase()}
                  type="number"
                  value={form.leaveBalance[type]}
                  onChange={handleChange}
                />
              </Grid>
            ))}
            {/* USERNAME/PASSWORD */}
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name="username" label="Username" value={form.username} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name="password" label="Password" type="password" value={form.password} onChange={handleChange} required />
            </Grid>
            {/* DOCUMENT UPLOADS */}
            <Grid item xs={12}>
              <Typography variant="subtitle1">Document Uploads</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="outlined" component="label" fullWidth>
                Resume
                <input type="file" hidden name="documents.resume" onChange={handleChange} />
              </Button>
              {form.documents.resume && <Typography variant="body2">{form.documents.resume.name}</Typography>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="outlined" component="label" fullWidth>
                Qualification Certificates (Multiple)
                <input type="file" hidden name="documents.qualificationCertificates" multiple onChange={handleChange} />
              </Button>
              {form.documents.qualificationCertificates.length > 0 && (
                <Typography variant="body2">
                  {form.documents.qualificationCertificates.map((file, idx) => file.name).join(", ")}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="outlined" component="label" fullWidth>
                ID Proof
                <input type="file" hidden name="documents.idProof" onChange={handleChange} />
              </Button>
              {form.documents.idProof && <Typography variant="body2">{form.documents.idProof.name}</Typography>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="outlined" component="label" fullWidth>
                Experience Letters (Multiple)
                <input type="file" hidden name="documents.experienceLetters" multiple onChange={handleChange} />
              </Button>
              {form.documents.experienceLetters.length > 0 && (
                <Typography variant="body2">
                  {form.documents.experienceLetters.map((file, idx) => file.name).join(", ")}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="outlined" component="label" fullWidth>
                Joining Letter
                <input type="file" hidden name="documents.joiningLetter" onChange={handleChange} />
              </Button>
              {form.documents.joiningLetter && <Typography variant="body2">{form.documents.joiningLetter.name}</Typography>}
            </Grid>
            {/* DIGITAL SIGNATURE */}
            <Grid item xs={12} sm={6}>
              <Button variant="outlined" component="label" fullWidth>
                Digital Signature
                <input type="file" hidden name="digitalSignature" onChange={handleChange} />
              </Button>
              {form.digitalSignature && <Typography variant="body2">{form.digitalSignature.name}</Typography>}
            </Grid>
            {/* SUBMIT */}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Add Teacher
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default AddTeacher;
