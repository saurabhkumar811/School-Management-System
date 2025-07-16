import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTeacher } from '../../../redux/teacherRelated/teacherHandle';
import { useNavigate, useParams } from 'react-router-dom';

const AddTeacher = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { loading, error } = useSelector((state) => state.teacher);
  const { currentUser } = useSelector((state) => state.user);

  // ✅ Always call hooks at top-level
  const [formData, setFormData] = useState({
    employeeCode: '',
    fullName: '',
    dob: '',
    gender: '',
    contactNumber: '',
    email: '',
    password: '',
    address: '',
    emergencyContact: { name: '', relation: '', phone: '' },
    salaryBreakup: {
      basic: '', hra: '', da: '', specialAllowance: '', transportAllowance: '',
      medicalAllowance: '', pf: '', pt: '', tds: '', otherDeductions: '', netSalary: ''
    },
    leaveBalance: { cl: '', sl: '', pl: '' },
    employmentType: 'Permanent',
    paymentCycle: 'Monthly',
    paymentMode: 'Bank Transfer',
    bankAccountNumber: '',
    bankName: '',
    ifscCode: '',
    panNumber: '',
    aadharNumber: '',
    annualCTC: '',
    monthlyGross: '',
    username: '',
    reportingAuthority: '',
    qualification: '',
    experienceYears: '',
    workingDaysPerMonth: ''
  });

  const [files, setFiles] = useState({
    photo: null,
    digitalSignature: null,
    resume: null,
    idProof: null,
    joiningLetter: null,
    qualificationCertificates: [],
    experienceLetters: []
  });

  // ✅ Only JSX returns are conditional (not hooks)
  if (id !== "new") {
    return <div>Invalid access. Please go to Admin ➔ Teachers ➔ Add Teacher.</div>;
  }

  // Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    if (name === 'qualificationCertificates' || name === 'experienceLetters') {
      setFiles(prev => ({ ...prev, [name]: [...selectedFiles] }));
    } else {
      setFiles(prev => ({ ...prev, [name]: selectedFiles[0] }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const admin = JSON.parse(localStorage.getItem("admin"));
    const schoolId = admin?._id;

    const dataToSend = {
      ...formData,
      documents: {
        resume: files.resume,
        idProof: files.idProof,
        joiningLetter: files.joiningLetter,
        qualificationCertificates: files.qualificationCertificates,
        experienceLetters: files.experienceLetters
      },
      photo: files.photo,
      digitalSignature: files.digitalSignature,
      schoolId: schoolId
    };

    dispatch(addTeacher(dataToSend));
    navigate("/Admin/teachers");
  };

  return (
    <div className="p-4 max-w-xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add Teacher</h2>

      {loading && <p className="text-blue-500 mb-4">Submitting...</p>}
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}

      <form onSubmit={handleSubmit}>
        <input type="text" name="employeeCode" placeholder="Employee Code" onChange={handleInputChange} required />
        <input type="text" name="fullName" placeholder="Full Name" onChange={handleInputChange} required />
        <input type="date" name="dob" onChange={handleInputChange} required />
        <input type="text" name="gender" placeholder="Gender" onChange={handleInputChange} required />
        <input type="text" name="contactNumber" placeholder="Contact Number" onChange={handleInputChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleInputChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleInputChange} required />
        <input type="text" name="address" placeholder="Address" onChange={handleInputChange} />

        <h4 className="mt-4 font-semibold">Emergency Contact:</h4>
        <input type="text" placeholder="Name" onChange={e => handleNestedChange('emergencyContact', 'name', e.target.value)} />
        <input type="text" placeholder="Relation" onChange={e => handleNestedChange('emergencyContact', 'relation', e.target.value)} />
        <input type="text" placeholder="Phone" onChange={e => handleNestedChange('emergencyContact', 'phone', e.target.value)} />

        <h4 className="mt-4 font-semibold">Bank Details:</h4>
        <input type="text" name="bankAccountNumber" placeholder="Bank Account Number" onChange={handleInputChange} />
        <input type="text" name="bankName" placeholder="Bank Name" onChange={handleInputChange} />
        <input type="text" name="ifscCode" placeholder="IFSC Code" onChange={handleInputChange} />
        <input type="text" name="panNumber" placeholder="PAN Number" onChange={handleInputChange} />
        <input type="text" name="aadharNumber" placeholder="Aadhar Number" onChange={handleInputChange} />
        <input type="number" name="annualCTC" placeholder="Annual CTC" onChange={handleInputChange} />
        <input type="number" name="monthlyGross" placeholder="Monthly Gross" onChange={handleInputChange} />
        <input type="text" name="username" placeholder="Username" onChange={handleInputChange} />
        <input type="text" name="reportingAuthority" placeholder="Reporting Authority" onChange={handleInputChange} />
        <input type="text" name="qualification" placeholder="Qualification" onChange={handleInputChange} />
        <input type="number" name="experienceYears" placeholder="Experience Years" onChange={handleInputChange} />
        <input type="number" name="workingDaysPerMonth" placeholder="Working Days Per Month" onChange={handleInputChange} />

        <h4 className="text-xl font-semibold mt-6 mb-4">Upload Teacher Documents</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label>Photo</label>
            <input type="file" name="photo" onChange={handleFileChange} />
          </div>

          <div>
            <label>Digital Signature</label>
            <input type="file" name="digitalSignature" onChange={handleFileChange} />
          </div>

          <div>
            <label>Resume</label>
            <input type="file" name="resume" onChange={handleFileChange} />
          </div>

          <div>
            <label>ID Proof</label>
            <input type="file" name="idProof" onChange={handleFileChange} />
          </div>

          <div>
            <label>Joining Letter</label>
            <input type="file" name="joiningLetter" onChange={handleFileChange} />
          </div>

          <div>
            <label>Qualification Certificates</label>
            <input type="file" name="qualificationCertificates" onChange={handleFileChange} multiple />
          </div>

          <div>
            <label>Experience Letters</label>
            <input type="file" name="experienceLetters" onChange={handleFileChange} multiple />
          </div>
        </div>

        <button type="submit" className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Teacher
        </button>
      </form>
    </div>
  );
};

export default AddTeacher;
