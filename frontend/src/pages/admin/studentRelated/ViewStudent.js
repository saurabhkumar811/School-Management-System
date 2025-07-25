// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { deleteUser, getUserDetails, updateUser } from '../../../redux/userRelated/userHandle';
// import { useNavigate, useParams } from 'react-router-dom'
// import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
// import { Box, Button, Collapse, IconButton, Table, TableBody, TableHead, Typography, Tab, Paper, BottomNavigation, BottomNavigationAction, Container } from '@mui/material';
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';
// import { KeyboardArrowUp, KeyboardArrowDown, Delete as DeleteIcon } from '@mui/icons-material';
// import { removeStuff, updateStudentFields } from '../../../redux/studentRelated/studentHandle';
// import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../../components/attendanceCalculator';
// import CustomBarChart from '../../../components/CustomBarChart'
// import CustomPieChart from '../../../components/CustomPieChart'
// import { StyledTableCell, StyledTableRow } from '../../../components/styles';

// import InsertChartIcon from '@mui/icons-material/InsertChart';
// import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
// import TableChartIcon from '@mui/icons-material/TableChart';
// import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
// import Popup from '../../../components/Popup';

// const ViewStudent = () => {
//     const [showTab, setShowTab] = useState(false);

//     const navigate = useNavigate()
//     const params = useParams()
//     const dispatch = useDispatch()
//     const { userDetails, response, loading, error } = useSelector((state) => state.user);

//     const studentID = params.id
//     const address = "Student"

//     useEffect(() => {
//         dispatch(getUserDetails(studentID, address));
//     }, [dispatch, studentID])
    
//     useEffect(() => {
//   if (userDetails) {
//   }
// }, [userDetails]);

//     useEffect(() => {
//         if (userDetails && userDetails.sclassName && userDetails.sclassName._id !== undefined) {
//             dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
//         }
//     }, [dispatch, userDetails]);

//     if (response) { console.log(response) }
//     else if (error) { console.log(error) }

//     const [name, setName] = useState('');
//     const [rollNum, setRollNum] = useState('');
//     const [password, setPassword] = useState('');
//     const [sclassName, setSclassName] = useState('');
//     const [studentSchool, setStudentSchool] = useState('');
//     const [subjectMarks, setSubjectMarks] = useState('');
//     const [subjectAttendance, setSubjectAttendance] = useState([]);

//     const [openStates, setOpenStates] = useState({});

//     const [showPopup, setShowPopup] = useState(false);
//     const [message, setMessage] = useState("");

//     const handleOpen = (subId) => {
//         setOpenStates((prevState) => ({
//             ...prevState,
//             [subId]: !prevState[subId],
//         }));
//     };

//     const [value, setValue] = useState('1');

//     const handleChange = (event, newValue) => {
//         setValue(newValue);
//     };

//     const [selectedSection, setSelectedSection] = useState('table');
//     const handleSectionChange = (event, newSection) => {
//         setSelectedSection(newSection);
//     };

//     const fields = password === ""
//         ? { name, rollNum }
//         : { name, rollNum, password }

//     useEffect(() => {
//         if (userDetails) {
//             setName(userDetails.fullName || '');
//             setRollNum(userDetails.rollNumber || '');
//             setSclassName(userDetails.class || '');
//             setStudentSchool(userDetails.school || '');
//             setSubjectMarks(userDetails.examResult || '');
//             setSubjectAttendance(userDetails.attendance || []);
//         }
//     }, [userDetails]);

//     const submitHandler = (event) => {
//         event.preventDefault()
//         dispatch(updateUser(fields, studentID, address))
//             .then(() => {
//                 dispatch(getUserDetails(studentID, address));
//             })
//             .catch((error) => {
//                 console.error(error)
//             })
//     }

//     const deleteHandler = () => {
//         setMessage("Sorry the delete function has been disabled for now.")
//         setShowPopup(true)

//         // dispatch(deleteUser(studentID, address))
//         //     .then(() => {
//         //         navigate(-1)
//         //     })
//     }

//     const removeHandler = (id, deladdress) => {
//         dispatch(removeStuff(id, deladdress))
//             .then(() => {
//                 dispatch(getUserDetails(studentID, address));
//             })
//     }

//     const removeSubAttendance = (subId) => {
//         dispatch(updateStudentFields(studentID, { subId }, "RemoveStudentSubAtten"))
//             .then(() => {
//                 dispatch(getUserDetails(studentID, address));
//             })
//     }

//     const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
//     const overallAbsentPercentage = 100 - overallAttendancePercentage;

//     const chartData = [
//         { name: 'Present', value: overallAttendancePercentage },
//         { name: 'Absent', value: overallAbsentPercentage }
//     ];

//     const subjectData = Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { subCode, present, sessions }]) => {
//         const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
//         return {
//             subject: subName,
//             attendancePercentage: subjectAttendancePercentage,
//             totalClasses: sessions,
//             attendedClasses: present
//         };
//     });

//     const StudentAttendanceSection = () => {
//         const renderTableSection = () => {
//             return (
//                 <>
//                     <h3>Attendance:</h3>
//                     <Table>
//                         <TableHead>
//                             <StyledTableRow>
//                                 <StyledTableCell>Subject</StyledTableCell>
//                                 <StyledTableCell>Present</StyledTableCell>
//                                 <StyledTableCell>Total Sessions</StyledTableCell>
//                                 <StyledTableCell>Attendance Percentage</StyledTableCell>
//                                 <StyledTableCell align="center">Actions</StyledTableCell>
//                             </StyledTableRow>
//                         </TableHead>
//                         {Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { present, allData, subId, sessions }], index) => {
//                             const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
//                             return (
//                                 <TableBody key={index}>
//                                     <StyledTableRow>
//                                         <StyledTableCell>{subName}</StyledTableCell>
//                                         <StyledTableCell>{present}</StyledTableCell>
//                                         <StyledTableCell>{sessions}</StyledTableCell>
//                                         <StyledTableCell>{subjectAttendancePercentage}%</StyledTableCell>
//                                         <StyledTableCell align="center">
//                                             <Button variant="contained"
//                                                 onClick={() => handleOpen(subId)}>
//                                                 {openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}Details
//                                             </Button>
//                                             <IconButton onClick={() => removeSubAttendance(subId)}>
//                                                 <DeleteIcon color="error" />
//                                             </IconButton>
//                                             <Button variant="contained" sx={styles.attendanceButton}
//                                                 onClick={() => navigate(`/Admin/subject/student/attendance/${studentID}/${subId}`)}>
//                                                 Change
//                                             </Button>
//                                         </StyledTableCell>
//                                     </StyledTableRow>
//                                     <StyledTableRow>
//                                         <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//                                             <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
//                                                 <Box sx={{ margin: 1 }}>
//                                                     <Typography variant="h6" gutterBottom component="div">
//                                                         Attendance Details
//                                                     </Typography>
//                                                     <Table size="small" aria-label="purchases">
//                                                         <TableHead>
//                                                             <StyledTableRow>
//                                                                 <StyledTableCell>Date</StyledTableCell>
//                                                                 <StyledTableCell align="right">Status</StyledTableCell>
//                                                             </StyledTableRow>
//                                                         </TableHead>
//                                                         <TableBody>
//                                                             {allData.map((data, index) => {
//                                                                 const date = new Date(data.date);
//                                                                 const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
//                                                                 return (
//                                                                     <StyledTableRow key={index}>
//                                                                         <StyledTableCell component="th" scope="row">
//                                                                             {dateString}
//                                                                         </StyledTableCell>
//                                                                         <StyledTableCell align="right">{data.status}</StyledTableCell>
//                                                                     </StyledTableRow>
//                                                                 )
//                                                             })}
//                                                         </TableBody>
//                                                     </Table>
//                                                 </Box>
//                                             </Collapse>
//                                         </StyledTableCell>
//                                     </StyledTableRow>
//                                 </TableBody>
//                             )
//                         }
//                         )}
//                     </Table>
//                     <div>
//                         Overall Attendance Percentage: {overallAttendancePercentage.toFixed(2)}%
//                     </div>
//                     <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => removeHandler(studentID, "RemoveStudentAtten")}>Delete All</Button>
//                     <Button variant="contained" sx={styles.styledButton} onClick={() => navigate("/Admin/students/student/attendance/" + studentID)}>
//                         Add Attendance
//                     </Button>
//                 </>
//             )
//         }
//         const renderChartSection = () => {
//             return (
//                 <>
//                     <CustomBarChart chartData={subjectData} dataKey="attendancePercentage" />
//                 </>
//             )
//         }
//         return (
//             <>
//                 {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0
//                     ?
//                     <>
//                         {selectedSection === 'table' && renderTableSection()}
//                         {selectedSection === 'chart' && renderChartSection()}

//                         <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
//                             <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
//                                 <BottomNavigationAction
//                                     label="Table"
//                                     value="table"
//                                     icon={selectedSection === 'table' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
//                                 />
//                                 <BottomNavigationAction
//                                     label="Chart"
//                                     value="chart"
//                                     icon={selectedSection === 'chart' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
//                                 />
//                             </BottomNavigation>
//                         </Paper>
//                     </>
//                     :
//                     <Button variant="contained" sx={styles.styledButton} onClick={() => navigate("/Admin/students/student/attendance/" + studentID)}>
//                         Add Attendance
//                     </Button>
//                 }
//             </>
//         )
//     }

//     const StudentMarksSection = () => {
//         const renderTableSection = () => {
//             return (
//                 <>
//                     <h3>Subject Marks:</h3>
//                     <Table>
//                         <TableHead>
//                             <StyledTableRow>
//                                 <StyledTableCell>Subject</StyledTableCell>
//                                 <StyledTableCell>Marks</StyledTableCell>
//                             </StyledTableRow>
//                         </TableHead>
//                         <TableBody>
//                             {subjectMarks.map((result, index) => {
//                                 if (!result.subName || !result.marksObtained) {
//                                     return null;
//                                 }
//                                 return (
//                                     <StyledTableRow key={index}>
//                                         <StyledTableCell>{result.subName.subName}</StyledTableCell>
//                                         <StyledTableCell>{result.marksObtained}</StyledTableCell>
//                                     </StyledTableRow>
//                                 );
//                             })}
//                         </TableBody>
//                     </Table>
//                     <Button variant="contained" sx={styles.styledButton} onClick={() => navigate("/Admin/students/student/marks/" + studentID)}>
//                         Add Marks
//                     </Button>
//                 </>
//             )
//         }
//         const renderChartSection = () => {
//             return (
//                 <>
//                     <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
//                 </>
//             )
//         }
//         return (
//             <>
//                 {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0
//                     ?
//                     <>
//                         {selectedSection === 'table' && renderTableSection()}
//                         {selectedSection === 'chart' && renderChartSection()}

//                         <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
//                             <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
//                                 <BottomNavigationAction
//                                     label="Table"
//                                     value="table"
//                                     icon={selectedSection === 'table' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
//                                 />
//                                 <BottomNavigationAction
//                                     label="Chart"
//                                     value="chart"
//                                     icon={selectedSection === 'chart' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
//                                 />
//                             </BottomNavigation>
//                         </Paper>
//                     </>
//                     :
//                     <Button variant="contained" sx={styles.styledButton} onClick={() => navigate("/Admin/students/student/marks/" + studentID)}>
//                         Add Marks
//                     </Button>
//                 }
//             </>
//         )
//     }

//     const StudentDetailsSection = () => {
//         return (
//             <div>
//                 Name: {userDetails.fullName}
//                 <br />
//                 Roll Number: {userDetails.rollNumber}
//                 <br />
//                 Class: {sclassName.sclassName}
//                 <br />
//                 {/* School: {studentSchool.schoolName} */}
//                 {
//                     subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 && (
//                         <CustomPieChart data={chartData} />
//                     )
//                 }
//                 <Button variant="contained" sx={styles.styledButton} onClick={deleteHandler}>
//                     Delete
//                 </Button>
//                 <br />
//                 {/* <Button variant="contained" sx={styles.styledButton} className="show-tab" onClick={() => { setShowTab(!showTab) }}>
//                     {
//                         showTab
//                             ? <KeyboardArrowUp />
//                             : <KeyboardArrowDown />
//                     }
//                     Edit Student
//                 </Button>
//                 <Collapse in={showTab} timeout="auto" unmountOnExit>
//                     <div className="register">
//                         <form className="registerForm" onSubmit={submitHandler}>
//                             <span className="registerTitle">Edit Details</span>
//                             <label>Name</label>
//                             <input className="registerInput" type="text" placeholder="Enter user's name..."
//                                 value={name}
//                                 onChange={(event) => setName(event.target.value)}
//                                 autoComplete="name" required />

//                             <label>Roll Number</label>
//                             <input className="registerInput" type="number" placeholder="Enter user's Roll Number..."
//                                 value={rollNum}
//                                 onChange={(event) => setRollNum(event.target.value)}
//                                 required />

//                             <label>Password</label>
//                             <input className="registerInput" type="password" placeholder="Enter user's password..."
//                                 value={password}
//                                 onChange={(event) => setPassword(event.target.value)}
//                                 autoComplete="new-password" />

//                             <button className="registerButton" type="submit" >Update</button>
//                         </form>
//                     </div>
//                 </Collapse> */}
//             </div>
//         )
//     }

//     return (
//         <>
//             {loading
//                 ?
//                 <>
//                     <div>Loading...</div>
//                 </>
//                 :
//                 <>
//                     <Box sx={{ width: '100%', typography: 'body1', }} >
//                         <TabContext value={value}>
//                             <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//                                 <TabList onChange={handleChange} sx={{ position: 'fixed', width: '100%', bgcolor: 'background.paper', zIndex: 1 }}>
//                                     <Tab label="Details" value="1" />
//                                     <Tab label="Attendance" value="2" />
//                                     <Tab label="Marks" value="3" />
//                                 </TabList>
//                             </Box>
//                             <Container sx={{ marginTop: "3rem", marginBottom: "4rem" }}>
//                                 <TabPanel value="1">
//                                     <StudentDetailsSection />
//                                 </TabPanel>
//                                 <TabPanel value="2">
//                                     <StudentAttendanceSection />
//                                 </TabPanel>
//                                 <TabPanel value="3">
//                                     <StudentMarksSection />
//                                 </TabPanel>
//                             </Container>
//                         </TabContext>
//                     </Box>
//                 </>
//             }
//             <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />

//         </>
//     )
// }

// export default ViewStudent

// const styles = {
//     attendanceButton: {
//         marginLeft: "20px",
//         backgroundColor: "#270843",
//         "&:hover": {
//             backgroundColor: "#3f1068",
//         }
//     },
//     styledButton: {
//         margin: "20px",
//         backgroundColor: "#02250b",
//         "&:hover": {
//             backgroundColor: "#106312",
//         }
//     }
// }
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../../redux/userRelated/userHandle';
import { useParams } from 'react-router-dom';
import { Box, Paper, Typography, Grid, Divider, Container } from '@mui/material';

// Photo box component for fixed-size, circular photo display
const PhotoBox = ({ photo }) => {
  const backendUrl = "http://localhost:5001"; // Change to your backend base url or env var

  const src = photo
    ? `${backendUrl}/${photo}`              // e.g. http://localhost:5001/uploads/students/filename.jpg
    : "/default-avatar.jpg";                // fallback default avatar

  return (
    <Box
      sx={{
        width: 180,
        height: 180,
        mb: 2,
        mx: "auto",
        borderRadius: "50%",
        overflow: "hidden",
        boxShadow: 3,
        backgroundColor: "#f5f5f5",
        border: "2px solid #DADADA"
      }}
    >
      <img
        src={src}
        alt="Student"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </Box>
  );
};

const ViewStudent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userDetails, loading } = useSelector(state => state.user);

  // Fetch student details on mount or id change
  useEffect(() => {
    dispatch(getUserDetails(id, "Student"));
  }, [dispatch, id]);

  if (!userDetails || loading) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  // Destructure with safe defaults
  const {
    fullName = "",
    roll = "",
    rollNumber = "",
    photo = "",
    admissionNumber = "",
    dob = "",
    gender = "",
    bloodGroup = "",
    nationality = "",
    religion = "",
    mobile = "",
    email = "",
    address = "",
    city = "",
    state = "",
    pinCode = "",
    parentDetails = {},
    class: classObj = {},
    section = "",
    academicYear = "",
    admissionDate = "",
    admissionMode = "",
    previousSchool = "",
    scholarship = "",
  } = userDetails;

  const displayRoll = roll || rollNumber;

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4, boxShadow: 4 }}>
        {/* Photo and Name */}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <PhotoBox photo={photo} />
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {fullName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Roll No: {displayRoll} | Admission Number: {admissionNumber}
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* Personal and Contact Details */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Personal Details
            </Typography>
            <Typography><b>Date of Birth:</b> {dob && dob.slice(0, 10)}</Typography>
            <Typography><b>Gender:</b> {gender}</Typography>
            <Typography><b>Blood Group:</b> {bloodGroup}</Typography>
            <Typography><b>Nationality:</b> {nationality}</Typography>
            <Typography><b>Religion:</b> {religion}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Contact Details
            </Typography>
            <Typography><b>Mobile:</b> {mobile}</Typography>
            <Typography><b>Email:</b> {email}</Typography>
            <Typography><b>Address:</b> {address}</Typography>
            <Typography>
              <b>City:</b> {city}, <b>State:</b> {state}, <b>PIN Code:</b> {pinCode}
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />

        {/* Parent / Guardian Details */}
        <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }} gutterBottom>
          Parent / Guardian Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography>
              <b>Father Name:</b> {parentDetails.fatherName || "-"}<br />
              <b>Occupation:</b> {parentDetails.fatherOccupation || "-"}<br />
              <b>Mobile:</b> {parentDetails.fatherMobile || "-"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>
              <b>Mother Name:</b> {parentDetails.motherName || "-"}<br />
              <b>Occupation:</b> {parentDetails.motherOccupation || "-"}<br />
              <b>Mobile:</b> {parentDetails.motherMobile || "-"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <b>Guardian Name:</b> {parentDetails.guardianName || "-"}<br />
              <b>Relation:</b> {parentDetails.guardianRelation || "-"}<br />
              <b>Contact:</b> {parentDetails.guardianContact || "-"}<br />
              <b>Address:</b> {parentDetails.guardianAddress || "-"}
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />

        {/* Academic Details */}
        <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }} gutterBottom>
          Academic Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography>
              <b>Class:</b> {classObj?.sclassName || classObj?.name || "-"} <br />
              <b>Section:</b> {section || "-"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>
              <b>Academic Year:</b> {academicYear || "-"} <br />
              <b>Admission Date:</b> {admissionDate && admissionDate.slice(0, 10)} <br />
              <b>Admission Mode:</b> {admissionMode || "-"} <br />
              <b>Previous School:</b> {previousSchool || "-"} <br />
              <b>Scholarship:</b> {scholarship || "-"}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ViewStudent;

