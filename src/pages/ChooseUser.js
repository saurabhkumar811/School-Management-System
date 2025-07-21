import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

// Sample images (replace with your own or use URLs from a CDN)
const adminImg = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
const studentImg = 'https://cdn-icons-png.flaticon.com/512/3135/3135755.png';
const teacherImg = 'https://cdn-icons-png.flaticon.com/512/3135/3135768.png';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = "zxc";

  const { status, currentUser, currentRole } = useSelector(state => state.user);

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "yogendra@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Adminlogin');
      }
    } else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = "1";
        const studentName = "Dipesh Awasthi";
        const fields = { rollNum, studentName, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Studentlogin');
      }
    } else if (user === "Teacher") {
      if (visitor === "guest") {
        const email = "tony@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Teacherlogin');
      }
    }
  };

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard');
      } else if (currentRole === 'Student') {
        navigate('/Student/dashboard');
      } else if (currentRole === 'Teacher') {
        navigate('/Teacher/dashboard');
      }
    } else if (status === 'error') {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  const userTypes = [
    {
      label: "Admin",
      desc: "Login as an administrator to access the dashboard and manage app data.",
      img: adminImg,
      bg: "#f7cac9"
    },
    {
      label: "Student",
      desc: "Login as a student to explore course materials and assignments.",
      img: studentImg,
      bg: "#b5ead7"
    },
    {
      label: "Teacher",
      desc: "Login as a teacher to create courses, assignments, and track student progress.",
      img: teacherImg,
      bg: "#ffdac1"
    }
  ];

  return (
    <StyledContainer>
      <Container maxWidth="md">
        <Title>Choose Your Role</Title>
        <Grid container spacing={4} justifyContent="center">
          {userTypes.map((user, idx) => (
            <Grid item xs={12} sm={6} md={4} key={user.label}>
              <StyledCard
                style={{ background: user.bg }}
                onClick={() => navigateHandler(user.label)}
              >
                <ImageCircle>
                  <img src={user.img} alt={user.label} />
                </ImageCircle>
                <CardTitle>{user.label}</CardTitle>
                <CardDesc>{user.desc}</CardDesc>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
        <span style={{ marginLeft: "1rem" }}>Please Wait</span>
      </Backdrop>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </StyledContainer>
  );
};

export default ChooseUser;

const StyledContainer = styled.div`
  min-height: 100vh;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  text-align: center;
  color: #222;
  margin-bottom: 2.5rem;
  font-size: 2.7rem;
  font-weight: 700;
  letter-spacing: 1.5px;
`;

const StyledCard = styled(Paper)`
  padding: 2.5rem 1.5rem 2rem 1.5rem;
  border-radius: 1.5rem !important;
  box-shadow: 0 4px 24px 0 rgba(60, 72, 100, 0.10);
  text-align: center;
  cursor: pointer;
  transition: transform 0.18s, box-shadow 0.18s;
  min-height: 340px;
  border: 2px solid #f0f0f0;
  background: #fafbfc;
  &:hover {
    transform: translateY(-6px) scale(1.03);
    box-shadow: 0 12px 32px 0 rgba(60, 72, 100, 0.18);
    border-color: #b8b8ff;
    background: #fff;
  }
`;

const ImageCircle = styled.div`
  width: 84px;
  height: 84px;
  margin: 0 auto 1.3rem auto;
  border-radius: 50%;
  background: #f5f6fa;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 56px;
    height: 56px;
    object-fit: contain;
  }
`;

const CardTitle = styled.h2`
  font-size: 1.45rem;
  color: #222;
  margin-bottom: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

const CardDesc = styled.p`
  color: #555;
  font-size: 1.07rem;
  opacity: 0.92;
  margin-bottom: 0;
  line-height: 1.5;
`;
