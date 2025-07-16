import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getTeacherDetail } from '../../../redux/teacherRelated/teacherHandle';
import { Button, Container, Typography, Box } from '@mui/material';

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

    const assignedClass = teacherDetails?.classesAssigned?.[0];
    const assignedSubject = teacherDetails?.teachSubject;

    const handleAssignClass = () => {
    navigate(`/Admin/teachers/chooseclass/${id}`);
};


    const handleAssignSubject = () => {
        if (!assignedClass) {
            alert("Please assign a class before assigning a subject.");
            return;
        }
        navigate(`/Admin/teachers/choosesubject/${assignedClass._id}/${id}`);
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" gutterBottom>
                Teacher Details
            </Typography>

            <Box sx={{ my: 3 }}>
                <Typography variant="h6">Name: {teacherDetails.fullName}</Typography>
                <Typography variant="h6">Email: {teacherDetails.email}</Typography>
            </Box>

            <Box sx={{ my: 3 }}>
                <Typography variant="h5">Class Assignment</Typography>
                {assignedClass ? (
                    <Typography sx={{ mt: 1 }}>
                        Assigned Class: <strong>{assignedClass.sclassName}</strong>
                    </Typography>
                ) : (
                    <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleAssignClass}>
                        Assign Class
                    </Button>
                )}
            </Box>

            <Box sx={{ my: 3 }}>
                <Typography variant="h5">Subject Assignment</Typography>
                {assignedSubject?.subName ? (
                    <Typography sx={{ mt: 1 }}>
                        Assigned Subject: <strong>{assignedSubject.subName}</strong>
                    </Typography>
                ) : (
                    <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={handleAssignSubject}>
                        Assign Subject
                    </Button>
                )}
            </Box>
        </Container>
    );
};

export default TeacherDetails;
