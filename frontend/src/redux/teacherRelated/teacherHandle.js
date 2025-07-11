import axios from 'axios';

export const ADD_TEACHER = 'ADD_TEACHER';
export const GET_TEACHERS = 'GET_TEACHERS';
export const GET_TEACHER_DETAIL = 'GET_TEACHER_DETAIL';
export const UPDATE_TEACHER_SUBJECT = 'UPDATE_TEACHER_SUBJECT';

export const addTeacher = (teacherData) => async (dispatch) => {
  const formData = new FormData();
  Object.keys(teacherData).forEach(key => {
    if (key === 'photo' && teacherData[key]) {
      formData.append('photo', teacherData[key]);
    } else if (typeof teacherData[key] === 'object') {
      formData.append(key, JSON.stringify(teacherData[key]));
    } else {
      formData.append(key, teacherData[key]);
    }
  });
  const res = await axios.post('/api/TeacherReg', formData);
  dispatch({ type: ADD_TEACHER, payload: res.data });
};

export const getTeachers = () => async (dispatch) => {
  const res = await axios.get('/api/Teachers/:id'); // Use correct endpoint as per your backend
  dispatch({ type: GET_TEACHERS, payload: res.data });
};

export const getTeacherDetail = (id) => async (dispatch) => {
  const res = await axios.get(`/api/Teacher/${id}`);
  dispatch({ type: GET_TEACHER_DETAIL, payload: res.data });
};

export const updateTeacherSubject = (data) => async (dispatch) => {
  const { teacherId, subjects } = data;
  const res = await axios.put('/api/TeacherSubject', { teacherId, subjects });
  dispatch({ type: UPDATE_TEACHER_SUBJECT, payload: res.data });
};

const initialState = {
  teachers: [],
  teacherDetail: null,
  loading: false,
  error: null,
};

export default function teacherReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TEACHER:
      return { ...state, teachers: [...state.teachers, action.payload] };
    case GET_TEACHERS:
      return { ...state, teachers: action.payload };
    case GET_TEACHER_DETAIL:
      return { ...state, teacherDetail: action.payload };
    case UPDATE_TEACHER_SUBJECT:
      const updatedTeacher = action.payload;
      return {
        ...state,
        teachers: state.teachers.map(t => t._id === updatedTeacher._id ? updatedTeacher : t),
        teacherDetail: state.teacherDetail && state.teacherDetail._id === updatedTeacher._id ? updatedTeacher : state.teacherDetail
      };
    default:
      return state;
  }
}
