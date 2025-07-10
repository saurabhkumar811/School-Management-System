import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ReportIcon from '@mui/icons-material/Report';
import AssignmentIcon from '@mui/icons-material/Assignment';

const navItems = [
  { label: "Home", to: "/", icon: HomeIcon, active: (pathname) => pathname === "/" || pathname === "/Admin/dashboard" },
  { label: "Classes", to: "/Admin/classes", icon: ClassOutlinedIcon, active: (pathname) => pathname.startsWith("/Admin/classes") },
  { label: "Subjects", to: "/Admin/subjects", icon: AssignmentIcon, active: (pathname) => pathname.startsWith("/Admin/subjects") },
  { label: "Teachers", to: "/Admin/teachers", icon: SupervisorAccountOutlinedIcon, active: (pathname) => pathname.startsWith("/Admin/teachers") },
  { label: "Students", to: "/Admin/students", icon: PersonOutlineIcon, active: (pathname) => pathname.startsWith("/Admin/students") },
  { label: "Notices", to: "/Admin/notices", icon: AnnouncementOutlinedIcon, active: (pathname) => pathname.startsWith("/Admin/notices") },
  { label: "Complains", to: "/Admin/complains", icon: ReportIcon, active: (pathname) => pathname.startsWith("/Admin/complains") },
];

const userItems = [
  { label: "Profile", to: "/Admin/profile", icon: AccountCircleOutlinedIcon, active: (pathname) => pathname.startsWith("/Admin/profile") },
  { label: "Logout", to: "/logout", icon: ExitToAppIcon, active: (pathname) => pathname.startsWith("/logout") },
];

const SideBar = ({ open }) => {
  const location = useLocation();

  const renderNavItems = (items) =>
    items.map(({ label, to, icon: Icon, active }) => (
      <ListItemButton
        component={Link}
        to={to}
        key={label}
        selected={active(location.pathname)}
        sx={{
          justifyContent: open ? "initial" : "center",
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : "auto",
            justifyContent: "center",
          }}
        >
          <Icon color={active(location.pathname) ? "primary" : "inherit"} />
        </ListItemIcon>
        <ListItemText
          primary={label}
          sx={{
            opacity: open ? 1 : 0,
            transition: "opacity 0.2s",
          }}
        />
      </ListItemButton>
    ));

  return (
    <>
      {renderNavItems(navItems)}
      <Divider sx={{ my: 1, opacity: open ? 1 : 0 }} />
      <ListSubheader
        component="div"
        inset
        sx={{ opacity: open ? 1 : 0, transition: "opacity 0.2s" }}
      >
        User
      </ListSubheader>
      {renderNavItems(userItems)}
    </>
  );
};

export default SideBar;
