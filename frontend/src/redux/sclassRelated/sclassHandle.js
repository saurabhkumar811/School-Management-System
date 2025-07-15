import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    getStudentsSuccess,
    detailsSuccess,
    getFailedTwo,
    getSubjectsSuccess,
    getSubDetailsSuccess,
    getSubDetailsRequest
} from './sclassSlice';

const REACT_APP_BASE_URL = "http://localhost:5001";

export const getAllSclasses = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${REACT_APP_BASE_URL}/${address}List/${id}`);
        if (result.data.message) {
            dispatch(getFailedTwo(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (err) {
        dispatch(getError(err.response?.data?.error || err.message));
    }
};

export const getClassStudents = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${REACT_APP_BASE_URL}/Sclass/Students/${id}`);
        if (result.data.message) {
            dispatch(getFailedTwo(result.data.message));
        } else {
            dispatch(getStudentsSuccess(result.data));
        }
    } catch (err) {
        dispatch(getError(err.response?.data?.error || err.message));
    }
};

export const getClassDetails = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${REACT_APP_BASE_URL}/${address}/${id}`);
        if (result.data) {
            dispatch(detailsSuccess(result.data));
        }
    } catch (err) {
        dispatch(getError(err.response?.data?.error || err.message));
    }
};

export const getSubjectList = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${REACT_APP_BASE_URL}/${address}/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSubjectsSuccess(result.data));
        }
    } catch (err) {
        dispatch(getError(err.response?.data?.error || err.message));
    }
};

export const getTeacherFreeClassSubjects = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${REACT_APP_BASE_URL}/FreeSubjectList/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSubjectsSuccess(result.data));
        }
    } catch (err) {
        dispatch(getError(err.response?.data?.error || err.message));
    }
};

export const getSubjectDetails = (id, address) => async (dispatch) => {
    dispatch(getSubDetailsRequest());

    try {
        const result = await axios.get(`${REACT_APP_BASE_URL}/${address}/${id}`);
        if (result.data) {
            dispatch(getSubDetailsSuccess(result.data));
        }
    } catch (err) {
        dispatch(getError(err.response?.data?.error || err.message));
    }
};

// ✅ Get Subject by ID (Fixed version)
export const getSubject = (subjectId) => async (dispatch) => {
    if (!subjectId) {
        console.error("❌ getSubject called with undefined subjectId");
        return; // Prevent API call
    }

    dispatch(getRequest());

    try {
        const res = await axios.get(`${REACT_APP_BASE_URL}/Subject/${subjectId}`);
        dispatch(getSubjectsSuccess([res.data])); 
    } catch (err) {
        dispatch(getError(err.response?.data?.error || err.message));
    }
};

