import { useEffect } from "react";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getClassStudents } from "../../redux/sclassRelated/sclassHandle";
import { getTeacherClassSubjects } from "../../redux/teacherRelated/teacherHandle";
import { Paper, Box, Typography, ButtonGroup, Button, Popper, Grow, ClickAwayListener, MenuList, MenuItem, Chip } from "@mui/material";
import { BlackButton, BlueButton } from "../../components/buttonStyles";
import TableTemplate from "../../components/TableTemplate";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const TeacherClassDetails = () => {
  const { classID } = useParams(); // ✅ Get classID from URL
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sclassStudents, loading, error, getresponse } = useSelector((state) => state.sclass);
  // console.log("Redux sclassStudents data:", sclassStudents);
  const { teacherDetails } = useSelector((state) => state.teacher);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (classID) {
      dispatch(getClassStudents(classID));
    }
    if (currentUser?._id) {
      dispatch(getTeacherClassSubjects(currentUser._id));
    }
  }, [dispatch, classID, currentUser?._id]);

  // Find the class assignment for this specific class
  const classAssignment = teacherDetails?.classAssignments?.find(assignment =>
    assignment.class._id === classID
  );

  const subjectsInThisClass = classAssignment?.subjects || [];
  const subjectID = subjectsInThisClass[0]?._id || currentUser.teachSubject?._id || currentUser.subjects?.[0]?._id;

  const studentColumns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "rollNum", label: "Roll Number", minWidth: 100 },
  ];

  const studentRows = sclassStudents.map((student) => ({
    name: student.fullName,
    rollNum: student.roll,
    id: student._id,
  }));

  const StudentsButtonHaver = ({ row }) => {
    const options = ["Take Attendance", "Provide Marks"];
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleClick = () => {
      if (selectedIndex === 0) {
        navigate(`/Teacher/class/student/attendance/${row.id}/${subjectID}`);
      } else {
        navigate(`/Teacher/class/student/marks/${row.id}/${subjectID}`);
      }
    };

    const handleMenuItemClick = (event, index) => {
      setSelectedIndex(index);
      setOpen(false);
    };

    return (
      <>
        <BlueButton
          variant="contained"
          onClick={() => navigate("/Teacher/class/student/" + row.id)}
        >
          View
        </BlueButton>
        <ButtonGroup variant="contained" ref={anchorRef}>
          <Button onClick={handleClick}>{options[selectedIndex]}</Button>
          <BlackButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </BlackButton>
        </ButtonGroup>
        <Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
          {({ TransitionProps }) => (
            <Grow {...TransitionProps}>
              <Paper>
                <ClickAwayListener onClickAway={() => setOpen(false)}>
                  <MenuList>
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </>
    );
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Class Details
      </Typography>

      {/* Class-Subject Information */}
      {classAssignment && (
        <Box sx={{ mb: 3, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>
            Teaching Assignment: {classAssignment.class.sclassName}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Subjects being taught in this class:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {subjectsInThisClass.length > 0 ? (
              subjectsInThisClass.map((subject, index) => (
                <Chip
                  key={index}
                  label={subject.subName}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No subjects assigned to this class
              </Typography>
            )}
          </Box>
        </Box>
      )}

      {getresponse ? (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography>No Students Found</Typography>
        </Box>
      ) : (
        <>
          <Typography variant="h5" gutterBottom>
            Students List:
          </Typography>

          {sclassStudents.length > 0 && (
            <TableTemplate
              buttonHaver={StudentsButtonHaver}
              columns={studentColumns}
              rows={studentRows}
            />
          )}
        </>
      )}
    </Paper>
  );
};

export default TeacherClassDetails;
