import React from 'react';
import { useSelector } from 'react-redux';
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Paper
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';

const AdminProfile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #ece9f7 0%, #f5f7fa 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 4,
      }}
    >
      <Paper elevation={6} sx={{ borderRadius: 4, maxWidth: 400, width: '100%' }}>
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: 3,
            bgcolor: 'white',
            p: 3,
            textAlign: 'center',
          }}
        >
          <Avatar
            sx={{
              width: 90,
              height: 90,
              margin: '0 auto',
              bgcolor: '#270843',
              fontSize: 40,
              mb: 2,
            }}
          >
            <PersonIcon fontSize="inherit" />
          </Avatar>
          <Typography variant="h5" fontWeight={700} color="#270843" gutterBottom>
            {currentUser?.name || "Admin"}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2} sx={{ textAlign: 'left', mb: 2 }}>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center">
                <EmailIcon sx={{ color: '#270843', mr: 1 }} />
                <Typography variant="body1">{currentUser?.email}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center">
                <SchoolIcon sx={{ color: '#270843', mr: 1 }} />
                <Typography variant="body1">{currentUser?.schoolName}</Typography>
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          {/* {<Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{
              bgcolor: '#270843',
              borderRadius: 2,
              px: 5,
              fontWeight: 600,
              letterSpacing: 1,
              '&:hover': {
                bgcolor: '#3f1068',
              }
            }}
            disabled
          >
            Edit Profile (Coming Soon) }
          </Button> */}
        </Card>
      </Paper>
    </Box>
  );
};

export default AdminProfile;
