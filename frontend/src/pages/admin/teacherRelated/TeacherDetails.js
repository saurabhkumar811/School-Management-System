import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeacherDetail } from '../../../redux/teacherRelated/teacherHandle';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';

const TeacherDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const teacherDetails = useSelector((state) => state.teacher.teacherDetail);

    const teacherID = params.id;

    useEffect(() => {
        if (teacherID) dispatch(getTeacherDetail(teacherID));
    }, [dispatch, teacherID]);

    if (!teacherDetails) return <div>Loading...</div>;

    const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

    const handleAddSubject = () => {
        navigate(`/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`);
    };

    return (
        <Container>
            <Typography variant="h4" align="center" gutterBottom>
                Teacher Details
            </Typography>
            <Typography variant="h6" gutterBottom>
                Teacher Name: {teacherDetails?.name || teacherDetails?.fullName}
            </Typography>
            <Typography variant="h6" gutterBottom>
                Class Name: {teacherDetails?.teachSclass?.sclassName}
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
                <Button variant="contained" onClick={handleAddSubject}>
                    Add Subject
                </Button>
            )}
        </Container>
    );
};

export default TeacherDetails;
