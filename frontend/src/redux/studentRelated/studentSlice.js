// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     studentsList: [],
//     totalStudents: 0,
//     loading: false,
//     error: null,
//     response: null,
//     statestatus: "idle",
// };

// const studentSlice = createSlice({
//     name: 'student',
//     initialState,
//     reducers: {
//         getRequest: (state) => {
//             state.loading = true;
//         },
//         stuffDone: (state) => {
//             state.loading = false;
//             state.error = null;
//             state.response = null;
//             state.statestatus = "added";
//         },
//         getSuccess: (state, action) => {
//             state.studentsList = action.payload.students;
//             state.totalStudents = action.payload.total;
//             state.loading = false;
//             state.error = null;
//             state.response = null;
//         },
//         getFailed: (state, action) => {
//             state.response = action.payload;
//             state.loading = false;
//             state.error = null;
//         },
//         getError: (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         },
//         underStudentControl: (state) => {
//             state.loading = false;
//             state.response = null;
//             state.error = null;
//             state.statestatus = "idle";
//         }
//     },
// });

// export const {
//     getRequest,
//     getSuccess,
//     getFailed,
//     getError,
//     underStudentControl,
//     stuffDone,
// } = studentSlice.actions;

// export const studentReducer = studentSlice.reducer;
// frontend/src/redux/studentRelated/studentSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    studentsList: [],
    studentDetail: null,
    totalStudents: 0,
    loading: false,
    error: null,
    response: null,
    statestatus: "idle",
};

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        stuffDone: (state) => {
            state.loading = false;
            state.error = null;
            state.response = null;
            state.statestatus = "added";
        },
        getSuccess: (state, action) => {
            state.studentsList = action.payload.students;
            state.totalStudents = action.payload.total;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getFailed: (state, action) => {
            state.response = action.payload;
            state.loading = false;
            state.error = null;
        },
        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        getStudentDetailSuccess: (state, action) => {
            state.studentDetail = action.payload;
            state.loading = false;
            state.error = null;
        },
        underStudentControl: (state) => {
            state.loading = false;
            state.response = null;
            state.error = null;
            state.statestatus = "idle";
        }
    },
});

export const {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    stuffDone,
    getStudentDetailSuccess,
    underStudentControl,
} = studentSlice.actions;

export const studentReducer = studentSlice.reducer;
