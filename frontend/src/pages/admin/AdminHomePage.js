// import { Container, Grid, Paper } from '@mui/material'
// import SeeNotice from '../../components/SeeNotice';
// import Students from "../../assets/img1.png";
// import Classes from "../../assets/img2.png";
// import Teachers from "../../assets/img3.png";
// import Fees from "../../assets/img4.png";
// import styled from 'styled-components';
// import CountUp from 'react-countup';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
// import { getStudents } from '../../redux/studentRelated/studentHandle';
// import { getTeachers } from '../../redux/teacherRelated/teacherHandle';

// const AdminHomePage = () => {
//     const dispatch = useDispatch();
//     const { students } = useSelector((state) => state.student);
//     const { sclassesList } = useSelector((state) => state.sclass);
//     const { teachersList } = useSelector((state) => state.teacher);

//     const { currentUser } = useSelector(state => state.user)

//     const adminID = currentUser._id
//     console.log("Students : ",students);
//     useEffect(() => {
//         dispatch(getStudents(adminID));
//         dispatch(getAllSclasses(adminID, "Sclass"));
//         dispatch(getTeachers(adminID));
//     }, [adminID, dispatch]);

//     const numberOfStudents = students && students.length;
//     const numberOfClasses = sclassesList && sclassesList.length;
//     const numberOfTeachers = teachersList && teachersList.length;

//     return (
//         <>
//             <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//                 <Grid container spacing={3}>
//                     <Grid item xs={12} md={3} lg={3}>
//                         <StyledPaper>
//                             <img src={Students} alt="Students" />
//                             <Title>
//                                 Total Students
//                             </Title>
//                             <Data start={0} end={numberOfStudents} duration={2.5} />
//                         </StyledPaper>
//                     </Grid>
//                     <Grid item xs={12} md={3} lg={3}>
//                         <StyledPaper>
//                             <img src={Classes} alt="Classes" />
//                             <Title>
//                                 Total Classes
//                             </Title>
//                             <Data start={0} end={numberOfClasses} duration={5} />
//                         </StyledPaper>
//                     </Grid>
//                     <Grid item xs={12} md={3} lg={3}>
//                         <StyledPaper>
//                             <img src={Teachers} alt="Teachers" />
//                             <Title>
//                                 Total Teachers
//                             </Title>
//                             <Data start={0} end={numberOfTeachers} duration={2.5} />
//                         </StyledPaper>
//                     </Grid>
//                     <Grid item xs={12} md={3} lg={3}>
//                         <StyledPaper>
//                             <img src={Fees} alt="Fees" />
//                             <Title>
//                                 Fees Collection
//                             </Title>
//                             <Data start={0} end={23000} duration={2.5} prefix="$" />                        </StyledPaper>
//                     </Grid>
//                     <Grid item xs={12} md={12} lg={12}>
//                         <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
//                             <SeeNotice />
//                         </Paper>
//                     </Grid>
//                 </Grid>
//             </Container>
//         </>
//     );
// };


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

// export default AdminHomePage
import { Container, Grid, Paper } from '@mui/material'
import SeeNotice from '../../components/SeeNotice';
import Students from "../../assets/img1.png";
import Classes from "../../assets/img2.png";
import Teachers from "../../assets/img3.png";
import Fees from "../../assets/img4.png";
import styled from 'styled-components';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getStudents } from '../../redux/studentRelated/studentHandle';
import { getTeachers } from '../../redux/teacherRelated/teacherHandle';

const AdminHomePage = () => {
    const dispatch = useDispatch();
    // 💡 Use studentsList and safe fallback
    const studentsList = useSelector((state) => state.student.studentsList) || [];
    const sclassesList = useSelector((state) => state.sclass.sclassesList) || [];
    const teachersList = useSelector((state) => state.teacher.teachersList) || [];
    const { currentUser } = useSelector(state => state.user);

    // Only fire effect if currentUser is ready (for hydration/etc guards)
    useEffect(() => {
        if (currentUser?._id) {
            dispatch(getStudents(currentUser._id));
            dispatch(getAllSclasses(currentUser._id, "Sclass"));
            dispatch(getTeachers(currentUser._id));
        }
    }, [currentUser?._id, dispatch]);

    const numberOfStudents = studentsList.length;
    const numberOfClasses = sclassesList.length;
    const numberOfTeachers = teachersList.length;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3} lg={3}>
                    <StyledPaper>
                        <img src={Students} alt="Students" />
                        <Title>
                            Total Students
                        </Title>
                        <Data start={0} end={numberOfStudents} duration={2.5} />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <StyledPaper>
                        <img src={Classes} alt="Classes" />
                        <Title>
                            Total Classes
                        </Title>
                        <Data start={0} end={numberOfClasses} duration={5} />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <StyledPaper>
                        <img src={Teachers} alt="Teachers" />
                        <Title>
                            Total Teachers
                        </Title>
                        <Data start={0} end={numberOfTeachers} duration={2.5} />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <StyledPaper>
                        <img src={Fees} alt="Fees" />
                        <Title>
                            Fees Collection
                        </Title>
                        <Data start={0} end={23000} duration={2.5} prefix="$" />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <SeeNotice />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

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
  font-size: calc(1.3rem + .6vw);
  color: green;
`;

export default AdminHomePage
