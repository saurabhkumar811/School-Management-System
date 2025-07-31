import axios from 'axios';
import {
  teacherRequestStart,
  teacherAddSuccess,
  teacherListSuccess,
  teacherDetailSuccess,
  teacherSubjectUpdateSuccess,
  teacherRequestFailure
} from './teacherSlice';

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5001";

// ✅ Add Teacher
export const addTeacher = (teacherData) => async (dispatch) => {
  dispatch(teacherRequestStart());
  try {
    const formData = new FormData();

    Object.keys(teacherData).forEach(key => {
      const value = teacherData[key];

      if ((key === 'photo' || key === 'digitalSignature') && value) {
        formData.append(key, value);
      }
      else if (['emergencyContact', 'salaryBreakup', 'leaveBalance'].includes(key)) {
        formData.append(key, JSON.stringify(value));
      }
      else if (['subjects', 'classesAssigned'].includes(key)) {
        formData.append(key, JSON.stringify(value));
      }
      else if (key === 'documents') {
        Object.keys(value).forEach(docKey => {
          const docVal = value[docKey];
          if (Array.isArray(docVal)) {
            docVal.forEach(file => {
              if (file) formData.append(`documents.${docKey}`, file);
            });
          } else if (docVal) {
            formData.append(`documents.${docKey}`, docVal);
          }
        });
      }
      else if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    const res = await axios.post(`${REACT_APP_BASE_URL}/TeacherReg`, formData);
    dispatch(teacherAddSuccess(res.data));
  } catch (error) {
    dispatch(teacherRequestFailure(error.response?.data?.error || error.message));
  }
};

// ✅ Get All Teachers (No School ID)
export const getTeachers = () => async (dispatch) => {
  dispatch(teacherRequestStart());
  try {
    const res = await axios.get(`${REACT_APP_BASE_URL}/Teachers`);
    dispatch(teacherListSuccess(res.data));
  } catch (error) {
    dispatch(teacherRequestFailure(error.response?.data?.error || error.message));
  }
};


// ✅ Get One Teacher Detail
export const getTeacherDetail = (id) => async (dispatch) => {
  dispatch(teacherRequestStart());
  try {
    const res = await axios.get(`${REACT_APP_BASE_URL}/Teacher/${id}`);
    dispatch(teacherDetailSuccess(res.data));
  } catch (error) {
    dispatch(teacherRequestFailure(error.response?.data?.error || error.message));
  }
};

// ✅ Update Teacher Subject
export const updateTeacherSubject = (data) => async (dispatch) => {
  dispatch(teacherRequestStart());
  try {
    const { teacherId, subjects } = data;
    const res = await axios.put(`${REACT_APP_BASE_URL}/TeacherSubject`, { teacherId, subjects });
    dispatch(teacherSubjectUpdateSuccess(res.data));
  } catch (error) {
    dispatch(teacherRequestFailure(error.response?.data?.error || error.message));
  }
};

// ✅ Get Teacher Class-Subject Assignments
export const getTeacherClassSubjects = (teacherId) => async (dispatch) => {
  dispatch(teacherRequestStart());
  try {
    const res = await axios.get(`${REACT_APP_BASE_URL}/TeacherClassSubjects/${teacherId}`);
    dispatch(teacherDetailSuccess(res.data));
  } catch (error) {
    dispatch(teacherRequestFailure(error.response?.data?.error || error.message));
  }
};

// Login 
export const teacherLogin = (email, password) => async (dispatch) => {
  dispatch(teacherRequestStart());
  try {
    console.log("balle balee!!")
    const res = await axios.post(`${REACT_APP_BASE_URL}/TeacherLogin`, {
      email,
      password
    });
    dispatch(teacherDetailSuccess(res.data));
  } catch (error) {
    console.log("balle balee!!")
    dispatch(teacherRequestFailure(error.response?.data?.error || error.message));
  }
};

// ✅ Assign Class to Teacher
export const assignClassToTeacher = ({ teacherId, classId }) => async (dispatch) => {
  dispatch(teacherRequestStart());
  try {
    const res = await axios.put(`${REACT_APP_BASE_URL}/TeacherAssignClass`, {
      teacherId,
      classId
    });
    dispatch(teacherSubjectUpdateSuccess(res.data.teacher));
  } catch (error) {
    dispatch(teacherRequestFailure(error.response?.data?.error || error.message));
  }
};

// ✅ Assign Subject to Teacher
export const assignSubjectToTeacher = ({ teacherId, subjectId }) => async (dispatch) => {
  dispatch(teacherRequestStart());
  try {
    const res = await axios.put(`${REACT_APP_BASE_URL}/TeacherAssignSubject`, {
      teacherId,
      subjectId
    });
    dispatch(teacherSubjectUpdateSuccess(res.data.teacher));

  } catch (error) {
    dispatch(teacherRequestFailure(error.response?.data?.error || error.message));
  }
};

// Remove Class from Teacher
export const removeTeacherClass = ({ teacherId, classId }) => async (dispatch) => {
  dispatch(teacherRequestStart());
  try {
    const res = await axios.put(`${REACT_APP_BASE_URL}/RemoveTeacherClass`, {
      teacherId,
      classId
    });
    dispatch(teacherSubjectUpdateSuccess(res.data.teacher));
  } catch (error) {
    dispatch(teacherRequestFailure(error.response?.data?.error || error.message));
  }
};

// Remove Subject from Teacher
export const removeTeacherSubject = ({ teacherId, subjectId }) => async (dispatch) => {
  dispatch(teacherRequestStart());
  try {
    const res = await axios.put(`${REACT_APP_BASE_URL}/RemoveTeacherSubject`, {
      teacherId,
      subjectId
    });
    dispatch(teacherSubjectUpdateSuccess(res.data.teacher));
  } catch (error) {
    dispatch(teacherRequestFailure(error.response?.data?.error || error.message));
  }
};
