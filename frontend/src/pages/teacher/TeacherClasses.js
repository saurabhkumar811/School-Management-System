import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Paper, Typography, Button, Box, Chip, Grid, Card, CardContent } from "@mui/material";
import TableTemplate from "../../components/TableTemplate";
import { BlueButton } from "../../components/buttonStyles";
import { getTeacherClassSubjects } from "../../redux/teacherRelated/teacherHandle";

const TeacherClasses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { teacherDetails, loading } = useSelector((state) => state.teacher);

  useEffect(() => {
    if (currentUser?._id) {
      dispatch(getTeacherClassSubjects(currentUser._id));
    }
  }, [dispatch, currentUser?._id]);

  const classesAssigned = currentUser?.classesAssigned || [];
  const subjectsAssigned = currentUser?.subjects || [];
  const classAssignments = teacherDetails?.classAssignments || [];

  const classColumns = [
    { id: "name", label: "Class Name", minWidth: 170 },
    { id: "section", label: "Section", minWidth: 100 },
    { id: "subjects", label: "Subjects Assigned", minWidth: 200 },
  ];

  const classRows = classesAssigned.map((cls) => {
    // Find the class assignment for this class
    const assignment = classAssignments.find(assignment =>
      assignment.class._id === cls._id
    );

    return {
      name: cls.sclassName,
      section: cls.section || "-",
      subjects: assignment?.subjects?.map(subject => subject.subName).join(", ") || "No subjects assigned",
      id: cls._id,
    };
  });

  const ClassButtonHaver = ({ row }) => {
    return (
      <BlueButton
        variant="contained"
        onClick={() => navigate(`/Teacher/class/details/${row.id}`)}
      >
        View Details
      </BlueButton>
    );
  };

  if (loading) {
    return (
      <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Assigned Classes
        </Typography>
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography>Loading...</Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Assigned Classes
      </Typography>

      {/* Summary Section */}
      <Box sx={{ mb: 3, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Teaching Summary
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Classes Assigned: <strong>{classesAssigned.length}</strong>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Subjects Assigned: <strong>{subjectsAssigned.length}</strong>
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Class-Subject Assignments */}
      {classAssignments.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Class-Subject Assignments
          </Typography>
          <Grid container spacing={2}>
            {classAssignments.map((assignment, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      {assignment.class.sclassName}
                    </Typography>
                    {assignment.subjects.length > 0 ? (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {assignment.subjects.map((subject, subIndex) => (
                          <Chip
                            key={subIndex}
                            label={subject.subName}
                            color="secondary"
                            size="small"
                          />
                        ))}
                      </Box>
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        No subjects assigned to this class
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {classesAssigned.length > 0 ? (
        <TableTemplate
          buttonHaver={ClassButtonHaver}
          columns={classColumns}
          rows={classRows}
        />
      ) : (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography>No classes assigned yet.</Typography>
        </Box>
      )}
    </Paper>
  );
};

export default TeacherClasses;
