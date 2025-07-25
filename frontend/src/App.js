  // import React from 'react'
  // import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
  // import { useSelector } from 'react-redux';
  // import Homepage from './pages/Homepage';
  // import AdminDashboard from './pages/admin/AdminDashboard';
  // import StudentDashboard from './pages/student/StudentDashboard';
  // import TeacherDashboard from './pages/teacher/TeacherDashboard';
  // import LoginPage from './pages/LoginPage';
  // import AdminRegisterPage from './pages/admin/AdminRegisterPage';
  // import ChooseUser from './pages/ChooseUser';

  // const App = () => {
  //   const { currentRole } = useSelector(state => state.user);

  //   return (
  //     <Router>
  //       {currentRole === null &&
  //         <Routes>
  //           <Route path="/" element={<Homepage />} />
  //           <Route path="/choose" element={<ChooseUser visitor="normal" />} />
  //           <Route path="/chooseasguest" element={<ChooseUser visitor="guest" />} />

  //           <Route path="/Adminlogin" element={<LoginPage role="Admin" />} />
  //           <Route path="/Studentlogin" element={<LoginPage role="Student" />} />
  //           <Route path="/Teacherlogin" element={<LoginPage role="Teacher" />} />

  //           <Route path="/Adminregister" element={<AdminRegisterPage />} />

  //           <Route path='*' element={<Navigate to="/" />} />
  //         </Routes>}

  //       {currentRole === "Admin" &&
  //         <>
  //           <AdminDashboard />
  //         </>
  //       }

  //       {currentRole === "Student" &&
  //         <>
  //           <StudentDashboard />
  //         </>
  //       }

  //       {currentRole === "Teacher" &&
  //         <>
  //           <TeacherDashboard />
  //         </>
  //       }
  //     </Router>
  //   )
  // }

  // export default App
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import Homepage from './pages/Homepage';
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentDashboard from './pages/student/StudentDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import LoginPage from './pages/LoginPage';
import AdminRegisterPage from './pages/admin/AdminRegisterPage';
import ChooseUser from './pages/ChooseUser';

// No need to import ShowStudents/AddStudent etc here
// They are handled/routed inside AdminDashboard!

const App = () => {
  const { currentRole } = useSelector(state => state.user);
console.log("App.js: currentRole", currentRole);

  return (
    <Router>
      {/* Guest routes */}
      {currentRole === null &&
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/choose" element={<ChooseUser visitor="normal" />} />
          <Route path="/chooseasguest" element={<ChooseUser visitor="guest" />} />

          <Route path="/Adminlogin" element={<LoginPage role="Admin" />} />
          <Route path="/Studentlogin" element={<LoginPage role="Student" />} />
          <Route path="/Teacherlogin" element={<LoginPage role="Teacher" />} />

          <Route path="/Adminregister" element={<AdminRegisterPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      }

      {/* Admin section (dashboard + internal subpage routes handled by AdminDashboard) */}
      {currentRole === "Admin" &&
        <AdminDashboard />
      }

      {/* Student section */}
      {currentRole === "Student" &&
        <Routes>
    <Route path="/Student/dashboard/*" element={<StudentDashboard />} />
    {/* Add any additional student sub-pages here */}
    <Route path="*" element={<Navigate to="/Student/dashboard" />} />
  </Routes>
      }

      {/* Teacher section */}
      {currentRole === "Teacher" &&
        <TeacherDashboard />
      }
    </Router>
  )
}

export default App