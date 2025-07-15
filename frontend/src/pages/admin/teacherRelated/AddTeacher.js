import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTeacher } from '../../../redux/teacherRelated/teacherHandle';
import { useNavigate } from 'react-router-dom';

const AddTeacher = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.teacher);
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    employeeCode: '',
    fullName: '',
    dob: '',
    gender: '',
    contactNumber: '',
    email: '',
    password: '',
    address: '',
    emergencyContact: {
      name: '',
      relation: '',
      phone: ''
    },
    salaryBreakup: {
      basic: '',
      hra: '',
      da: '',
      specialAllowance: '',
      transportAllowance: '',
      medicalAllowance: '',
      pf: '',
      pt: '',
      tds: '',
      otherDeductions: '',
      netSalary: ''
    },
    leaveBalance: {
      cl: '',
      sl: '',
      pl: ''
    },
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

    const admin = JSON.parse(localStorage.getItem("admin")); // or your logic to get admin
  const schoolId = admin?._id; // assuming Admin _id is used as schoolId

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
      digitalSignature: files.digitalSignature
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

        {/* Basic Info */}
        <input type="text" name="employeeCode" placeholder="Employee Code" onChange={handleInputChange} required />
        <input type="text" name="fullName" placeholder="Full Name" onChange={handleInputChange} required />
        
        <div className="mb-4">
          <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            onChange={handleInputChange}
            required
            className="w-full border rounded-md px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <input type="text" name="gender" placeholder="Gender" onChange={handleInputChange} required />
        <input type="text" name="contactNumber" placeholder="Contact Number" onChange={handleInputChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleInputChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleInputChange} required />
        <input type="text" name="address" placeholder="Address" onChange={handleInputChange} />

        {/* Emergency Contact */}
        <h4 className="mt-4 font-semibold">Emergency Contact:</h4>
        <input type="text" placeholder="Name" onChange={e => handleNestedChange('emergencyContact', 'name', e.target.value)} />
        <input type="text" placeholder="Relation" onChange={e => handleNestedChange('emergencyContact', 'relation', e.target.value)} />
        <input type="text" placeholder="Phone" onChange={e => handleNestedChange('emergencyContact', 'phone', e.target.value)} />

        {/* Bank Details */}
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

        {/* File Uploads */}
        <h4 className="text-xl font-semibold mt-6 mb-4">Upload Teacher Documents</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Personal Documents */}
          <div className="space-y-4">
            <h5 className="text-lg font-medium mb-2">Personal Documents</h5>

            <div>
              <label className="block text-sm font-medium mb-1">Photo</label>
              <input type="file" name="photo" onChange={handleFileChange} className="file-input" />
              {files.photo && <p className="text-sm text-green-600 mt-1">{files.photo.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Digital Signature</label>
              <input type="file" name="digitalSignature" onChange={handleFileChange} className="file-input" />
              {files.digitalSignature && <p className="text-sm text-green-600 mt-1">{files.digitalSignature.name}</p>}
            </div>
          </div>

          {/* Official Documents */}
          <div className="space-y-4">
            <h5 className="text-lg font-medium mb-2">Official Documents</h5>

            <div>
              <label className="block text-sm font-medium mb-1">Resume</label>
              <input type="file" name="resume" onChange={handleFileChange} className="file-input" />
              {files.resume && <p className="text-sm text-green-600 mt-1">{files.resume.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">ID Proof</label>
              <input type="file" name="idProof" onChange={handleFileChange} className="file-input" />
              {files.idProof && <p className="text-sm text-green-600 mt-1">{files.idProof.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Joining Letter</label>
              <input type="file" name="joiningLetter" onChange={handleFileChange} className="file-input" />
              {files.joiningLetter && <p className="text-sm text-green-600 mt-1">{files.joiningLetter.name}</p>}
            </div>
          </div>

          {/* Qualification Certificates */}
          <div className="md:col-span-1 space-y-2">
            <h5 className="text-lg font-medium mb-2">Qualification Certificates</h5>
            <input type="file" name="qualificationCertificates" onChange={handleFileChange} multiple className="file-input" />
            {files.qualificationCertificates.length > 0 && (
              <ul className="text-sm text-green-600 mt-1 list-disc list-inside">
                {Array.from(files.qualificationCertificates).map((file, idx) => (
                  <li key={idx}>{file.name}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Experience Letters */}
          <div className="md:col-span-1 space-y-2">
            <h5 className="text-lg font-medium mb-2">Experience Letters</h5>
            <input type="file" name="experienceLetters" onChange={handleFileChange} multiple className="file-input" />
            {files.experienceLetters.length > 0 && (
              <ul className="text-sm text-green-600 mt-1 list-disc list-inside">
                {Array.from(files.experienceLetters).map((file, idx) => (
                  <li key={idx}>{file.name}</li>
                ))}
              </ul>
            )}
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
