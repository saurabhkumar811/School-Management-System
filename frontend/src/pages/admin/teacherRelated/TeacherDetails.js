import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getTeacherDetail, removeTeacherClass, removeTeacherSubject } from '../../../redux/teacherRelated/teacherHandle';
import { Button, Container, Typography, Box, List, ListItem } from '@mui/material';

const TeacherDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const { teacherDetails, loading } = useSelector((state) => state.teacher);

    useEffect(() => {
        if (id) {
            dispatch(getTeacherDetail(id));
        }
    }, [dispatch, id]);

    if (loading || !teacherDetails) {
        return <div>Loading teacher details...</div>;
    }

    const assignedClasses = teacherDetails.classesAssigned || [];
    const assignedSubjects = teacherDetails.subjects || [];

    const handleAssignClass = () => {
    navigate(`/Admin/teachers/chooseclass/${id}`);
};


    const handleAssignSubject = () => {
        navigate(`/Admin/teachers/choosesubject/${assignedClasses[0]._id || 'none'}/${id}`);

    };

    const handleRemoveClass = (classId) => {
        dispatch(removeTeacherClass({ teacherId: id, classId }));
    };

    const handleRemoveSubject = (subjectId) => {
        dispatch(removeTeacherSubject({ teacherId: id, subjectId }));
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" gutterBottom>
                Teacher Details
            </Typography>

            {/* <Box sx={{ my: 3 }}>
                <Typography variant="h6">Name: {teacherDetails.fullName}</Typography>
                <Typography variant="h6">Email: {teacherDetails.email}</Typography>
            </Box> */}

            <Box sx={{ my: 3 }}>
  <Typography variant="h5" gutterBottom>Personal Details</Typography>
  <Typography><strong>Employee Code:</strong> {teacherDetails.employeeCode}</Typography>
  <Typography><strong>Name:</strong> {teacherDetails.fullName}</Typography>
  <Typography><strong>DOB:</strong> {teacherDetails.dob}</Typography>
  <Typography><strong>Gender:</strong> {teacherDetails.gender}</Typography>
  <Typography><strong>Contact Number:</strong> {teacherDetails.contactNumber}</Typography>
  <Typography><strong>Email:</strong> {teacherDetails.email}</Typography>
  <Typography><strong>Address:</strong> {teacherDetails.address}</Typography>
</Box>

<Box sx={{ my: 3 }}>
  <Typography variant="h5" gutterBottom>Emergency Contact</Typography>
  <Typography><strong>Name:</strong> {teacherDetails?.emergencyContact?.name}</Typography>
  <Typography><strong>Relation:</strong> {teacherDetails?.emergencyContact?.relation}</Typography>
  <Typography><strong>Phone:</strong> {teacherDetails?.emergencyContact?.phone}</Typography>
</Box>

<Box sx={{ my: 3 }}>
  <Typography variant="h5" gutterBottom>Bank & Identification</Typography>
  <Typography><strong>Bank Account Number:</strong> {teacherDetails.bankAccountNumber}</Typography>
  <Typography><strong>Bank Name:</strong> {teacherDetails.bankName}</Typography>
  <Typography><strong>IFSC Code:</strong> {teacherDetails.ifscCode}</Typography>
  <Typography><strong>PAN Number:</strong> {teacherDetails.panNumber}</Typography>
  <Typography><strong>Aadhar Number:</strong> {teacherDetails.aadharNumber}</Typography>
</Box>

<Box sx={{ my: 3 }}>
  <Typography variant="h5" gutterBottom>Job Details</Typography>
  <Typography><strong>Employment Type:</strong> {teacherDetails.employmentType}</Typography>
  <Typography><strong>Payment Cycle:</strong> {teacherDetails.paymentCycle}</Typography>
  <Typography><strong>Payment Mode:</strong> {teacherDetails.paymentMode}</Typography>
  <Typography><strong>Annual CTC:</strong> ₹{teacherDetails.annualCTC}</Typography>
  <Typography><strong>Monthly Gross:</strong> ₹{teacherDetails.monthlyGross}</Typography>
  <Typography><strong>Username:</strong> {teacherDetails.username}</Typography>
  <Typography><strong>Reporting Authority:</strong> {teacherDetails.reportingAuthority}</Typography>
</Box>

<Box sx={{ my: 3 }}>
  <Typography variant="h5" gutterBottom>Professional Profile</Typography>
  <Typography><strong>Qualification:</strong> {teacherDetails.qualification}</Typography>
  <Typography><strong>Experience (Years):</strong> {teacherDetails.experienceYears}</Typography>
  <Typography><strong>Working Days/Month:</strong> {teacherDetails.workingDaysPerMonth}</Typography>
</Box>

<Box sx={{ my: 3 }}>
  <Typography variant="h5" gutterBottom>Leave Balance</Typography>
  <Typography><strong>CL:</strong> {teacherDetails?.leaveBalance?.cl}</Typography>
  <Typography><strong>SL:</strong> {teacherDetails?.leaveBalance?.sl}</Typography>
  <Typography><strong>PL:</strong> {teacherDetails?.leaveBalance?.pl}</Typography>
</Box>


            <Box sx={{ my: 3 }}>
                <Typography variant="h5">Assigned Classes</Typography>
                {assignedClasses.length > 0 ? (
                    <List>
                {assignedClasses.map((cls) => (
                            <ListItem key={cls._id} sx={{display: 'flex', justifyContent: 'space-between'}}>
                                {cls.sclassName}
                            <Button
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    onClick={() => handleRemoveClass(cls._id)}
                                    >
                                    Remove
                                </Button>
                                    </ListItem>
                        ))}
                    </List>
                    
                ) : (
                    <Typography>No classes assigned yet.</Typography>
                )}
                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleAssignClass}>
                    Assign More Class
                </Button>
            </Box>

            <Box sx={{ my: 3 }}>
                <Typography variant="h5">Assigned Subjects</Typography>
                {assignedSubjects.length > 0 ? (
                    <List>
                        {assignedSubjects.map((subj) => (
                            <ListItem key={subj._id} sx={{display: 'flex', justifyContent: 'space-between'}}>
                                {subj.subName} ({subj.subCode})
                                <Button
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    onClick={() => handleRemoveSubject(subj._id)}
                                >
                                    Remove
                                </Button>
                            </ListItem>
                        ))}
                    </List>
                    
                ) : (
                    <Typography>No subjects assigned yet.</Typography>
                )}
                <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={handleAssignSubject}>
                    Assign More Subject
                </Button>
            </Box>
        </Container>
    );
};

export default TeacherDetails;
