import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeacherDetail } from '../../../redux/teacherRelated/teacherHandle';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';

const TeacherDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const teacherDetails = useSelector((state) => state.teacher.teacherDetails);

    const teacherID = params.id;

    useEffect(() => {
        if (teacherID) dispatch(getTeacherDetail(teacherID));
    }, [dispatch, teacherID]);

    if (!teacherDetails) return <div>Loading teacher details...</div>;

    const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

    const handleAddSubject = () => {
        const assignedClass = teacherDetails?.classesAssigned?.[0];
        const sclassId = assignedClass?._id;
        const teacherId = teacherDetails?._id;

        if (!sclassId) {
            alert('Class is not assigned to this teacher yet. Please assign a class first.');
            return;
        }

        if (!teacherId) {
            alert('Teacher ID is missing. Cannot proceed.');
            return;
        }

        navigate(`/Admin/teachers/choosesubject/${sclassId}/${teacherId}`);
    };

    const assignedClass = teacherDetails?.classesAssigned?.[0];

    return (
        <Container>
            <Typography variant="h4" align="center" gutterBottom>
                Teacher Details
            </Typography>

            <Typography variant="h6" gutterBottom>
                Teacher Name: {teacherDetails?.name || teacherDetails?.fullName}
            </Typography>

            <Typography variant="h6" gutterBottom>
                Class Name: {assignedClass?.sclassName || "Not Assigned Yet"}
            </Typography>

            {isSubjectNamePresent ? (
                <>
                    <Typography variant="h6" gutterBottom>
                        Subject Name: {teacherDetails?.teachSubject?.subName}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Subject Sessions: {teacherDetails?.teachSubject?.sessions}
                    </Typography>
                </>
            ) : (
                <Button 
                    variant="contained" 
                    onClick={handleAddSubject} 
                    disabled={!assignedClass?._id}
                >
                    Add Subject
                </Button>
            )}
        </Container>
    );
};

export default TeacherDetails;
