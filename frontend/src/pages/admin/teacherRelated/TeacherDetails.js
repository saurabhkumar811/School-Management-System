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

            <Box sx={{ my: 3 }}>
                <Typography variant="h6">Name: {teacherDetails.fullName}</Typography>
                <Typography variant="h6">Email: {teacherDetails.email}</Typography>
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
