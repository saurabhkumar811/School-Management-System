// import React, { useState } from "react";
// import axios from "axios";

// function AddStudent() {
//   const [form, setForm] = useState({
//     admissionNumber: "",
//     fullName: "",
//     dob: "",
//     gender: "",
//     photo: null,
//     bloodGroup: "",
//     nationality: "",
//     religion: "",
//     mobile: "",
//     email: "",
//     address: "",
//     city: "",
//     state: "",
//     pinCode: "",
//     parentDetails: {
//       fatherName: "",
//       fatherOccupation: "",
//       fatherMobile: "",
//       motherName: "",
//       motherOccupation: "",
//       motherMobile: "",
//       guardianName: "",
//       guardianRelation: "",
//       guardianContact: "",
//       guardianAddress: ""
//     },
//     class: "",
//     section: "",
//     rollNumber: "",
//     academicYear: "",
//     admissionDate: "",
//     admissionMode: "",
//     previousSchool: "",
//     scholarship: "",
//     username: "",
//     password: "",
//     // ...other fields as needed
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "photo") {
//       setForm({ ...form, photo: files[0] });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     Object.keys(form).forEach((key) => {
//       if (key === "photo" && form[key]) {
//         data.append(key, form[key]);
//       } else if (typeof form[key] === "object") {
//         data.append(key, JSON.stringify(form[key]));
//       } else {
//         data.append(key, form[key]);
//       }
//     });
//     await axios.post("/api/students", data);
//     alert("Student added!");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="admissionNumber" value={form.admissionNumber} onChange={handleChange} required />
//       <input name="fullName" value={form.fullName} onChange={handleChange} required />
//       <input name="dob" type="date" value={form.dob} onChange={handleChange} />
//       <input name="gender" value={form.gender} onChange={handleChange} />
//       <input name="photo" type="file" onChange={handleChange} />
//       {/* Add all other fields similarly */}
//       <button type="submit">Add Student</button>
//     </form>
//   );
// }

// export default AddStudent;
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function AddStudent() {
//   const [classes, setClasses] = useState([]);
//   const [form, setForm] = useState({
//     admissionNumber: "",
//     fullName: "",
//     dob: "",
//     gender: "",
//     photo: null,
//     bloodGroup: "",
//     nationality: "",
//     religion: "",
//     mobile: "",
//     email: "",
//     address: "",
//     city: "",
//     state: "",
//     pinCode: "",
//     parentDetails: {
//       fatherName: "",
//       fatherOccupation: "",
//       fatherMobile: "",
//       motherName: "",
//       motherOccupation: "",
//       motherMobile: "",
//       guardianName: "",
//       guardianRelation: "",
//       guardianContact: "",
//       guardianAddress: ""
//     },
//     class: "", // will hold ObjectId string
//     section: "",
//     rollNumber: "",
//     academicYear: "",
//     admissionDate: "",
//     admissionMode: "",
//     previousSchool: "",
//     scholarship: "",
//     username: "",
//     password: ""
//   });

//   // Fetch class list on mount
//   useEffect(() => {
//     const fetchClasses = async () => {
//       try {
//         const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/SclassList/ADMIN_ID_HERE`);
//         setClasses(res.data);
//       } catch (error) {
//         console.error("Error fetching classes", error);
//       }
//     };
//     fetchClasses();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "photo") {
//       setForm({ ...form, photo: files[0] });
//     } else if (name.startsWith("parentDetails.")) {
//       const field = name.split(".")[1];
//       setForm({
//         ...form,
//         parentDetails: {
//           ...form.parentDetails,
//           [field]: value
//         }
//       });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     Object.keys(form).forEach((key) => {
//       if (key === "photo" && form[key]) {
//         data.append("photo", form[key]);
//       } else if (typeof form[key] === "object") {
//         data.append(key, JSON.stringify(form[key]));
//       } else {
//         data.append(key, form[key]);
//       }
//     });

//     try {
//       const res = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}/StudentReg`,
//         data
//       );
//       alert("Student added successfully");
//       console.log(res.data);
//     } catch (err) {
//       alert("Error adding student");
//       console.error(err);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} encType="multipart/form-data">
//       <h2>Student Registration</h2>
//       <input name="admissionNumber" placeholder="Admission Number" value={form.admissionNumber} onChange={handleChange} required />
//       <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required />
//       <input name="dob" type="date" value={form.dob} onChange={handleChange} />
//       <input name="gender" placeholder="Gender" value={form.gender} onChange={handleChange} />
//       <input name="photo" type="file" accept="image/*" onChange={handleChange} />
//       <input name="bloodGroup" placeholder="Blood Group" value={form.bloodGroup} onChange={handleChange} />
//       <input name="nationality" placeholder="Nationality" value={form.nationality} onChange={handleChange} />
//       <input name="religion" placeholder="Religion" value={form.religion} onChange={handleChange} />
//       <input name="mobile" placeholder="Mobile Number" value={form.mobile} onChange={handleChange} />
//       <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
//       <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
//       <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
//       <input name="state" placeholder="State" value={form.state} onChange={handleChange} />
//       <input name="pinCode" placeholder="PIN Code" value={form.pinCode} onChange={handleChange} />

//       <h3>Parent Details</h3>
//       <input name="parentDetails.fatherName" placeholder="Father's Name" value={form.parentDetails.fatherName} onChange={handleChange} />
//       <input name="parentDetails.fatherOccupation" placeholder="Father's Occupation" value={form.parentDetails.fatherOccupation} onChange={handleChange} />
//       <input name="parentDetails.fatherMobile" placeholder="Father's Mobile" value={form.parentDetails.fatherMobile} onChange={handleChange} />
//       <input name="parentDetails.motherName" placeholder="Mother's Name" value={form.parentDetails.motherName} onChange={handleChange} />
//       <input name="parentDetails.motherOccupation" placeholder="Mother's Occupation" value={form.parentDetails.motherOccupation} onChange={handleChange} />
//       <input name="parentDetails.motherMobile" placeholder="Mother's Mobile" value={form.parentDetails.motherMobile} onChange={handleChange} />
//       <input name="parentDetails.guardianName" placeholder="Guardian's Name" value={form.parentDetails.guardianName} onChange={handleChange} />
//       <input name="parentDetails.guardianRelation" placeholder="Guardian's Relation" value={form.parentDetails.guardianRelation} onChange={handleChange} />
//       <input name="parentDetails.guardianContact" placeholder="Guardian's Contact" value={form.parentDetails.guardianContact} onChange={handleChange} />
//       <input name="parentDetails.guardianAddress" placeholder="Guardian's Address" value={form.parentDetails.guardianAddress} onChange={handleChange} />

//       <h3>Academic Info</h3>
//       <select name="class" value={form.class} onChange={handleChange} required>
//         <option value="">-- Select Class --</option>
//         {classes.map(cls => (
//           <option key={cls._id} value={cls._id}>{cls.name}</option>
//         ))}
//       </select>

//       <input name="section" placeholder="Section" value={form.section} onChange={handleChange} />
//       <input name="rollNumber" placeholder="Roll Number" value={form.rollNumber} onChange={handleChange} />
//       <input name="academicYear" placeholder="Academic Year" value={form.academicYear} onChange={handleChange} />
//       <input name="admissionDate" type="date" value={form.admissionDate} onChange={handleChange} />
//       <input name="admissionMode" placeholder="Admission Mode" value={form.admissionMode} onChange={handleChange} />
//       <input name="previousSchool" placeholder="Previous School" value={form.previousSchool} onChange={handleChange} />
//       <input name="scholarship" placeholder="Scholarship" value={form.scholarship} onChange={handleChange} />

//       <h3>Login Credentials</h3>
//       <input name="username" placeholder="Username" value={form.username} onChange={handleChange} />
//       <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} />

//       <button type="submit">Add Student</button>
//     </form>
//   );
// }

// export default AddStudent;
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function AddStudent() {
//   const [classes, setClasses] = useState([]);
//   const [form, setForm] = useState({
//     admissionNumber: "",
//     fullName: "",
//     dob: "",
//     gender: "",
//     photo: null,
//     bloodGroup: "",
//     nationality: "",
//     religion: "",
//     mobile: "",
//     email: "",
//     address: "",
//     city: "",
//     state: "",
//     pinCode: "",
//     parentDetails: {
//       fatherName: "",
//       fatherOccupation: "",
//       fatherMobile: "",
//       motherName: "",
//       motherOccupation: "",
//       motherMobile: "",
//       guardianName: "",
//       guardianRelation: "",
//       guardianContact: "",
//       guardianAddress: ""
//     },
//     class: "", // ObjectId string from dropdown
//     section: "",
//     rollNumber: "",
//     academicYear: "",
//     admissionDate: "",
//     admissionMode: "",
//     previousSchool: "",
//     scholarship: "",
//     username: "",
//     password: ""
//   });

//   useEffect(() => {
//     const admin = JSON.parse(localStorage.getItem("user"));
//     if (!admin || !admin._id) {
//       alert("Admin not found in localStorage.");
//       return;
//     }

//     const fetchClasses = async () => {
//       try {
//         const res = await axios.get(
//           `${process.env.REACT_APP_BASE_URL}/SclassList/${admin._id}`
//         );
//         setClasses(res.data);
//       } catch (error) {
//         console.error("Error fetching classes", error);
//       }
//     };

//     fetchClasses();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "photo") {
//       setForm({ ...form, photo: files[0] });
//     } else if (name.startsWith("parentDetails.")) {
//       const field = name.split(".")[1];
//       setForm((prev) => ({
//         ...prev,
//         parentDetails: {
//           ...prev.parentDetails,
//           [field]: value
//         }
//       }));
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();

//     Object.keys(form).forEach((key) => {
//       if (key === "photo" && form[key]) {
//         data.append("photo", form[key]);
//       } else if (typeof form[key] === "object") {
//         data.append(key, JSON.stringify(form[key]));
//       } else {
//         data.append(key, form[key]);
//       }
//     });

//     try {
//       const res = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}/StudentReg`,
//         data
//       );
//       alert("Student added successfully");
//       console.log(res.data);
//     } catch (err) {
//       alert("Error adding student");
//       console.error(err);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} encType="multipart/form-data">
//       <h2>Student Registration</h2>
//       <input name="admissionNumber" placeholder="Admission Number" value={form.admissionNumber} onChange={handleChange} required />
//       <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required />
//       <input name="dob" type="date" value={form.dob} onChange={handleChange} />
//       <input name="gender" placeholder="Gender" value={form.gender} onChange={handleChange} />
//       <input name="photo" type="file" accept="image/*" onChange={handleChange} />
//       <input name="bloodGroup" placeholder="Blood Group" value={form.bloodGroup} onChange={handleChange} />
//       <input name="nationality" placeholder="Nationality" value={form.nationality} onChange={handleChange} />
//       <input name="religion" placeholder="Religion" value={form.religion} onChange={handleChange} />
//       <input name="mobile" placeholder="Mobile Number" value={form.mobile} onChange={handleChange} />
//       <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
//       <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
//       <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
//       <input name="state" placeholder="State" value={form.state} onChange={handleChange} />
//       <input name="pinCode" placeholder="PIN Code" value={form.pinCode} onChange={handleChange} />

//       <h3>Parent Details</h3>
//       {["fatherName", "fatherOccupation", "fatherMobile", "motherName", "motherOccupation", "motherMobile", "guardianName", "guardianRelation", "guardianContact", "guardianAddress"].map((field) => (
//         <input
//           key={field}
//           name={`parentDetails.${field}`}
//           placeholder={field.replace(/([A-Z])/g, " $1")}
//           value={form.parentDetails[field]}
//           onChange={handleChange}
//         />
//       ))}

//       <h3>Academic Info</h3>
//       <select name="class" value={form.class} onChange={handleChange} required>
//         <option value="">-- Select Class --</option>
//         {classes.map(cls => (
//           <option key={cls._id} value={cls._id}>{cls.name}</option>
//         ))}
//       </select>

//       <input name="section" placeholder="Section" value={form.section} onChange={handleChange} />
//       <input name="rollNumber" placeholder="Roll Number" value={form.rollNumber} onChange={handleChange} />
//       <input name="academicYear" placeholder="Academic Year" value={form.academicYear} onChange={handleChange} />
//       <input name="admissionDate" type="date" value={form.admissionDate} onChange={handleChange} />
//       <input name="admissionMode" placeholder="Admission Mode" value={form.admissionMode} onChange={handleChange} />
//       <input name="previousSchool" placeholder="Previous School" value={form.previousSchool} onChange={handleChange} />
//       <input name="scholarship" placeholder="Scholarship" value={form.scholarship} onChange={handleChange} />

//       <h3>Login Credentials</h3>
//       <input name="username" placeholder="Username" value={form.username} onChange={handleChange} />
//       <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />

//       <button type="submit">Add Student</button>
//     </form>
//   );
// }

// export default AddStudent;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddStudent.css"; // Optional: for better styling

function AddStudent() {
  const [classes, setClasses] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState(initialFormState());

  function initialFormState() {
    return {
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
      password: ""
    };
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user._id) {
      alert("Admin not found. Please log in again.");
      return;
    }

    const fetchClasses = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/SclassList/${user._id}`);
        setClasses(res.data);
      } catch (error) {
        console.error("Error fetching classes", error);
      }
    };

    fetchClasses();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setForm({ ...form, photo: files[0] });
    } else if (name.startsWith("parentDetails.")) {
      const field = name.split(".")[1];
      setForm({
        ...form,
        parentDetails: {
          ...form.parentDetails,
          [field]: value
        }
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((key) => {
      if (key === "photo" && form[key]) {
        data.append("photo", form[key]);
      } 
      // else if (typeof form[key] === "object") {
      //   data.append(key, JSON.stringify(form[key]));
      // } 
        else if (key === "parentDetails") {
  Object.entries(form.parentDetails).forEach(([field, value]) => {
    data.append(`parentDetails.${field}`, value);
  });
}
      else {
        data.append(key, form[key]);
      }
    });

    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/StudentReg`, data);
      alert("Student added successfully");
      setSubmitted(true);
      setForm(initialFormState());
    } catch (err) {
      alert("Error adding student");
      console.error(err);
    }
  };

  const handleNewStudent = () => {
    setSubmitted(false);
  };

  return (
    <div className="add-student-form">
      <h2>Student Registration</h2>
      {submitted ? (
        <div className="submitted-box">
          <p>✅ Student added successfully.</p>
          <button onClick={handleNewStudent}>Add Another Student</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <input name="admissionNumber" className="bright-placeholder" placeholder="Admission Number" value={form.admissionNumber} onChange={handleChange} required />
            <input name="fullName" className="bright-placeholder" placeholder="Full Name" value={form.fullName} onChange={handleChange} required />
            <input name="dob" type="date" value={form.dob} onChange={handleChange} />
            <input name="gender" className="bright-placeholder" placeholder="Gender" value={form.gender} onChange={handleChange} />
            <input name="photo" type="file" accept="image/*" onChange={handleChange} />
            <input name="bloodGroup" placeholder="Blood Group" value={form.bloodGroup} onChange={handleChange} />
            <input name="nationality" placeholder="Nationality" value={form.nationality} onChange={handleChange} />
            <input name="religion" placeholder="Religion" value={form.religion} onChange={handleChange} />
            <input name="mobile" placeholder="Mobile Number" value={form.mobile} onChange={handleChange} />
            <input name="email" className="bright-placeholder" placeholder="Email" value={form.email} onChange={handleChange} />
            <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
            <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
            <input name="state" placeholder="State" value={form.state} onChange={handleChange} />
            <input name="pinCode" placeholder="PIN Code" value={form.pinCode} onChange={handleChange} />
          </div>

          <h3>Parent Details</h3>
          <div className="form-group">
            {Object.entries(form.parentDetails).map(([key, value]) => (
              <input
                key={key}
                name={`parentDetails.${key}`}
                placeholder={key.replace(/([A-Z])/g, " $1")}
                value={value}
                onChange={handleChange}
              />
            ))}
          </div>

          <h3>Academic Info</h3>
          <div className="form-group">
            <select name="class" value={form.class} onChange={handleChange} required>
              <option value="">-- Select Class --</option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.sclassName}
                </option>
              ))}
            </select>
            <input name="section" placeholder="Section" value={form.section} onChange={handleChange} />
            // <input name="rollNumber" placeholder="Roll Number" value={form.rollNumber} onChange={handleChange} />
            <input name="roll" className="bright-placeholder" placeholder="Roll Number" value={form.roll} onChange={handleChange} />
            <input name="academicYear" placeholder="Academic Year" value={form.academicYear} onChange={handleChange} />
            <input name="admissionDate" type="date" value={form.admissionDate} onChange={handleChange} />
            <input name="admissionMode" placeholder="Admission Mode" value={form.admissionMode} onChange={handleChange} />
            <input name="previousSchool" placeholder="Previous School" value={form.previousSchool} onChange={handleChange} />
            <input name="scholarship" placeholder="Scholarship" value={form.scholarship} onChange={handleChange} />
          </div>

          <h3>Login Credentials</h3>
          <div className="form-group">
            <input name="username" placeholder="Username" value={form.username} onChange={handleChange} />
            <input name="password" className="bright-placeholder" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
          </div>

          <button type="submit">Add Student</button>
        </form>
      )}
    </div>
  );
}

export default AddStudent;
