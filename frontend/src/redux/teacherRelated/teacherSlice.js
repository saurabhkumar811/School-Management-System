import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teachersList: [],
  teacherDetails: null,
  loading: false,
  error: null,
  response: null,
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    teacherRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.response = null;
    },
    teacherAddSuccess: (state, action) => {
      state.teachersList.push(action.payload);
      state.loading = false;
    },
    teacherListSuccess: (state, action) => {
      state.teachersList = action.payload;
      state.loading = false;
    },
    teacherDetailSuccess: (state, action) => {
      state.teacherDetails = action.payload;
      state.loading = false;
    },
    teacherSubjectUpdateSuccess: (state, action) => {
      const updated = action.payload;
      state.teachersList = state.teachersList.map((t) =>
        t._id === updated._id ? updated : t
      );
      if (state.teacherDetails && state.teacherDetails._id === updated._id) {
        state.teacherDetails = updated;
      }
      state.loading = false;
    },
    teacherRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    teacherRequestClear: (state) => {
      state.loading = false;
      state.error = null;
      state.response = null;
    },
  },
});

export const {
  teacherRequestStart,
  teacherAddSuccess,
  teacherListSuccess,
  teacherDetailSuccess,
  teacherSubjectUpdateSuccess,
  teacherRequestFailure,
  teacherRequestClear,
} = teacherSlice.actions;

export const teacherReducer = teacherSlice.reducer;