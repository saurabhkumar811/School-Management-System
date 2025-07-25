// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
// import { BottomNavigation, BottomNavigationAction, Container, Paper, Table, TableBody, TableHead, Typography } from '@mui/material';
// import { getUserDetails } from '../../redux/userRelated/userHandle';
// import CustomBarChart from '../../components/CustomBarChart'

// import InsertChartIcon from '@mui/icons-material/InsertChart';
// import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
// import TableChartIcon from '@mui/icons-material/TableChart';
// import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
// import { StyledTableCell, StyledTableRow } from '../../components/styles';

// const StudentSubjects = () => {

//     const dispatch = useDispatch();
//     const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
//     const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

//     useEffect(() => {
//         dispatch(getUserDetails(currentUser._id, "Student"));
//     }, [dispatch, currentUser._id])

//     if (response) { console.log(response) }
//     else if (error) { console.log(error) }

//     const [subjectMarks, setSubjectMarks] = useState([]);
//     const [selectedSection, setSelectedSection] = useState('table');

//     useEffect(() => {
//         if (userDetails) {
//             setSubjectMarks(userDetails.examResult || []);
//         }
//     }, [userDetails])

//     useEffect(() => {
//         if (subjectMarks === []) {
//             dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
//         }
//     }, [subjectMarks, dispatch, currentUser.sclassName._id]);

//     const handleSectionChange = (event, newSection) => {
//         setSelectedSection(newSection);
//     };

//     const renderTableSection = () => {
//         return (
//             <>
//                 <Typography variant="h4" align="center" gutterBottom>
//                     Subject Marks
//                 </Typography>
//                 <Table>
//                     <TableHead>
//                         <StyledTableRow>
//                             <StyledTableCell>Subject</StyledTableCell>
//                             <StyledTableCell>Marks</StyledTableCell>
//                         </StyledTableRow>
//                     </TableHead>
//                     <TableBody>
//                         {subjectMarks.map((result, index) => {
//                             if (!result.subName || !result.marksObtained) {
//                                 return null;
//                             }
//                             return (
//                                 <StyledTableRow key={index}>
//                                     <StyledTableCell>{result.subName.subName}</StyledTableCell>
//                                     <StyledTableCell>{result.marksObtained}</StyledTableCell>
//                                 </StyledTableRow>
//                             );
//                         })}
//                     </TableBody>
//                 </Table>
//             </>
//         );
//     };

//     const renderChartSection = () => {
//         return <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />;
//     };

//     const renderClassDetailsSection = () => {
//         return (
//             <Container>
//                 <Typography variant="h4" align="center" gutterBottom>
//                     Class Details
//                 </Typography>
//                 <Typography variant="h5" gutterBottom>
//                     You are currently in Class {sclassDetails && sclassDetails.sclassName}
//                 </Typography>
//                 <Typography variant="h6" gutterBottom>
//                     And these are the subjects:
//                 </Typography>
//                 {subjectsList &&
//                     subjectsList.map((subject, index) => (
//                         <div key={index}>
//                             <Typography variant="subtitle1">
//                                 {subject.subName} ({subject.subCode})
//                             </Typography>
//                         </div>
//                     ))}
//             </Container>
//         );
//     };

//     return (
//         <>
//             {loading ? (
//                 <div>Loading...</div>
//             ) : (
//                 <div>
//                     {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0
//                         ?
//                         (<>
//                             {selectedSection === 'table' && renderTableSection()}
//                             {selectedSection === 'chart' && renderChartSection()}

//                             <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
//                                 <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
//                                     <BottomNavigationAction
//                                         label="Table"
//                                         value="table"
//                                         icon={selectedSection === 'table' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
//                                     />
//                                     <BottomNavigationAction
//                                         label="Chart"
//                                         value="chart"
//                                         icon={selectedSection === 'chart' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
//                                     />
//                                 </BottomNavigation>
//                             </Paper>
//                         </>)
//                         :
//                         (<>
//                             {renderClassDetailsSection()}
//                         </>)
//                     }
//                 </div>
//             )}
//         </>
//     );
// };

// export default StudentSubjects;














// commented after saurav update   25/7/25
// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
// import { BottomNavigation, BottomNavigationAction, Container, Paper, Table, TableBody, TableHead, Typography } from '@mui/material';
// import { getUserDetails } from '../../redux/userRelated/userHandle';
// import CustomBarChart from '../../components/CustomBarChart'

// import InsertChartIcon from '@mui/icons-material/InsertChart';
// import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
// import TableChartIcon from '@mui/icons-material/TableChart';
// import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
// import { StyledTableCell, StyledTableRow } from '../../components/styles';

// const StudentSubjects = () => {
//     const dispatch = useDispatch();
//     const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
//     const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

//     const [subjectMarks, setSubjectMarks] = useState([]);
//     const [selectedSection, setSelectedSection] = useState('table');

//     useEffect(() => {
//         if (!currentUser?._id) return;
//         dispatch(getUserDetails(currentUser._id, "Student"));
//     }, [dispatch, currentUser?._id]);

//     useEffect(() => {
//         if (userDetails) setSubjectMarks(userDetails.examResult || []);
//     }, [userDetails]);

//     useEffect(() => {
//         if (
//             subjectMarks.length === 0 &&
//             currentUser?.sclassName?._id
//         ) {
//             dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
//         }
//     }, [subjectMarks.length, dispatch, currentUser?.sclassName?._id]);

//     const handleSectionChange = (event, newSection) => {
//         setSelectedSection(newSection);
//     };

//     const renderTableSection = () => (
//         <>
//             <Typography variant="h4" align="center" gutterBottom>Subject Marks</Typography>
//             <Table>
//                 <TableHead>
//                     <StyledTableRow>
//                         <StyledTableCell>Subject</StyledTableCell>
//                         <StyledTableCell>Marks</StyledTableCell>
//                     </StyledTableRow>
//                 </TableHead>
//                 <TableBody>
//                     {subjectMarks.map((result, index) => (
//                         result.subName && result.marksObtained ?
//                             <StyledTableRow key={index}>
//                                 <StyledTableCell>{result.subName.subName}</StyledTableCell>
//                                 <StyledTableCell>{result.marksObtained}</StyledTableCell>
//                             </StyledTableRow>
//                             : null
//                     ))}
//                 </TableBody>
//             </Table>
//         </>
//     );

//     const renderChartSection = () => (
//         <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
//     );

//     const renderClassDetailsSection = () => (
//         <Container>
//             <Typography variant="h4" align="center" gutterBottom>
//                 Class Details
//             </Typography>
//             <Typography variant="h5" gutterBottom>
//                 You are currently in Class {sclassDetails && sclassDetails.sclassName}
//             </Typography>
//             <Typography variant="h6" gutterBottom>
//                 And these are the subjects:
//             </Typography>
//             {subjectsList && subjectsList.map((subject, index) => (
//                 <div key={index}>
//                     <Typography variant="subtitle1">
//                         {subject.subName} ({subject.subCode})
//                     </Typography>
//                 </div>
//             ))}
//         </Container>
//     );

//     if (!currentUser?.sclassName?._id) return <div>Loading...</div>

//     return (
//         <>
//             {loading ? (
//                 <div>Loading...</div>
//             ) : (
//                 <div>
//                     {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0 ? (
//                         <>
//                             {selectedSection === 'table' && renderTableSection()}
//                             {selectedSection === 'chart' && renderChartSection()}
//                             <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
//                                 <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
//                                     <BottomNavigationAction
//                                         label="Table"
//                                         value="table"
//                                         icon={selectedSection === 'table' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
//                                     />
//                                     <BottomNavigationAction
//                                         label="Chart"
//                                         value="chart"
//                                         icon={selectedSection === 'chart' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
//                                     />
//                                 </BottomNavigation>
//                             </Paper>
//                         </>
//                     ) : (
//                         renderClassDetailsSection()
//                     )}
//                 </div>
//             )}
//         </>
//     );
// };

// export default StudentSubjects;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { BottomNavigation, BottomNavigationAction, Container, Paper, Table, TableBody, TableHead, Typography } from '@mui/material';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import CustomBarChart from '../../components/CustomBarChart';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { StyledTableCell, StyledTableRow } from '../../components/styles';

const StudentSubjects = () => {
  const dispatch = useDispatch();
  const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
  const { userDetails, currentUser, loading } = useSelector((state) => state.user);

  const [subjectMarks, setSubjectMarks] = useState([]);
  const [selectedSection, setSelectedSection] = useState('table');

  // Robustly get the user's class info, handling both object or id string
  const userClass = userDetails?.class || currentUser?.class || currentUser?.sclassName;
  const classID = userClass && typeof userClass === "object" && userClass !== null ? userClass._id : userClass;

  useEffect(() => {
    if (!currentUser?._id) return;
    dispatch(getUserDetails(currentUser._id, "Student"));
  }, [dispatch, currentUser?._id]);

  useEffect(() => {
    if (userDetails) {
      setSubjectMarks(userDetails.examResult || []);
    }
  }, [userDetails]);

  useEffect(() => {
    if (subjectMarks.length === 0 && classID) {
      dispatch(getSubjectList(classID, "ClassSubjects"));
    }
  }, [subjectMarks.length, dispatch, classID]);

  const handleSectionChange = (event, newSection) => {
    setSelectedSection(newSection);
  };

  const renderTableSection = () => (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Subject Marks
      </Typography>
      <Table>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Subject</StyledTableCell>
            <StyledTableCell>Marks</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {subjectMarks.map((result, index) =>
            result.subName && result.marksObtained != null ? (
              <StyledTableRow key={index}>
                <StyledTableCell>
                  {typeof result.subName === 'object' ? result.subName.subName : result.subName}
                </StyledTableCell>
                <StyledTableCell>{result.marksObtained}</StyledTableCell>
              </StyledTableRow>
            ) : null
          )}
        </TableBody>
      </Table>
    </>
  );

  const renderChartSection = () => (
    <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
  );

  const renderClassDetailsSection = () => (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Class Details
      </Typography>
      <Typography variant="h5" gutterBottom>
        You are currently in Class {sclassDetails && sclassDetails.sclassName}
      </Typography>
      <Typography variant="h6" gutterBottom>
        And these are the subjects:
      </Typography>
      {subjectsList && subjectsList.map((subject, index) => (
        <div key={index}>
          <Typography variant="subtitle1">
            {subject.subName} ({subject.subCode})
          </Typography>
        </div>
      ))}
    </Container>
  );

  if (!classID) return <div>Loading...</div>;

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0 ? (
            <>
              {selectedSection === 'table' && renderTableSection()}
              {selectedSection === 'chart' && renderChartSection()}
              <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
                  <BottomNavigationAction
                    label="Table"
                    value="table"
                    icon={selectedSection === 'table' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
                  />
                  <BottomNavigationAction
                    label="Chart"
                    value="chart"
                    icon={selectedSection === 'chart' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
                  />
                </BottomNavigation>
              </Paper>
            </>
          ) : (
            renderClassDetailsSection()
          )}
        </div>
      )}
    </>
  );
};

export default StudentSubjects;
