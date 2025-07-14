import axios from 'axios';
import {
  teacherRequestStart,
  teacherAddSuccess,
  teacherListSuccess,
  teacherDetailSuccess,
  teacherSubjectUpdateSuccess,
  teacherRequestFailure
} from './teacherSlice'; // adjust the path as necessary

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5001";


// ✅ Add Teacher
export const addTeacher = (teacherData) => async (dispatch) => {
  dispatch(teacherRequestStart());
  try {
    const formData = new FormData();

    // Append simple fields and handle nested/array/file fields properly
    Object.keys(teacherData).forEach(key => {
      const value = teacherData[key];

      // Handle photo and digitalSignature
      if ((key === 'photo' || key === 'digitalSignature') && value) {
        formData.append(key, value);
      }
      // Handle nested objects (emergencyContact, salaryBreakup, leaveBalance)
      else if (['emergencyContact', 'salaryBreakup', 'leaveBalance'].includes(key)) {
        formData.append(key, JSON.stringify(value));
      }
      // Handle subjects and classesAssigned (arrays)
      else if (['subjects', 'classesAssigned'].includes(key)) {
        formData.append(key, JSON.stringify(value));
      }
      // Handle documents (object with possible arrays/files)
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
      // All other fields
      else if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    const res = await axios.post(`${REACT_APP_BASE_URL}/TeacherReg`, formData);
    dispatch(teacherAddSuccess(res.data));
  } catch (error) {
    dispatch(teacherRequestFailure(error.message));
  }
};


// ✅ Get All Teachers
export const getTeachers = () => async (dispatch) => {
  dispatch(teacherRequestStart());
  try {
    const res = await axios.get(`${REACT_APP_BASE_URL}/Teachers`);
    dispatch(teacherListSuccess(res.data));
  } catch (error) {
    dispatch(teacherRequestFailure(error.message));
  }
};

// ✅ Get One Teacher Detail
export const getTeacherDetail = (id) => async (dispatch) => {
  dispatch(teacherRequestStart());
  try {
    const res = await axios.get(`${REACT_APP_BASE_URL}/Teacher/${id}`);
    dispatch(teacherDetailSuccess(res.data));
  } catch (error) {
    dispatch(teacherRequestFailure(error.message));
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
    dispatch(teacherRequestFailure(error.message));
  }
};