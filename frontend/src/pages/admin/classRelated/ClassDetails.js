import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { getClassDetails, getClassStudents, getSubjectList } from "../../../redux/sclassRelated/sclassHandle";
import { deleteUser } from '../../../redux/userRelated/userHandle';
import {
    Box, Container, Typography, Tab, IconButton, Paper, Divider, Stack, Fade, useTheme
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { resetSubjects } from "../../../redux/sclassRelated/sclassSlice";
import { BlueButton, GreenButton, PurpleButton } from "../../../components/buttonStyles";
import TableTemplate from "../../../components/TableTemplate";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";
import DeleteIcon from "@mui/icons-material/Delete";
import PostAddIcon from '@mui/icons-material/PostAdd';

const glassCard = {
    background: 'rgba(255,255,255,0.80)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
    backdropFilter: 'blur(8px)',
    borderRadius: 4,
    p: { xs: 2, md: 4 },
    mb: 3,
    border: '1px solid rgba(255,255,255,0.4)'
};

const ClassDetails = () => {
    const theme = useTheme();
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { subjectsList, sclassStudents, sclassDetails, loading, error, response, getresponse } = useSelector((state) => state.sclass);

    const classID = params.id

    useEffect(() => {
        dispatch(getClassDetails(classID, "Sclass"));
        dispatch(getSubjectList(classID, "ClassSubjects"))
        dispatch(getClassStudents(classID));
    }, [dispatch, classID])

    if (error) {
        console.log(error)
    }

    const [value, setValue] = useState('1');
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (event, newValue) => setValue(newValue);

    const deleteHandler = (deleteID, address) => {
        setMessage("Sorry, the delete function has been disabled for now.")
        setShowPopup(true)
    }

    const subjectColumns = [
        { id: 'name', label: 'Subject Name', minWidth: 170 },
        { id: 'code', label: 'Subject Code', minWidth: 100 },
    ]

    const subjectRows = subjectsList && subjectsList.length > 0 && subjectsList.map((subject) => ({
        name: subject.subName,
        code: subject.subCode,
        id: subject._id,
    }));

    const SubjectsButtonHaver = ({ row }) => (
        <Stack direction="row" spacing={1}>
            <IconButton onClick={() => deleteHandler(row.id, "Subject")}>
                <DeleteIcon color="error" />
            </IconButton>
            <BlueButton
                variant="contained"
                onClick={() => navigate(`/Admin/class/subject/${classID}/${row.id}`)}
            >
                View
            </BlueButton>
        </Stack>
    );

    const subjectActions = [
        {
            icon: <PostAddIcon color="primary" />, name: 'Add New Subject',
            action: () => navigate("/Admin/addsubject/" + classID)
        },
        {
            icon: <DeleteIcon color="error" />, name: 'Delete All Subjects',
            action: () => deleteHandler(classID, "SubjectsClass")
        }
    ];

    const ClassSubjectsSection = () => (
        <Fade in>
            <Box>
                <Typography variant="h5" color="#270843" fontWeight={700} mb={2}>
                    Subjects List
                </Typography>
                <Paper elevation={3} sx={{ ...glassCard, mb: 2 }}>
                    <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} />
                </Paper>
                <Box display="flex" justifyContent="flex-end" mt={2}>
                    <GreenButton
                        variant="contained"
                        onClick={() => navigate("/Admin/addsubject/" + classID)}
                    >
                        Add Subjects
                    </GreenButton>
                </Box>
                <SpeedDialTemplate actions={subjectActions} />
            </Box>
        </Fade>
    );

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
    ]

    const studentRows = sclassStudents.map((student) => ({
        name: student.name,
        rollNum: student.rollNum,
        id: student._id,
    }));

    const StudentsButtonHaver = ({ row }) => (
        <Stack direction="row" spacing={1}>
            <IconButton onClick={() => deleteHandler(row.id, "Student")}>
                <PersonRemoveIcon color="error" />
            </IconButton>
            <BlueButton
                variant="contained"
                onClick={() => navigate("/Admin/students/student/" + row.id)}
            >
                View
            </BlueButton>
            <PurpleButton
                variant="contained"
                onClick={() =>
                    navigate("/Admin/students/student/attendance/" + row.id)
                }
            >
                Attendance
            </PurpleButton>
        </Stack>
    );

    const studentActions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Student',
            action: () => navigate("/Admin/class/addstudents/" + classID)
        },
        {
            icon: <PersonRemoveIcon color="error" />, name: 'Delete All Students',
            action: () => deleteHandler(classID, "StudentsClass")
        },
    ];

    const ClassStudentsSection = () => (
        <Fade in>
            <Box>
                <Typography variant="h5" color="#270843" fontWeight={700} mb={2}>
                    Students List
                </Typography>
                <Paper elevation={3} sx={{ ...glassCard, mb: 2 }}>
                    <TableTemplate buttonHaver={StudentsButtonHaver} columns={studentColumns} rows={studentRows} />
                </Paper>
                <Box display="flex" justifyContent="flex-end" mt={2}>
                    <GreenButton
                        variant="contained"
                        onClick={() => navigate("/Admin/class/addstudents/" + classID)}
                    >
                        Add Students
                    </GreenButton>
                </Box>
                <SpeedDialTemplate actions={studentActions} />
            </Box>
        </Fade>
    );

    const ClassTeachersSection = () => (
        <Fade in>
            <Box>
                <Typography variant="h5" color="#270843" fontWeight={700} mb={2}>
                    Teachers
                </Typography>
                <Paper elevation={3} sx={{ ...glassCard, mb: 2 }}>
                    <Typography variant="body1" color="text.secondary">
                        (Feature coming soon)
                    </Typography>
                </Paper>
            </Box>
        </Fade>
    );

    const ClassDetailsSection = () => {
        const numberOfSubjects = subjectsList.length;
        const numberOfStudents = sclassStudents.length;

        return (
            <Fade in>
                <Paper elevation={4} sx={{
                    ...glassCard,
                    mb: 3,
                    bgcolor: "rgba(236, 233, 247, 0.9)"
                }}>
                    <Typography variant="h3" align="center" color="#270843" fontWeight={800} gutterBottom sx={{ letterSpacing: 2 }}>
                        {sclassDetails?.sclassName || "Class"}
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Stack direction={{ xs: "column", md: "row" }} spacing={4} justifyContent="center" alignItems="center" mb={2}>
                        <Box>
                            <Typography variant="h6" color="#270843" fontWeight={600}>
                                Subjects
                            </Typography>
                            <Typography variant="h4" color="primary" fontWeight={700}>
                                {numberOfSubjects}
                            </Typography>
                        </Box>
                        <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" } }} />
                        <Box>
                            <Typography variant="h6" color="#270843" fontWeight={600}>
                                Students
                            </Typography>
                            <Typography variant="h4" color="primary" fontWeight={700}>
                                {numberOfStudents}
                            </Typography>
                        </Box>
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
                        <GreenButton
                            variant="contained"
                            onClick={() => navigate("/Admin/class/addstudents/" + classID)}
                        >
                            Add Students
                        </GreenButton>
                        <GreenButton
                            variant="contained"
                            onClick={() => navigate("/Admin/addsubject/" + classID)}
                        >
                            Add Subjects
                        </GreenButton>
                    </Stack>
                </Paper>
            </Fade>
        );
    }

    return (
        <>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
                    <Typography variant="h6">Loading...</Typography>
                </Box>
            ) : (
                <Box sx={{
                    width: '100%',
                    minHeight: '100vh',
                    background: 'linear-gradient(135deg, #ece9f7 0%, #f5f7fa 100%)'
                }}>
                    <Box sx={{
                        width: '100%',
                        position: 'sticky',
                        top: 0,
                        zIndex: 10,
                        bgcolor: 'rgba(255,255,255,0.95)',
                        borderBottom: 1,
                        borderColor: 'divider',
                        boxShadow: 2
                    }}>
                        <TabContext value={value}>
                            <TabList onChange={handleChange} centered variant="fullWidth"
                                TabIndicatorProps={{ style: { background: "#270843", height: 4, borderRadius: 2 } }}
                            >
                                <Tab label="Details" value="1" sx={{ fontWeight: 700, fontSize: 16, color: "#270843" }} />
                                <Tab label="Subjects" value="2" sx={{ fontWeight: 700, fontSize: 16, color: "#270843" }} />
                                <Tab label="Students" value="3" sx={{ fontWeight: 700, fontSize: 16, color: "#270843" }} />
                                <Tab label="Teachers" value="4" sx={{ fontWeight: 700, fontSize: 16, color: "#270843" }} />
                            </TabList>
                        </TabContext>
                    </Box>
                    <Container maxWidth="lg" sx={{ marginTop: "2.5rem", marginBottom: "3rem" }}>
                        <TabContext value={value}>
                            <TabPanel value="1">
                                <ClassDetailsSection />
                            </TabPanel>
                            <TabPanel value="2">
                                <ClassSubjectsSection />
                            </TabPanel>
                            <TabPanel value="3">
                                <ClassStudentsSection />
                            </TabPanel>
                            <TabPanel value="4">
                                <ClassTeachersSection />
                            </TabPanel>
                        </TabContext>
                    </Container>
                </Box>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default ClassDetails;
