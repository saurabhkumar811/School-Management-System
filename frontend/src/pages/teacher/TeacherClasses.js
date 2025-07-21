import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Paper, Typography, Button, Box } from "@mui/material";
import TableTemplate from "../../components/TableTemplate";
import { BlueButton } from "../../components/buttonStyles";

const TeacherClasses = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const classesAssigned = currentUser.classesAssigned || [];

  const classColumns = [
    { id: "name", label: "Class Name", minWidth: 170 },
    { id: "section", label: "Section", minWidth: 100 },
  ];

  const classRows = classesAssigned.map((cls) => ({
    name: cls.sclassName,
    section: cls.section || "-", // If you have section field
    id: cls._id,
  }));

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

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Assigned Classes
      </Typography>

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
