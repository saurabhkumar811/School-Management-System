// import * as React from 'react';
// import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
// import { Link, useLocation } from 'react-router-dom';

// import HomeIcon from '@mui/icons-material/Home';
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
// import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
// import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
// import AssignmentIcon from '@mui/icons-material/Assignment';

// const StudentSideBar = () => {
//     const location = useLocation();
//     return (
//         <>
//             <React.Fragment>
//                 <ListItemButton component={Link} to="/">
//                     <ListItemIcon>
//                         <HomeIcon color={location.pathname === ("/" || "/Student/dashboard") ? 'primary' : 'inherit'} />
//                     </ListItemIcon>
//                     <ListItemText primary="Home" />
//                 </ListItemButton>
//                 <ListItemButton component={Link} to="/Student/subjects">
//                     <ListItemIcon>
//                         <AssignmentIcon color={location.pathname.startsWith("/Student/subjects") ? 'primary' : 'inherit'} />
//                     </ListItemIcon>
//                     <ListItemText primary="Subjects" />
//                 </ListItemButton>
//                 <ListItemButton component={Link} to="/Student/attendance">
//                     <ListItemIcon>
//                         <ClassOutlinedIcon color={location.pathname.startsWith("/Student/attendance") ? 'primary' : 'inherit'} />
//                     </ListItemIcon>
//                     <ListItemText primary="Attendance" />
//                 </ListItemButton>
//                 <ListItemButton component={Link} to="/Student/complain">
//                     <ListItemIcon>
//                         <AnnouncementOutlinedIcon color={location.pathname.startsWith("/Student/complain") ? 'primary' : 'inherit'} />
//                     </ListItemIcon>
//                     <ListItemText primary="Complain" />
//                 </ListItemButton>
//             </React.Fragment>
//             <Divider sx={{ my: 1 }} />
//             <React.Fragment>
//                 <ListSubheader component="div" inset>
//                     User
//                 </ListSubheader>
//                 <ListItemButton component={Link} to="/Student/profile">
//                     <ListItemIcon>
//                         <AccountCircleOutlinedIcon color={location.pathname.startsWith("/Student/profile") ? 'primary' : 'inherit'} />
//                     </ListItemIcon>
//                     <ListItemText primary="Profile" />
//                 </ListItemButton>
//                 <ListItemButton component={Link} to="/logout">
//                     <ListItemIcon>
//                         <ExitToAppIcon color={location.pathname.startsWith("/logout") ? 'primary' : 'inherit'} />
//                     </ListItemIcon>
//                     <ListItemText primary="Logout" />
//                 </ListItemButton>
//             </React.Fragment>
//         </>
//     )
// }

// export default StudentSideBar

import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';

const StudentSideBar = () => {
    const location = useLocation();
    // Path after /Student/dashboard, e.g. /Student/dashboard/subjects etc.
    const path = location.pathname.split('/Student/dashboard/')[1] || '';

    return (
        <>
            <ListItemButton component={Link} to="">
                <ListItemIcon>
                    <HomeIcon color={path === "" ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton component={Link} to="subjects">
                <ListItemIcon>
                    <AssignmentIcon color={path.startsWith("subjects") ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Subjects" />
            </ListItemButton>
            <ListItemButton component={Link} to="attendance">
                <ListItemIcon>
                    <ClassOutlinedIcon color={path.startsWith("attendance") ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Attendance" />
            </ListItemButton>
            <ListItemButton component={Link} to="complain">
                <ListItemIcon>
                    <AnnouncementOutlinedIcon color={path.startsWith("complain") ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Complain" />
            </ListItemButton>
            <Divider sx={{ my: 1 }} />
            <ListSubheader component="div" inset>User</ListSubheader>
            <ListItemButton component={Link} to="profile">
                <ListItemIcon>
                    <AccountCircleOutlinedIcon color={path.startsWith("profile") ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Profile" />
            </ListItemButton>
            <ListItemButton component={Link} to="logout">
                <ListItemIcon>
                    <ExitToAppIcon color={location.pathname === "logout" ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItemButton>
        </>
    );
};

export default StudentSideBar;
