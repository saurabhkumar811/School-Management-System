// 25/7/2025 se bhi pehle ka commented hai 
// import React, { useEffect, useState } from 'react'
// import { Container, Grid, Paper, Typography } from '@mui/material'
// import { useDispatch, useSelector } from 'react-redux';
// import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
// import CustomPieChart from '../../components/CustomPieChart';
// import { getUserDetails } from '../../redux/userRelated/userHandle';
// import styled from 'styled-components';
// import SeeNotice from '../../components/SeeNotice';
// import CountUp from 'react-countup';
// import Subject from "../../assets/subjects.svg";
// import Assignment from "../../assets/assignment.svg";
// import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';

// const StudentHomePage = () => {
//     const dispatch = useDispatch();

//     const { userDetails, currentUser, loading, response } = useSelector((state) => state.user);
//     const { subjectsList } = useSelector((state) => state.sclass);

//     const [subjectAttendance, setSubjectAttendance] = useState([]);

//     const classID = currentUser.sclassName._id

//     useEffect(() => {
//         dispatch(getUserDetails(currentUser._id, "Student"));
//         dispatch(getSubjectList(classID, "ClassSubjects"));
//     }, [dispatch, currentUser._id, classID]);

//     const numberOfSubjects = subjectsList && subjectsList.length;

//     useEffect(() => {
//         if (userDetails) {
//             setSubjectAttendance(userDetails.attendance || []);
//         }
//     }, [userDetails])

//     const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
//     const overallAbsentPercentage = 100 - overallAttendancePercentage;

//     const chartData = [
//         { name: 'Present', value: overallAttendancePercentage },
//         { name: 'Absent', value: overallAbsentPercentage }
//     ];
//     return (
//         <>
//             <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//                 <Grid container spacing={3}>
//                     <Grid item xs={12} md={3} lg={3}>
//                         <StyledPaper>
//                             <img src={Subject} alt="Subjects" />
//                             <Title>
//                                 Total Subjects
//                             </Title>
//                             <Data start={0} end={numberOfSubjects} duration={2.5} />
//                         </StyledPaper>
//                     </Grid>
//                     <Grid item xs={12} md={3} lg={3}>
//                         <StyledPaper>
//                             <img src={Assignment} alt="Assignments" />
//                             <Title>
//                                 Total Assignments
//                             </Title>
//                             <Data start={0} end={15} duration={4} />
//                         </StyledPaper>
//                     </Grid>
//                     <Grid item xs={12} md={4} lg={3}>
//                         <ChartContainer>
//                             {
//                                 response ?
//                                     <Typography variant="h6">No Attendance Found</Typography>
//                                     :
//                                     <>
//                                         {loading
//                                             ? (
//                                                 <Typography variant="h6">Loading...</Typography>
//                                             )
//                                             :
//                                             <>
//                                                 {
//                                                     subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
//                                                         <>
//                                                             <CustomPieChart data={chartData} />
//                                                         </>
//                                                     )
//                                                         :
//                                                         <Typography variant="h6">No Attendance Found</Typography>
//                                                 }
//                                             </>
//                                         }
//                                     </>
//                             }
//                         </ChartContainer>
//                     </Grid>
//                     <Grid item xs={12}>
//                         <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
//                             <SeeNotice />
//                         </Paper>
//                     </Grid>
//                 </Grid>
//             </Container>
//         </>
//     )
// }

// const ChartContainer = styled.div`
//   padding: 2px;
//   display: flex;
//   flex-direction: column;
//   height: 240px;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
// `;

// const StyledPaper = styled(Paper)`
//   padding: 16px;
//   display: flex;
//   flex-direction: column;
//   height: 200px;
//   justify-content: space-between;
//   align-items: center;
//   text-align: center;
// `;

// const Title = styled.p`
//   font-size: 1.25rem;
// `;

// const Data = styled(CountUp)`
//   font-size: calc(1.3rem + .6vw);
//   color: green;
// `;



// export default StudentHomePage












// commented after saurav update   25/7/25
// import React, { useEffect, useState } from 'react'
// import { Container, Grid, Paper, Typography } from '@mui/material'
// import { useDispatch, useSelector } from 'react-redux';
// import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
// import CustomPieChart from '../../components/CustomPieChart';
// import { getUserDetails } from '../../redux/userRelated/userHandle';
// import styled from 'styled-components';
// import SeeNotice from '../../components/SeeNotice';
// import CountUp from 'react-countup';
// import Subject from "../../assets/subjects.svg";
// import Assignment from "../../assets/assignment.svg";
// import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';

// const StudentHomePage = () => {
//     const dispatch = useDispatch();

//     // Redux hooks
//     const { userDetails, currentUser, loading, response } = useSelector((state) => state.user);
//     const { subjectsList } = useSelector((state) => state.sclass);

//     const [subjectAttendance, setSubjectAttendance] = useState([]);

//     // 💡 Robust: guard for currentUser and sclassName
//     const classID = currentUser?.sclassName?._id;

//     // Only run effects when currentUser and classID are present:
//     useEffect(() => {
//         if (!currentUser?._id || !classID) return;
//         dispatch(getUserDetails(currentUser._id, "Student"));
//         dispatch(getSubjectList(classID, "ClassSubjects"));
//     }, [dispatch, currentUser?._id, classID]);

//     useEffect(() => {
//         if (userDetails) {
//             setSubjectAttendance(userDetails.attendance || []);
//         }
//     }, [userDetails]);

//     const numberOfSubjects = Array.isArray(subjectsList) ? subjectsList.length : 0;

//     const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance || []);
//     const overallAbsentPercentage = 100 - overallAttendancePercentage;

//     const chartData = [
//         { name: 'Present', value: overallAttendancePercentage },
//         { name: 'Absent', value: overallAbsentPercentage }
//     ];

//     // ✅ Show a loading spinner or message until Redux/user is hydrated:
//     if (!currentUser?.sclassName?._id) {
//         return (
//             <Container maxWidth="lg" sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
//                 <Typography variant="h6" sx={{ mt: 10 }}>Loading your profile...</Typography>
//             </Container>
//         )
//     }

//     return (
//         <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//             <Grid container spacing={3}>
//                 <Grid item xs={12} md={3} lg={3}>
//                     <StyledPaper>
//                         <img src={Subject} alt="Subjects" />
//                         <Title>Total Subjects</Title>
//                         <Data start={0} end={numberOfSubjects} duration={2.5} />
//                     </StyledPaper>
//                 </Grid>
//                 <Grid item xs={12} md={3} lg={3}>
//                     <StyledPaper>
//                         <img src={Assignment} alt="Assignments" />
//                         <Title>Total Assignments</Title>
//                         <Data start={0} end={15} duration={4} />
//                     </StyledPaper>
//                 </Grid>
//                 <Grid item xs={12} md={4} lg={3}>
//                     <ChartContainer>
//                         {response ? (
//                             <Typography variant="h6">No Attendance Found</Typography>
//                         ) : loading ? (
//                             <Typography variant="h6">Loading...</Typography>
//                         ) : (
//                             subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ?
//                                 <CustomPieChart data={chartData} /> :
//                                 <Typography variant="h6">No Attendance Found</Typography>
//                         )}
//                     </ChartContainer>
//                 </Grid>
//                 <Grid item xs={12}>
//                     <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
//                         <SeeNotice />
//                     </Paper>
//                 </Grid>
//             </Grid>
//         </Container>
//     )
// }

// const ChartContainer = styled.div`
//   padding: 2px;
//   display: flex;
//   flex-direction: column;
//   height: 240px;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
// `;

// const StyledPaper = styled(Paper)`
//   padding: 16px;
//   display: flex;
//   flex-direction: column;
//   height: 200px;
//   justify-content: space-between;
//   align-items: center;
//   text-align: center;
// `;

// const Title = styled.p`
//   font-size: 1.25rem;
// `;

// const Data = styled(CountUp)`
//   font-size: calc(1.3rem + .6vw);
//   color: green;
// `;

// export default StudentHomePage;


import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import styled from 'styled-components';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import Subject from "../../assets/subjects.svg";
import Assignment from "../../assets/assignment.svg";
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';

const StudentHomePage = () => {
  const dispatch = useDispatch();

  const { userDetails, currentUser, loading, response } = useSelector((state) => state.user);
  const { subjectsList } = useSelector((state) => state.sclass);

  const [subjectAttendance, setSubjectAttendance] = useState([]);

  // Get the student's class ID robustly
  // Prefer userDetails.class, fallback to currentUser.class
  const userClass = userDetails?.class || currentUser?.class || currentUser?.sclassName;
  // Handle if class is either object or just id
  const classID = typeof userClass === "object" && userClass !== null ? userClass._id : userClass;

  useEffect(() => {
    // Only trigger fetch if both _id and classID are present
    if (!currentUser?._id || !classID) return;
    dispatch(getUserDetails(currentUser._id, "Student"));
    dispatch(getSubjectList(classID, "ClassSubjects"));
  }, [dispatch, currentUser?._id, classID]);

  useEffect(() => {
    if (userDetails) {
      setSubjectAttendance(userDetails.attendance || []);
    }
  }, [userDetails]);

  const numberOfSubjects = Array.isArray(subjectsList) ? subjectsList.length : 0;
  const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance || []);
  const overallAbsentPercentage = 100 - overallAttendancePercentage;

  const chartData = [
    { name: 'Present', value: overallAttendancePercentage },
    { name: 'Absent', value: overallAbsentPercentage }
  ];

  // Main loading/empty state check using robust classID check
  if (!classID) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ mt: 10 }}>Loading your profile...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3} lg={3}>
          <StyledPaper>
            <img src={Subject} alt="Subjects" />
            <Title>Total Subjects</Title>
            <Data start={0} end={numberOfSubjects} duration={2.5} />
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          <StyledPaper>
            <img src={Assignment} alt="Assignments" />
            <Title>Total Assignments</Title>
            <Data start={0} end={15} duration={4} />
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <ChartContainer>
            {loading ? (
              <Typography variant="h6">Loading...</Typography>
            ) : response ? (
              <Typography variant="h6">No Attendance Found</Typography>
            ) : subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
              <CustomPieChart data={chartData} />
            ) : (
              <Typography variant="h6">No Attendance Found</Typography>
            )}
          </ChartContainer>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <SeeNotice />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

const ChartContainer = styled.div`
  padding: 2px;
  display: flex;
  flex-direction: column;
  height: 240px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const Title = styled.p`
  font-size: 1.25rem;
`;

const Data = styled(CountUp)`
  font-size: calc(1.3rem + 0.6vw);
  color: green;
`;

export default StudentHomePage;
