import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { CircularProgress, Box, Card, CardContent, Typography, TextField, Button, Alert } from '@mui/material';
import Popup from '../../../components/Popup';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const AddNotice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, response, error } = useSelector(state => state.user);
  const { currentUser } = useSelector(state => state.user);

  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');
  const adminID = currentUser._id;

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const fields = { title, details, date, adminID };
  const address = "Notice";

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === 'added') {
      navigate('/Admin/notices');
      dispatch(underControl())
    } else if (status === 'error') {
      setMessage("Network Error")
      setShowPopup(true)
      setLoader(false)
    }
  }, [status, navigate, error, response, dispatch]);

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
      <Card
        elevation={6}
        sx={{
          borderRadius: 4,
          maxWidth: 450,
          width: '100%',
          p: 3,
          boxShadow: 5,
        }}
      >
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
            <NotificationsActiveIcon sx={{ fontSize: 50, color: "#270843", mb: 1 }} />
            <Typography variant="h5" fontWeight={700} color="#270843" gutterBottom>
              Add Notice
            </Typography>
          </Box>
          <form onSubmit={submitHandler}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Details"
              variant="outlined"
              fullWidth
              required
              multiline
              minRows={4}
              maxRows={10}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Date"
              type="date"
              variant="outlined"
              fullWidth
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              sx={{ mb: 3 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              sx={{
                bgcolor: '#270843',
                borderRadius: 2,
                fontWeight: 600,
                letterSpacing: 1,
                py: 1.5,
                fontSize: 18,
                '&:hover': {
                  bgcolor: '#3f1068',
                }
              }}
              disabled={loader}
            >
              {loader ? <CircularProgress size={24} color="inherit" /> : 'Add Notice'}
            </Button>
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {message || "Network Error"}
              </Alert>
            )}
          </form>
        </CardContent>
      </Card>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Box>
  );
};

export default AddNotice;
