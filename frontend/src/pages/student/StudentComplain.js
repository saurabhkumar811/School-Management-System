// import { useEffect, useState } from 'react';
// import { Box, CircularProgress, Stack, TextField, Typography } from '@mui/material';
// import Popup from '../../components/Popup';
// import { BlueButton } from '../../components/buttonStyles';
// import { addStuff } from '../../redux/userRelated/userHandle';
// import { useDispatch, useSelector } from 'react-redux';

// const StudentComplain = () => {
//     const [complaint, setComplaint] = useState("");
//     const [date, setDate] = useState("");

//     const dispatch = useDispatch()

//     const { status, currentUser, error } = useSelector(state => state.user);

//     const user = currentUser._id
//     const school = currentUser.school._id
//     const address = "Complain"

//     const [loader, setLoader] = useState(false)
//     const [message, setMessage] = useState("");
//     const [showPopup, setShowPopup] = useState(false);

//     const fields = {
//         user,
//         date,
//         complaint,
//         school,
//     };

//     const submitHandler = (event) => {
//         event.preventDefault()
//         setLoader(true)
//         dispatch(addStuff(fields, address))
//     };

//     useEffect(() => {
//         if (status === "added") {
//             setLoader(false)
//             setShowPopup(true)
//             setMessage("Done Successfully")
//         }
//         else if (error) {
//             setLoader(false)
//             setShowPopup(true)
//             setMessage("Network Error")
//         }
//     }, [status, error])

//     return (
//         <>
//             <Box
//                 sx={{
//                     flex: '1 1 auto',
//                     alignItems: 'center',
//                     display: 'flex',
//                     justifyContent: 'center'
//                 }}
//             >
//                 <Box
//                     sx={{
//                         maxWidth: 550,
//                         px: 3,
//                         py: '100px',
//                         width: '100%'
//                     }}
//                 >
//                     <div>
//                         <Stack spacing={1} sx={{ mb: 3 }}>
//                             <Typography variant="h4">Complain</Typography>
//                         </Stack>
//                         <form onSubmit={submitHandler}>
//                             <Stack spacing={3}>
//                                 <TextField
//                                     fullWidth
//                                     label="Select Date"
//                                     type="date"
//                                     value={date}
//                                     onChange={(event) => setDate(event.target.value)} required
//                                     InputLabelProps={{
//                                         shrink: true,
//                                     }}
//                                 />
//                                 <TextField
//                                     fullWidth
//                                     label="Write your complain"
//                                     variant="outlined"
//                                     value={complaint}
//                                     onChange={(event) => {
//                                         setComplaint(event.target.value);
//                                     }}
//                                     required
//                                     multiline
//                                     maxRows={4}
//                                 />
//                             </Stack>
//                             <BlueButton
//                                 fullWidth
//                                 size="large"
//                                 sx={{ mt: 3 }}
//                                 variant="contained"
//                                 type="submit"
//                                 disabled={loader}
//                             >
//                                 {loader ? <CircularProgress size={24} color="inherit" /> : "Add"}
//                             </BlueButton>
//                         </form>
//                     </div>
//                 </Box>
//             </Box>
//             <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
//         </>
//     );
// };

// export default StudentComplain;


// commented after saurav update   25/7/25
// import { useEffect, useState } from 'react';
// import { Box, CircularProgress, Stack, TextField, Typography } from '@mui/material';
// import Popup from '../../components/Popup';
// import { BlueButton } from '../../components/buttonStyles';
// import { addStuff } from '../../redux/userRelated/userHandle';
// import { useDispatch, useSelector } from 'react-redux';

// const StudentComplain = () => {
//     const [complaint, setComplaint] = useState("");
//     const [date, setDate] = useState("");
//     const dispatch = useDispatch();

//     const { status, currentUser, error } = useSelector(state => state.user);

//     const user = currentUser?._id;
//     const school = currentUser?.school?._id;
//     const address = "Complain";

//     const [loader, setLoader] = useState(false);
//     const [message, setMessage] = useState("");
//     const [showPopup, setShowPopup] = useState(false);

//     const fields = { user, date, complaint, school };

//     const submitHandler = (event) => {
//         event.preventDefault();
//         setLoader(true);
//         dispatch(addStuff(fields, address));
//     };

//     useEffect(() => {
//         if (status === "added") {
//             setLoader(false);
//             setShowPopup(true);
//             setMessage("Done Successfully");
//         } else if (error) {
//             setLoader(false);
//             setShowPopup(true);
//             setMessage("Network Error");
//         }
//     }, [status, error]);

//     if (!user || !school) {
//         return <Box sx={{ p: 5, textAlign: 'center' }}>Loading profile...</Box>
//     }

//     return (
//         <>
//             <Box
//                 sx={{
//                     flex: '1 1 auto',
//                     alignItems: 'center',
//                     display: 'flex',
//                     justifyContent: 'center'
//                 }}
//             >
//                 <Box
//                     sx={{
//                         maxWidth: 550,
//                         px: 3,
//                         py: '100px',
//                         width: '100%'
//                     }}
//                 >
//                     <div>
//                         <Stack spacing={1} sx={{ mb: 3 }}>
//                             <Typography variant="h4">Complain</Typography>
//                         </Stack>
//                         <form onSubmit={submitHandler}>
//                             <Stack spacing={3}>
//                                 <TextField
//                                     fullWidth
//                                     label="Select Date"
//                                     type="date"
//                                     value={date}
//                                     onChange={(event) => setDate(event.target.value)} required
//                                     InputLabelProps={{
//                                         shrink: true,
//                                     }}
//                                 />
//                                 <TextField
//                                     fullWidth
//                                     label="Write your complain"
//                                     variant="outlined"
//                                     value={complaint}
//                                     onChange={(event) => {
//                                         setComplaint(event.target.value);
//                                     }}
//                                     required
//                                     multiline
//                                     maxRows={4}
//                                 />
//                             </Stack>
//                             <BlueButton
//                                 fullWidth
//                                 size="large"
//                                 sx={{ mt: 3 }}
//                                 variant="contained"
//                                 type="submit"
//                                 disabled={loader}
//                             >
//                                 {loader ? <CircularProgress size={24} color="inherit" /> : "Add"}
//                             </BlueButton>
//                         </form>
//                     </div>
//                 </Box>
//             </Box>
//             <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
//         </>
//     );
// };

// export default StudentComplain;


import { useEffect, useState } from 'react';
import { Box, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import Popup from '../../components/Popup';
import { BlueButton } from '../../components/buttonStyles';
import { addStuff } from '../../redux/userRelated/userHandle';
import { useDispatch, useSelector } from 'react-redux';

const StudentComplain = () => {
  const [complaint, setComplaint] = useState("");
  const [date, setDate] = useState("");
  const dispatch = useDispatch();

  const { status, currentUser, error } = useSelector(state => state.user);

  // Always get user and school robustly
  const user = currentUser?._id;
  // FIX: correct extraction of admin id (school) field
  const school = typeof currentUser?.school === "string"
    ? currentUser.school
    : (currentUser?.school?._id || "");

  const address = "Complain";

  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const fields = { user, date, complaint, school };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!user || !school) return;
    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === "added") {
      setLoader(false);
      setShowPopup(true);
      setMessage("Complaint submitted successfully");
      setComplaint("");
      setDate("");
    } else if (error) {
      setLoader(false);
      setShowPopup(true);
      setMessage("Network Error");
    }
  }, [status, error]);

  // Only show loading if sure we are missing user or school id!
  if (!user || !school) {
    return (
      <Box sx={{ p: 5, textAlign: 'center' }}>
        Loading profile...
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Submit Complaint</Typography>
            </Stack>
            <form onSubmit={submitHandler}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Select Date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  fullWidth
                  label="Write your complaint"
                  variant="outlined"
                  value={complaint}
                  onChange={(e) => setComplaint(e.target.value)}
                  required
                  multiline
                  maxRows={4}
                />
              </Stack>
              <BlueButton
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                variant="contained"
                type="submit"
                disabled={loader}
              >
                {loader ? <CircularProgress size={24} color="inherit" /> : "Submit"}
              </BlueButton>
            </form>
          </div>
        </Box>
      </Box>

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default StudentComplain;
