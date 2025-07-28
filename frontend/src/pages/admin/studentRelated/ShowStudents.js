// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from "react-router-dom";
// import { getStudents } from '../../../redux/studentRelated/studentHandle';
// import { deleteUser } from '../../../redux/userRelated/userHandle';
// import {
//     Paper, Box, IconButton
// } from '@mui/material';
// import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
// import { BlackButton, BlueButton, GreenButton } from '../../../components/buttonStyles';
// import TableTemplate from '../../../components/TableTemplate';
// import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
// import SpeedDialTemplate from '../../../components/SpeedDialTemplate';

// import * as React from 'react';
// import Button from '@mui/material/Button';
// import ButtonGroup from '@mui/material/ButtonGroup';
// // import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
// import ClickAwayListener from '@mui/material/ClickAwayListener';
// import Grow from '@mui/material/Grow';
// import Popper from '@mui/material/Popper';
// import MenuItem from '@mui/material/MenuItem';
// import MenuList from '@mui/material/MenuList';
// import Popup from '../../../components/Popup';

// const ShowStudents = () => {

//     const navigate = useNavigate()
//     const dispatch = useDispatch();
//     const { studentsList, loading, error, response } = useSelector((state) => state.student);
//     const { currentUser } = useSelector(state => state.user)

//     useEffect(() => {
//         dispatch(getStudents(currentUser._id));
//     }, [currentUser._id, dispatch]);

//     if (error) {
//         console.log(error);
//     }

//     const [showPopup, setShowPopup] = React.useState(false);
//     const [message, setMessage] = React.useState("");

//     const deleteHandler = (deleteID, address) => {
//         console.log(deleteID);
//         console.log(address);
//         setMessage("Sorry the delete function has been disabled for now.")
//         setShowPopup(true)

//         // dispatch(deleteUser(deleteID, address))
//         //     .then(() => {
//         //         dispatch(getStudents(currentUser._id));
//         //     })
//     }

//     const studentColumns = [
//         { id: 'name', label: 'Name', minWidth: 170 },
//         { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
//         { id: 'sclassName', label: 'Class', minWidth: 170 },
//     ]

//     const studentRows = studentsList && studentsList.length > 0 && studentsList.map((student) => {
//         return {
//             name: student.name,
//             rollNum: student.rollNum,
//             sclassName: student.sclassName.sclassName,
//             id: student._id,
//         };
//     })

//     const StudentButtonHaver = ({ row }) => {
//         const options = ['Take Attendance', 'Provide Marks'];

//         const [open, setOpen] = React.useState(false);
//         const anchorRef = React.useRef(null);
//         const [selectedIndex, setSelectedIndex] = React.useState(0);

//         const handleClick = () => {
//             console.info(`You clicked ${options[selectedIndex]}`);
//             if (selectedIndex === 0) {
//                 handleAttendance();
//             } else if (selectedIndex === 1) {
//                 handleMarks();
//             }
//         };

//         const handleAttendance = () => {
//             navigate("/Admin/students/student/attendance/" + row.id)
//         }
//         const handleMarks = () => {
//             navigate("/Admin/students/student/marks/" + row.id)
//         };

//         const handleMenuItemClick = (event, index) => {
//             setSelectedIndex(index);
//             setOpen(false);
//         };

//         const handleToggle = () => {
//             setOpen((prevOpen) => !prevOpen);
//         };

//         const handleClose = (event) => {
//             if (anchorRef.current && anchorRef.current.contains(event.target)) {
//                 return;
//             }

//             setOpen(false);
//         };
//         return (
//             <>
//                 <IconButton onClick={() => deleteHandler(row.id, "Student")}>
//                     <PersonRemoveIcon color="error" />
//                 </IconButton>
//                 <BlueButton variant="contained"
//                     onClick={() => navigate("/Admin/students/student/" + row.id)}>
//                     View
//                 </BlueButton>
//                 <React.Fragment>
//                     <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
//                         <Button onClick={handleClick}>{options[selectedIndex]}</Button>
//                         <BlackButton
//                             size="small"
//                             aria-controls={open ? 'split-button-menu' : undefined}
//                             aria-expanded={open ? 'true' : undefined}
//                             aria-label="select merge strategy"
//                             aria-haspopup="menu"
//                             onClick={handleToggle}
//                         >
//                             {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
//                         </BlackButton>
//                     </ButtonGroup>
//                     <Popper
//                         sx={{
//                             zIndex: 1,
//                         }}
//                         open={open}
//                         anchorEl={anchorRef.current}
//                         role={undefined}
//                         transition
//                         disablePortal
//                     >
//                         {({ TransitionProps, placement }) => (
//                             <Grow
//                                 {...TransitionProps}
//                                 style={{
//                                     transformOrigin:
//                                         placement === 'bottom' ? 'center top' : 'center bottom',
//                                 }}
//                             >
//                                 <Paper>
//                                     <ClickAwayListener onClickAway={handleClose}>
//                                         <MenuList id="split-button-menu" autoFocusItem>
//                                             {options.map((option, index) => (
//                                                 <MenuItem
//                                                     key={option}
//                                                     disabled={index === 2}
//                                                     selected={index === selectedIndex}
//                                                     onClick={(event) => handleMenuItemClick(event, index)}
//                                                 >
//                                                     {option}
//                                                 </MenuItem>
//                                             ))}
//                                         </MenuList>
//                                     </ClickAwayListener>
//                                 </Paper>
//                             </Grow>
//                         )}
//                     </Popper>
//                 </React.Fragment>
//             </>
//         );
//     };

//     const actions = [
//         {
//             icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Student',
//             action: () => navigate("/Admin/addstudents")
//         },
//         {
//             icon: <PersonRemoveIcon color="error" />, name: 'Delete All Students',
//             action: () => deleteHandler(currentUser._id, "Students")
//         },
//     ];

//     return (
//         <>
//             {loading ?
//                 <div>Loading...</div>
//                 :
//                 <>
//                     {response ?
//                         <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
//                             <GreenButton variant="contained" onClick={() => navigate("/Admin/addstudents")}>
//                                 Add Students
//                             </GreenButton>
//                         </Box>
//                         :
//                         <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//                             {Array.isArray(studentsList) && studentsList.length > 0 &&
//                                 <TableTemplate buttonHaver={StudentButtonHaver} columns={studentColumns} rows={studentRows} />
//                             }
//                             <SpeedDialTemplate actions={actions} />
//                         </Paper>
//                     }
//                 </>
//             }
//             <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
//         </>
//     );
// };

// export default ShowStudents;
// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   CircularProgress,
//   MenuItem,
//   FormControl,
//   Select,
//   InputLabel,
//   Button
// } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { getStudents } from '../../../redux/studentRelated/studentHandle';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const ShowStudents = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { students, loading, error } = useSelector((state) => state.student);
//   const { currentUser } = useSelector((state) => state.user);

//   const [classList, setClassList] = useState([]);
//   const [selectedClass, setSelectedClass] = useState('');
//   const [filteredStudents, setFilteredStudents] = useState([]);

//   // Fetch classes
//   useEffect(() => {
//     const fetchClasses = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5001/SclassList/${currentUser._id}`);
//         setClassList(res.data);
//         console.log(res.data);
//       } catch (err) {
//         console.error("Failed to load class list", err);
//       }
//     };
//     fetchClasses();
//   }, [currentUser._id]);

//   // Fetch students
//   useEffect(() => {
//     dispatch(getStudents(currentUser._id));
//   }, [dispatch, currentUser._id]);
//   // Filter logic
// //   useEffect(() => {
// //     if (selectedClass && studentsList.length > 0) {
// //       setFilteredStudents(
// //         studentsList.filter(
// //         (s) => s.sclassName && s.sclassName._id?.toString() === selectedClass)   
// //       );
      
// //     } else {
// //       setFilteredStudents(studentsList);
// //     }
// //   }, [selectedClass, studentsList]);
// useEffect(() => {
//   if (selectedClass && students.length > 0) {
//     const filtered = students.filter((s) => {
//       const studentClassId = s.class?._id?.toString();
//       console.log("Student:", s.name);
//       console.log("studentClassId:", studentClassId);
//       console.log("selectedClass:", selectedClass);
//       return studentClassId === selectedClass;
//     });

//     console.log("Filtered Students:", filtered);

//     setFilteredStudents(filtered);
//   } else {
//     console.log("No class selected. Showing all students.");
//     setFilteredStudents(students);
//   }
// }, [selectedClass, students]);


//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return <Typography color="error">Error: {error}</Typography>;
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
//         All Students
//       </Typography>

//       <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
//         <FormControl sx={{ minWidth: 200 }}>
//           <InputLabel id="class-select-label">Filter by Class</InputLabel>
//           <Select
//             labelId="class-select-label"
//             value={selectedClass}
//             label="Filter by Class"
//             onChange={(e) => setSelectedClass(e.target.value)}
//           >
//             <MenuItem value="">All Classes</MenuItem>
//             {Array.isArray(classList) && classList.map((sclass) => (
//               <MenuItem key={sclass._id} value={sclass._id}>
//                 {sclass.sclassName}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </Box>

//       <TableContainer component={Paper} elevation={3}>
//         <Table>
//           <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
//             <TableRow>
//               <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
//               <TableCell sx={{ fontWeight: 'bold' }}>Roll Number</TableCell>
//               <TableCell sx={{ fontWeight: 'bold' }}>Class</TableCell>
//               <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredStudents.length > 0 ? (
//               filteredStudents.map((student) => (
//                 <TableRow key={student._id}>
//                   <TableCell>{student.fullName}</TableCell>
//                   <TableCell>{student.rollNumber}</TableCell>
//                   <TableCell>{student.class.sclassName}</TableCell>
//                   <TableCell>
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       onClick={() => navigate(`/Admin/students/student/${student._id}`)}
//                     >
//                       View Student
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={4} align="center">
//                   No students found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default ShowStudents;
// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   CircularProgress,
//   MenuItem,
//   FormControl,
//   Select,
//   InputLabel,
//   Button
// } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { getStudents } from '../../../redux/studentRelated/studentHandle';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const ShowStudents = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Consistent key from redux slice!
//   const { studentsList, loading, error } = useSelector((state) => state.student);
//   const { currentUser } = useSelector((state) => state.user);

//   const [classList, setClassList] = useState([]);
//   const [selectedClass, setSelectedClass] = useState('');
//   const [filteredStudents, setFilteredStudents] = useState([]);

//   // Fetch classes for filter dropdown
//   useEffect(() => {
//     const fetchClasses = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5001/SclassList/${currentUser._id}`);
//         setClassList(res.data);
//       } catch (err) {
//         console.error("Failed to load class list", err);
//       }
//     };
//     if (currentUser && currentUser._id) {
//       fetchClasses();
//     }
//   }, [currentUser]);

//   // Fetch all students (admin-level, so depends on admin _id)
//   useEffect(() => {
//     if (currentUser && currentUser._id) {
//       dispatch(getStudents(currentUser._id));
//     }
//   }, [dispatch, currentUser]);

//   // Filter students based on selected class
//   useEffect(() => {
//     if (selectedClass && studentsList.length > 0) {
//       const filtered = studentsList.filter((s) => {
//         const studentClassId = s.class?._id?.toString();
//         return studentClassId === selectedClass;
//       });
//       setFilteredStudents(filtered);
//     } else {
//       setFilteredStudents(studentsList);
//     }
//   }, [selectedClass, studentsList]);

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return <Typography color="error">Error: {error}</Typography>;
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
//         All Students
//       </Typography>

//       <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         {/* Add Student Button */}
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => navigate('/Admin/students/add')}
//           sx={{ mr: 2 }}
//         >
//           Add Student
//         </Button>
//         <FormControl sx={{ minWidth: 200 }}>
//           <InputLabel id="class-select-label">Filter by Class</InputLabel>
//           <Select
//             labelId="class-select-label"
//             value={selectedClass}
//             label="Filter by Class"
//             onChange={(e) => setSelectedClass(e.target.value)}
//           >
//             <MenuItem value="">All Classes</MenuItem>
//             {Array.isArray(classList) && classList.map((sclass) => (
//               <MenuItem key={sclass._id} value={sclass._id}>
//                 {sclass.sclassName}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </Box>

//       <TableContainer component={Paper} elevation={3}>
//         <Table>
//           <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
//             <TableRow>
//               <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
//               <TableCell sx={{ fontWeight: 'bold' }}>Roll Number</TableCell>
//               <TableCell sx={{ fontWeight: 'bold' }}>Class</TableCell>
//               <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredStudents.length > 0 ? (
//               filteredStudents.map((student) => (
//                 <TableRow key={student._id}>
//                   <TableCell>{student.fullName}</TableCell>
//                   <TableCell>{student.roll}</TableCell>
//                   <TableCell>{student.class?.sclassName || ''}</TableCell>
//                   <TableCell>
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       onClick={() => navigate(`/Admin/students/student/${student._id}`)}
//                     >
//                       View Student
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={4} align="center">
//                   No students found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default ShowStudents;
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Button
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getStudents } from '../../../redux/studentRelated/studentHandle';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// No need to change: this will work in your layout, just as always
const ShowStudents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { studentsList, loading, error } = useSelector((state) => state.student);
  const { currentUser } = useSelector((state) => state.user);

  const [classList, setClassList] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);

  // Fetch classes for filter dropdown (LOCAL BACKEND ONLY!)
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        // Stick to localhost:5001 for local dev as you want
        const res = await axios.get(`http://localhost:5001/SclassList/${currentUser._id}`);
        setClassList(res.data);
      } catch (err) {
        console.error("Failed to load class list", err);
        setClassList([]);
      }
    };
    if (currentUser && currentUser._id) {
      fetchClasses();
    }
  }, [currentUser]);

  // Fetch all students (admin-level, so depends on admin _id)
  useEffect(() => {
    if (currentUser && currentUser._id) {
      dispatch(getStudents(currentUser._id));
    }
  }, [dispatch, currentUser]);

  // Filter students based on selected class
  useEffect(() => {
    if (selectedClass && studentsList.length > 0) {
      const filtered = studentsList.filter((s) => {
        const studentClassId = s.class?._id?.toString();
        return studentClassId === selectedClass;
      });
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents(studentsList);
    }
  }, [selectedClass, studentsList]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
        All Students
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/Admin/students/add')}
          sx={{ mr: 2 }}
        >
          Add Student
        </Button>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="class-select-label">Filter by Class</InputLabel>
          <Select
            labelId="class-select-label"
            value={selectedClass}
            label="Filter by Class"
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <MenuItem value="">All Classes</MenuItem>
            {Array.isArray(classList) && classList.map((sclass) => (
              <MenuItem key={sclass._id} value={sclass._id}>
                {sclass.sclassName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Roll Number</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Class</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <TableRow key={student._id}>
                  <TableCell>{student.fullName}</TableCell>
                  <TableCell>{student.roll}</TableCell>
                  <TableCell>{student.class?.sclassName || ''}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate(`/Admin/students/student/${student._id}`)}
                    >
                      View Student
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No students found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ShowStudents;
