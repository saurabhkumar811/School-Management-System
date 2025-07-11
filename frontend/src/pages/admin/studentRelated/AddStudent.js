import React, { useState } from "react";
import axios from "axios";

function AddStudent() {
  const [form, setForm] = useState({
    admissionNumber: "",
    fullName: "",
    dob: "",
    gender: "",
    photo: null,
    bloodGroup: "",
    nationality: "",
    religion: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    parentDetails: {
      fatherName: "",
      fatherOccupation: "",
      fatherMobile: "",
      motherName: "",
      motherOccupation: "",
      motherMobile: "",
      guardianName: "",
      guardianRelation: "",
      guardianContact: "",
      guardianAddress: ""
    },
    class: "",
    section: "",
    rollNumber: "",
    academicYear: "",
    admissionDate: "",
    admissionMode: "",
    previousSchool: "",
    scholarship: "",
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
    await axios.post("/api/students", data);
    alert("Student added!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="admissionNumber" value={form.admissionNumber} onChange={handleChange} required />
      <input name="fullName" value={form.fullName} onChange={handleChange} required />
      <input name="dob" type="date" value={form.dob} onChange={handleChange} />
      <input name="gender" value={form.gender} onChange={handleChange} />
      <input name="photo" type="file" onChange={handleChange} />
      {/* Add all other fields similarly */}
      <button type="submit">Add Student</button>
    </form>
  );
}

export default AddStudent;
