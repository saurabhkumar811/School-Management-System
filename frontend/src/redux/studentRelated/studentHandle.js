// import axios from 'axios';

// export const ADD_STUDENT = 'ADD_STUDENT';
// export const GET_STUDENTS = 'GET_STUDENTS';
// export const GET_STUDENT_DETAIL = 'GET_STUDENT_DETAIL';
// export const UPDATE_STUDENT_FIELDS = 'UPDATE_STUDENT_FIELDS';
// export const REMOVE_STUFF = 'REMOVE_STUFF';
// const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5001";
// export const addStudent = (studentData) => async (dispatch) => {
//   const formData = new FormData();
//   Object.keys(studentData).forEach(key => {
//     if (key === 'photo' && studentData[key]) {
//       formData.append('photo', studentData[key]);
//     } else if (typeof studentData[key] === 'object') {
//       formData.append(key, JSON.stringify(studentData[key]));
//     } else {
//       formData.append(key, studentData[key]);
//     }
//   });
//   const res = await axios.post('/api/StudentReg', formData);
//   dispatch({ type: ADD_STUDENT, payload: res.data });
// };

// export const getStudents = () => async (dispatch) => {
//   const res = await axios.get('/api/Students/:id'); // Use correct endpoint as per your backend
//   dispatch({ type: GET_STUDENTS, payload: res.data });
// };
// //
// export const getStudentsByClass = (classId) => async (dispatch) => {
//   try {
//     const res = await axios.get(`/api/StudentsByClass/${classId}`); // your backend route to fetch students of a class
//     dispatch({ type: GET_STUDENTS, payload: res.data });
//   } catch (error) {
//     console.error("Failed to fetch students by class:", error);
//     // You can dispatch error action here if you have one
//   }
// };


// export const getStudentDetail = (id) => async (dispatch) => {
//   const res = await axios.get(`/api/Student/${id}`);
//   dispatch({ type: GET_STUDENT_DETAIL, payload: res.data });
// };

// export const updateStudentFields = (data) => async (dispatch) => {
//   const { studentId, fieldsToUpdate } = data;
//   const res = await axios.put(`/api/Student/${studentId}`, fieldsToUpdate);
//   dispatch({ type: UPDATE_STUDENT_FIELDS, payload: res.data });
// };

// export const removeStuff = (id) => async (dispatch) => {
//   await axios.delete(`/api/Student/${id}`);
//   dispatch({ type: REMOVE_STUFF, payload: id });
// };

// const initialState = {
//   students: [],
//   studentDetail: null,
// };

// export default function studentReducer(state = initialState, action) {
//   switch (action.type) {
//     case ADD_STUDENT:
//       return { ...state, students: [...state.students, action.payload] };
//     case GET_STUDENTS:
//       return { ...state, students: action.payload };
//     case GET_STUDENT_DETAIL:
//       return { ...state, studentDetail: action.payload };
//     case UPDATE_STUDENT_FIELDS:
//       const updatedStudent = action.payload;
//       return {
//         ...state,
//         students: state.students.map(s => s._id === updatedStudent._id ? updatedStudent : s),
//         studentDetail: state.studentDetail && state.studentDetail._id === updatedStudent._id ? updatedStudent : state.studentDetail
//       };
//     case REMOVE_STUFF:
//       return {
//         ...state,
//         students: state.students.filter(s => s._id !== action.payload),
//         studentDetail: state.studentDetail && state.studentDetail._id === action.payload ? null : state.studentDetail
//       };
//     default:
//       return state;
//   }
// }
import axios from 'axios';

export const ADD_STUDENT = 'ADD_STUDENT';
export const GET_STUDENTS = 'GET_STUDENTS';
export const GET_STUDENT_DETAIL = 'GET_STUDENT_DETAIL';
export const UPDATE_STUDENT_FIELDS = 'UPDATE_STUDENT_FIELDS';
export const REMOVE_STUFF = 'REMOVE_STUFF';

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5001";

// Add Student
export const addStudent = (studentData) => async (dispatch) => {
  const formData = new FormData();
  Object.keys(studentData).forEach(key => {
    if (key === 'photo' && studentData[key]) {
      formData.append('photo', studentData[key]);
    } else if (typeof studentData[key] === 'object' && studentData[key] !== null) {
      formData.append(key, JSON.stringify(studentData[key]));
    } else {
      formData.append(key, studentData[key]);
    }
  });
  const res = await axios.post(`${REACT_APP_BASE_URL}/StudentReg`, formData);
  dispatch({ type: ADD_STUDENT, payload: res.data });
};

// Get All Students (pass id if your backend needs it)
// export const getStudents = (id) => async (dispatch) => {
//   const res = await axios.get(`${REACT_APP_BASE_URL}/Students/${id}`);
//   dispatch({ type: GET_STUDENTS, payload: res.data });
// };
// Get Students with optional class filter
export const getStudents = (adminId, classId = null) => async (dispatch) => {
  try {
    let url = `${REACT_APP_BASE_URL}/Students/${adminId}`;
    if (classId) {
      url += `?classId=${classId}`;
    }

    const res = await axios.get(url);
    dispatch({ type: GET_STUDENTS, payload: res.data });
  } catch (error) {
    console.error("Error fetching students:", error);
  }
};



// Get Single Student Detail
export const getStudentDetail = (id) => async (dispatch) => {
  const res = await axios.get(`${REACT_APP_BASE_URL}/Student/${id}`);
  dispatch({ type: GET_STUDENT_DETAIL, payload: res.data });
};

// Update Student Fields
export const updateStudentFields = (data) => async (dispatch) => {
  const { studentId, fieldsToUpdate } = data;
  const res = await axios.put(`${REACT_APP_BASE_URL}/Student/${studentId}`, fieldsToUpdate);
  dispatch({ type: UPDATE_STUDENT_FIELDS, payload: res.data });
};

// Remove Student (delete)
export const removeStuff = (id) => async (dispatch) => {
  await axios.delete(`${REACT_APP_BASE_URL}/Student/${id}`);
  dispatch({ type: REMOVE_STUFF, payload: id });
};

const initialState = {
  students: [],
  studentDetail: null,
};

export default function studentReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_STUDENT:
      return { ...state, students: [...state.students, action.payload] };
    case GET_STUDENTS:
      return { ...state, students: action.payload };
    case GET_STUDENT_DETAIL:
      return { ...state, studentDetail: action.payload };
    case UPDATE_STUDENT_FIELDS: {
      const updatedStudent = action.payload;
      return {
        ...state,
        students: state.students.map(s => s._id === updatedStudent._id ? updatedStudent : s),
        studentDetail: state.studentDetail && state.studentDetail._id === updatedStudent._id ? updatedStudent : state.studentDetail
      };
    }
    case REMOVE_STUFF:
      return {
        ...state,
        students: state.students.filter(s => s._id !== action.payload),
        studentDetail: state.studentDetail && state.studentDetail._id === action.payload ? null : state.studentDetail
      };
    default:
      return state;
  }
}
