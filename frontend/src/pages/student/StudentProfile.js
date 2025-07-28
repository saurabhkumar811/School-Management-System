// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getStudentDetail } from '../../redux/studentRelated/studentHandle';

// function StudentProfile({ studentId }) {
//   const dispatch = useDispatch();
//   const student = useSelector(state => state.student.studentDetail);

//   useEffect(() => {
//     dispatch(getStudentDetail(studentId));
//   }, [dispatch, studentId]);

//   if (!student) return <div>Loading...</div>;

//   return (
//     <div>
//       <img src={`/${student.photo}`} alt="Student" />
//       <h2>{student.fullName}</h2>
//       <p>Admission No: {student.admissionNumber}</p>
//       <p>Class: {student.class && student.class.name}</p>
//       {/* ...render all other fields as shown in earlier answers... */}
//     </div>
//   );
// }

// export default StudentProfile;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentDetail } from '../../redux/studentRelated/studentHandle';

function StudentProfile() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.currentUser);
    const studentDetail = useSelector(state => state.student.studentDetail);

    useEffect(() => {
        if (currentUser?._id) {
            dispatch(getStudentDetail(currentUser._id));
        }
    }, [dispatch, currentUser?._id]);

    if (!studentDetail) return <div>Loading...</div>;

    return (
        <div>
            {studentDetail.photo && <img src={`/${studentDetail.photo}`} alt="Student" />}
            <h2>{studentDetail.fullName}</h2>
            <p>Admission No: {studentDetail.admissionNumber}</p>
            <p>Class: {studentDetail.class && (studentDetail.class.sclassName || studentDetail.class.name)}</p>
            {/* Add more fields as needed */}
        </div>
    );
}

export default StudentProfile;

