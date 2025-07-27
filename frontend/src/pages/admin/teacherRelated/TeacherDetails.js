// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { getTeacherDetail } from '../../../redux/teacherRelated/teacherHandle';
// import { Button, Container, Typography, Box } from '@mui/material';

// const TeacherDetails = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { id } = useParams();

//     const { teacherDetails, loading } = useSelector((state) => state.teacher);

//     useEffect(() => {
//         if (id) {
//             dispatch(getTeacherDetail(id));
//         }
//     }, [dispatch, id]);

//     if (loading || !teacherDetails) {
//         return <div>Loading teacher details...</div>;
//     }

//     const assignedClass = teacherDetails?.classesAssigned?.[0];
//     const assignedSubject = teacherDetails?.teachSubject;

//     const handleAssignClass = () => {
//     navigate(`/Admin/teachers/chooseclass/${id}`);
// };


//     const handleAssignSubject = () => {
//         if (!assignedClass) {
//             alert("Please assign a class before assigning a subject.");
//             return;
//         }
//         navigate(`/Admin/teachers/choosesubject/${assignedClass._id}/${id}`);

//     };

//     return (
//         <Container maxWidth="md">
//             <Typography variant="h4" align="center" gutterBottom>
//                 Teacher Details
//             </Typography>

//             <Box sx={{ my: 3 }}>
//                 <Typography variant="h6">Name: {teacherDetails.fullName}</Typography>
//                 <Typography variant="h6">Email: {teacherDetails.email}</Typography>
//             </Box>

//             <Box sx={{ my: 3 }}>
//                 <Typography variant="h5">Class Assignment</Typography>
//                 {assignedClass ? (
//                     <Typography sx={{ mt: 1 }}>
//                         Assigned Class: <strong>{assignedClass.sclassName}</strong>
//                     </Typography>
//                 ) : (
//                     <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleAssignClass}>
//                         Assign Class
//                     </Button>
//                 )}
//             </Box>

//             <Box sx={{ my: 3 }}>
//                 <Typography variant="h5">Subject Assignment</Typography>
//                 {assignedSubject?.subName ? (
//                     <Typography sx={{ mt: 1 }}>
//                         Assigned Subject: <strong>{assignedSubject.subName}</strong>
//                     </Typography>
//                 ) : (
//                     <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={handleAssignSubject}>
//                         Assign Subject
//                     </Button>
//                 )}
//             </Box>
//         </Container>
//     );
// };

// export default TeacherDetails;
import React, { useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Grid,
  Divider,
  Button,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getTeacherDetail } from '../../../redux/teacherRelated/teacherHandle';

const TeacherDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { teacherDetails, loading } = useSelector((state) => state.teacher);
  const BASE_URL = "http://localhost:5001/";

  useEffect(() => {
    if (id) dispatch(getTeacherDetail(id));
  }, [dispatch, id]);

  if (loading || !teacherDetails) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <Typography>Loading teacher details...</Typography>
      </Box>
    );
  }

  const d = teacherDetails;
  const assignedClass = d?.classesAssigned?.[0];
  const assignedSubject = d?.teachSubject;
  const teacherImage =
    typeof d.photo === 'string'
      ? BASE_URL + d.photo
      : d.photo?.url || ''; // Prepend BASE_URL for teacher image
  console.log(teacherImage);

  // Utility: Render file as link or dash with BASE_URL
  const renderFile = (file) =>
    file && typeof file === 'string'
      ? (
        <a href={BASE_URL + file} target="_blank" rel="noopener noreferrer">
          {file.split('/').pop()}
        </a>
      )
      : file?.name
        ? <span>{file.name}</span>
        : <span>-</span>;

  // Utility for file arrays with BASE_URL
  const renderFileList = (arr) =>
    Array.isArray(arr) && arr.length > 0
      ? arr.map((f, i) => (
          <div key={i}>
            {typeof f === 'string' ? (
              <a href={BASE_URL + f} target="_blank" rel="noopener noreferrer">
                {f.split('/').pop()}
              </a>
            ) : f?.name ? (
              <span>{f.name}</span>
            ) : (
              <span>-</span>
            )}
          </div>
        ))
      : <span>-</span>;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Paper
        elevation={4}
        sx={{
          maxWidth: 600,
          width: '100%',
          borderRadius: 2,
          p: 3,
        }}
      >
        {/* Action buttons at the top (you can add more as needed) */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => {/* handle delete */}}
          >
            Delete Teacher
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {/* add attendance or any other action */}}
          >
            Add Attendance
          </Button>
        </Box>
        {/* Avatar and Name */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2, mb: 2 }}>
          <Avatar
            src={teacherImage}
            alt={d.fullName}
            sx={{ width: 100, height: 100, mb: 1, fontSize: 42 }}
          >
            {d.fullName && d.fullName[0]}
          </Avatar>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {d.fullName}
          </Typography>
          <Typography variant="caption" sx={{ color: 'grey.600' }}>
            Employee Code: {d.employeeCode || '-'}
          </Typography>
        </Box>

        {/* Roll/Admission/Other Basic info */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Typography sx={{ color: 'grey.700' }}>
            {d.roll ? `Roll No: ${d.roll}` : ''}
            {d.admissionNumber ? ` | Admission Number: ${d.admissionNumber}` : ''}
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* TEACHER DETAILS */}
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={1}>
            {/* Left - Personal */}
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 'bold', mb: 1 }}>Personal Details</Typography>
              <Box>
                <b>Date of Birth:</b> {d.dob ? new Date(d.dob).toLocaleDateString() : '-'}<br />
                <b>Gender:</b> {d.gender || '-'}<br />
                <b>Qualification:</b> {d.qualification || '-'}<br />
                <b>Experience:</b> {d.experienceYears || '-'} years<br />
                <b>Working Days/Month:</b> {d.workingDaysPerMonth || '-'}
              </Box>
            </Grid>
            {/* Right - Contact */}
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 'bold', mb: 1 }}>Contact Details</Typography>
              <Box>
                <b>Mobile:</b> {d.contactNumber || '-'}<br />
                <b>Email:</b> {d.email || '-'}<br />
                <b>Address:</b> {d.address || '-'}<br />
                <b>Username:</b> {d.username || '-'}
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Emergency Contact */}
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ fontWeight: 'bold', mb: 1 }}>Emergency Contact</Typography>
          <Box>
            <b>Name:</b> {d.emergencyContact?.name || '-'}<br />
            <b>Relation:</b> {d.emergencyContact?.relation || '-'}<br />
            <b>Phone:</b> {d.emergencyContact?.phone || '-'}
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Job/Bank Info */}
        <Box sx={{ mb: 2 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 'bold', mb: 1 }}>Employment/Pay</Typography>
              <Box>
                <b>Employment Type:</b> {d.employmentType || '-'}<br />
                <b>Payment Cycle:</b> {d.paymentCycle || '-'}<br />
                <b>CTC(Annual):</b> {d.annualCTC || '-'}<br />
                <b>Gross(Monthly):</b> {d.monthlyGross || '-'}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 'bold', mb: 1 }}>Bank Details</Typography>
              <Box>
                <b>Bank Name:</b> {d.bankName || '-'}<br />
                <b>Account #:</b> {d.bankAccountNumber || '-'}<br />
                <b>IFSC:</b> {d.ifscCode || '-'}<br />
                <b>PAN:</b> {d.panNumber || '-'}<br />
                <b>Aadhar:</b> {d.aadharNumber || '-'}
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Salary Breakup & Leave */}
        {d.salaryBreakup || d.leaveBalance ? (
          <Box sx={{ mb: 2 }}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                {d.salaryBreakup && (
                  <>
                    <Typography sx={{ fontWeight: 'bold', mb: 1 }}>Salary Breakup</Typography>
                    {Object.entries(d.salaryBreakup).map(([k, v]) =>
                      <div key={k}>{k}: {v || '-'}</div>
                    )}
                  </>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                {d.leaveBalance && (
                  <>
                    <Typography sx={{ fontWeight: 'bold', mb: 1 }}>Leave Balance</Typography>
                    {Object.entries(d.leaveBalance).map(([k, v]) =>
                      <div key={k}>{k.toUpperCase()}: {v || '-'}</div>
                    )}
                  </>
                )}
              </Grid>
            </Grid>
          </Box>
        ) : null}

        <Divider sx={{ mb: 2 }} />

        {/* Assigned section */}
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ fontWeight: 'bold', mb: 1 }}>Teaching Assignment</Typography>
          <Box>
            <b>Assigned Class:</b> {assignedClass ? assignedClass.sclassName : (
              <Button
                size="small"
                onClick={() => navigate(`/Admin/teachers/chooseclass/${id}`)}
                sx={{ ml: 1 }}
                variant="contained"
              >Assign Class</Button>
            )}<br />
            <b>Assigned Subject:</b> {assignedSubject?.subName || (
              <Button
                size="small"
                onClick={() => {
                  if (!assignedClass) {
                    alert("Please assign a class before assigning a subject.");
                    return;
                  }
                  navigate(`/Admin/teachers/choosesubject/${assignedClass._id}/${id}`);
                }}
                sx={{ ml: 1 }}
                variant="contained"
                color="secondary"
              >Assign Subject</Button>
            )}
          </Box>
        </Box>
        <Divider sx={{ mb: 2 }} />

        {/* Documents */}
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ fontWeight: 'bold', mb: 1 }}>Documents</Typography>
          <Box>
            <b>Resume:</b> {renderFile(d.documents?.resume)}<br />
            <b>ID Proof:</b> {renderFile(d.documents?.idProof)}<br />
            <b>Joining Letter:</b> {renderFile(d.documents?.joiningLetter)}<br />
            <b>Digital Signature:</b> {renderFile(d.digitalSignature)}<br />
            <b>Qualification Certificates:</b> {renderFileList(d.documents?.qualificationCertificates)}<br />
            <b>Experience Letters:</b> {renderFileList(d.documents?.experienceLetters)}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default TeacherDetails;