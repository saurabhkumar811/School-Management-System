import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Table, TableBody, TableContainer, TableHead, Typography, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getTeacherFreeClassSubjects } from '../../../redux/sclassRelated/sclassHandle';
import { updateTeacherSubject } from '../../../redux/teacherRelated/teacherHandle';
import { GreenButton, PurpleButton } from '../../../components/buttonStyles';
import { StyledTableCell, StyledTableRow } from '../../../components/styles';

const ChooseSubject = () => {
    const { classID, teacherID } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loader, setLoader] = useState(false);

    const { subjectsList, loading, error, response } = useSelector((state) => state.sclass);

    useEffect(() => {
        dispatch(getTeacherFreeClassSubjects(classID));
    }, [classID, dispatch]);

    const updateSubjectHandler = (subjectId) => {
        setLoader(true);
        dispatch(updateTeacherSubject({ teacherId: teacherID, subjects: subjectId }))
            .then(() => {
                navigate("/Admin/teachers");
            });
    };

    if (loading) return <div>Loading...</div>;

    if (response) {
        return (
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" color="error">All subjects already have teachers assigned.</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <PurpleButton variant="contained" onClick={() => navigate(`/Admin/addsubject/${classID}`)}>
                        Add Subjects
                    </PurpleButton>
                </Box>
            </Box>
        );
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Typography variant="h6" sx={{ p: 2 }}>Choose a Subject</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>#</StyledTableCell>
                            <StyledTableCell align="center">Subject Name</StyledTableCell>
                            <StyledTableCell align="center">Subject Code</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {subjectsList.map((subject, index) => (
                            <StyledTableRow key={subject._id}>
                                <StyledTableCell>{index + 1}</StyledTableCell>
                                <StyledTableCell align="center">{subject.subName}</StyledTableCell>
                                <StyledTableCell align="center">{subject.subCode}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <GreenButton
                                        variant="contained"
                                        disabled={loader}
                                        onClick={() => updateSubjectHandler(subject._id)}
                                    >
                                        {loader ? <div className="load"></div> : 'Choose'}
                                    </GreenButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default ChooseSubject;
