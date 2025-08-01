import React, { useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Grid,
  Divider,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTeacherDetail } from '../../redux/teacherRelated/teacherHandle';

const TeacherDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // use this id for fetching
  const { teacherDetails: d, loading } = useSelector((state) => state.teacher);
  const BASE_URL = "http://localhost:5001/";

  useEffect(() => {
    if (id) dispatch(getTeacherDetail(id));
  }, [dispatch, id]);

  if (loading || !d) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <Typography>Loading teacher details...</Typography>
      </Box>
    );
  }

  const teacherImage = typeof d.photo === 'string' ? BASE_URL + d.photo : d.photo?.url || '';

  const renderFile = (file) =>
    file && typeof file === 'string' ? (
      <a href={BASE_URL + file} target="_blank" rel="noopener noreferrer">
        {file.split('/').pop()}
      </a>
    ) : file?.name ? (
      <span>{file.name}</span>
    ) : (
      <span>-</span>
    );

  const renderFileList = (arr) =>
    Array.isArray(arr) && arr.length > 0 ? (
      arr.map((f, i) => (
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
    ) : (
      <span>-</span>
    );

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Paper elevation={4} sx={{ maxWidth: 800, width: '100%', borderRadius: 2, p: 3 }}>
        {/* Avatar + Name */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2, mb: 2 }}>
          <Avatar src={teacherImage} alt={d.fullName} sx={{ width: 100, height: 100, fontSize: 42 }}>
            {d.fullName && d.fullName[0]}
          </Avatar>
          <Typography variant="h5" fontWeight="bold">{d.fullName}</Typography>
          <Typography variant="caption" color="textSecondary">
            Employee Code: {d.employeeCode || '-'}
          </Typography>
        </Box>

        {/* Personal & Contact */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight="bold">Personal Details</Typography>
            <Typography>DOB: {d.dob ? new Date(d.dob).toLocaleDateString() : '-'}</Typography>
            <Typography>Gender: {d.gender || '-'}</Typography>
            <Typography>Qualification: {d.qualification || '-'}</Typography>
            <Typography>Experience: {d.experienceYears || '-'} years</Typography>
            <Typography>Working Days/Month: {d.workingDaysPerMonth || '-'}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight="bold">Contact Details</Typography>
            <Typography>Mobile: {d.contactNumber || '-'}</Typography>
            <Typography>Email: {d.email || '-'}</Typography>
            <Typography>Address: {d.address || '-'}</Typography>
            <Typography>Username: {d.username || '-'}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Emergency Contact */}
        <Box sx={{ mb: 2 }}>
          <Typography fontWeight="bold">Emergency Contact</Typography>
          <Typography>Name: {d.emergencyContact?.name || '-'}</Typography>
          <Typography>Relation: {d.emergencyContact?.relation || '-'}</Typography>
          <Typography>Phone: {d.emergencyContact?.phone || '-'}</Typography>
        </Box>

        {/* Employment & Bank */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight="bold">Employment Info</Typography>
            <Typography>Type: {d.employmentType || '-'}</Typography>
            <Typography>Payment Cycle: {d.paymentCycle || '-'}</Typography>
            <Typography>CTC (Annual): ₹{d.annualCTC || '-'}</Typography>
            <Typography>Gross (Monthly): ₹{d.monthlyGross || '-'}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight="bold">Bank Details</Typography>
            <Typography>Bank Name: {d.bankName || '-'}</Typography>
            <Typography>Account #: {d.bankAccountNumber || '-'}</Typography>
            <Typography>IFSC: {d.ifscCode || '-'}</Typography>
            <Typography>PAN: {d.panNumber || '-'}</Typography>
            <Typography>Aadhar: {d.aadharNumber || '-'}</Typography>
          </Grid>
        </Grid>

        {/* Salary & Leave */}
        {(d.salaryBreakup || d.leaveBalance) && (
          <Grid container spacing={2} sx={{ mb: 2 }}>
            {d.salaryBreakup && (
              <Grid item xs={12} sm={6}>
                <Typography fontWeight="bold">Salary Breakup</Typography>
                {Object.entries(d.salaryBreakup).map(([key, value]) => (
                  <Typography key={key}>{key}: ₹{value || '-'}</Typography>
                ))}
              </Grid>
            )}
            {d.leaveBalance && (
              <Grid item xs={12} sm={6}>
                <Typography fontWeight="bold">Leave Balance</Typography>
                {Object.entries(d.leaveBalance).map(([key, value]) => (
                  <Typography key={key}>{key.toUpperCase()}: {value || '-'}</Typography>
                ))}
              </Grid>
            )}
          </Grid>
        )}

        {/* Teaching Assignment */}
        <Box sx={{ mb: 2 }}>
          <Typography fontWeight="bold" mb={1}>Teaching Assignment</Typography>
          <Typography fontWeight="medium">Assigned Classes:</Typography>
          {d.classesAssigned && d.classesAssigned.length > 0 ? (
            d.classesAssigned.map((cls) => (
              <Box key={cls._id} sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 0.5 }}>
                <Typography>{cls.sclassName || cls.name || '-'}</Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">No class assigned.</Typography>
          )}
          <Typography fontWeight="medium" mt={2}>Assigned Subjects:</Typography>
          {d.subjects && d.subjects.length > 0 ? (
            d.subjects.map((sub) => (
              <Box key={sub._id} sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 0.5 }}>
                <Typography>{sub.subName || sub.name || '-'}</Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">No subject assigned.</Typography>
          )}
        </Box>
        {/* Documents */}
        <Box>
          <Typography fontWeight="bold" sx={{ mb: 1 }}>Documents</Typography>
          <Typography>Resume: {renderFile(d.documents?.resume)}</Typography>
          <Typography>ID Proof: {renderFile(d.documents?.idProof)}</Typography>
          <Typography>Joining Letter: {renderFile(d.documents?.joiningLetter)}</Typography>
          <Typography>Digital Signature: {renderFile(d.digitalSignature)}</Typography>
          <Typography>Qualification Certificates: {renderFileList(d.documents?.qualificationCertificates)}</Typography>
          <Typography>Experience Letters: {renderFileList(d.documents?.experienceLetters)}</Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default TeacherDetails;
