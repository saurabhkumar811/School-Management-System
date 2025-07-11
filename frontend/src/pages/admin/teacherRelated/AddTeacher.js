import React, { useState } from "react";
import axios from "axios";

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
    // ...other fields as needed
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setForm({ ...form, photo: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach((key) => {
      if (key === "photo" && form[key]) {
        data.append(key, form[key]);
      } else if (typeof form[key] === "object") {
        data.append(key, JSON.stringify(form[key]));
      } else {
        data.append(key, form[key]);
      }
    });
    await axios.post("/api/teachers", data);
    alert("Teacher added!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="employeeCode" value={form.employeeCode} onChange={handleChange} required />
      <input name="fullName" value={form.fullName} onChange={handleChange} required />
      <input name="dob" type="date" value={form.dob} onChange={handleChange} />
      <input name="gender" value={form.gender} onChange={handleChange} />
      <input name="contactNumber" value={form.contactNumber} onChange={handleChange} />
      <input name="email" value={form.email} onChange={handleChange} required />
      <input name="address" value={form.address} onChange={handleChange} />
      <input name="photo" type="file" onChange={handleChange} />
      {/* Add all other fields similarly */}
      <button type="submit">Add Teacher</button>
    </form>
  );
}

export default AddTeacher;
