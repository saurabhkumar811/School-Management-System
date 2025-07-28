import axios from 'axios';
import {
    authRequest,
    stuffAdded,
    authSuccess,
    authFailed,
    authError,
    authLogout,
    doneSuccess,
    getDeleteSuccess,
    getRequest,
    getFailed,
    getError,
} from './userSlice';
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5001";
export const loginUser = (fields, role) => async (dispatch) => {
  dispatch(authRequest());

  try {
    // For Teacher role, ensure payload matches backend expectation
    let payload = fields;

    if (role === "Teacher") {
      // adjust this if your backend expects different param names
      // Example: if backend expects { email, password }, use fields directly
      // If not, convert fields accordingly here
      payload = {
        email: fields.email,   // assuming your form sends 'email'
        password: fields.password,
      };
    }

    const result = await axios.post(`${REACT_APP_BASE_URL}/${role}Login`, payload, {
      headers: { 'Content-Type': 'application/json' },
    });

    // Check login success according to role
    // Student: result.data.roll must exist
    // Others (Admin, Teacher): result.data.role === role (case-sensitive)
    if (
      (role === "Student" && result.data && result.data.roll) ||
      (role !== "Student" && result.data && result.data.role === role)
    ) {
      dispatch(authSuccess(result.data));
    }
    else if (result.data && result.data.message) {
      dispatch(authFailed(result.data.message));
    }
    else {
      dispatch(authFailed("Unexpected response from server."));
    }
  }
  catch (error) {
    dispatch(authError(error?.response?.data?.message || error.message || String(error)));
  }
};

export const registerUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(`${REACT_APP_BASE_URL}/${role}Reg`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });

        const data = result.data;

        if (data.schoolName) {
            dispatch(authSuccess(data));
        } else if (data.school) {
            dispatch(stuffAdded(data));
        } else if (data.message) {
            dispatch(authFailed(data.message));
        } else {
            dispatch(authFailed("Unknown response from server."));
        }
    } catch (error) {
        dispatch(authError(error?.response?.data?.message || error.message));
    }
};

export const logoutUser = () => (dispatch) => {
    dispatch(authLogout());
};

export const getUserDetails = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${REACT_APP_BASE_URL}/${address}/${id}`);
        if (result.data) {
            dispatch(doneSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const deleteUser = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.delete(`${REACT_APP_BASE_URL}/${address}/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getDeleteSuccess());
        }
    } catch (error) {
        dispatch(getError(error));
    }
}


// export const deleteUser = (id, address) => async (dispatch) => {
//     dispatch(getRequest());
//     dispatch(getFailed("Sorry the delete function has been disabled for now."));
// }

export const updateUser = (fields, id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.put(`${REACT_APP_BASE_URL}/${address}/${id}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.schoolName) {
            dispatch(authSuccess(result.data));
        }
        else {
            dispatch(doneSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const addStuff = (fields, address) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(`${REACT_APP_BASE_URL}/${address}Create`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });

        if (result.data.message) {
            dispatch(authFailed(result.data.message));
        } else {
            dispatch(stuffAdded(result.data));
        }
    } catch (error) {
        dispatch(authError(error));
    }
};
