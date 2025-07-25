// import { configureStore } from '@reduxjs/toolkit';
// import { userReducer } from './userRelated/userSlice';
// import studentReducer from './studentRelated/studentHandle';
// import { noticeReducer } from './noticeRelated/noticeSlice';
// import { sclassReducer } from './sclassRelated/sclassSlice';
// import { teacherReducer } from './teacherRelated/teacherSlice';
// import { complainReducer } from './complainRelated/complainSlice';

// const store = configureStore({
//     reducer: {
//         user: userReducer,
//         student: studentReducer,
//         teacher: teacherReducer,
//         notice: noticeReducer,
//         complain: complainReducer,
//         sclass: sclassReducer
//     },
// });

// export default store;
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userRelated/userSlice';
import { studentReducer } from './studentRelated/studentSlice';  // <-- UPDATED! Import from studentSlice.js
import { noticeReducer } from './noticeRelated/noticeSlice';
import { sclassReducer } from './sclassRelated/sclassSlice';
import { teacherReducer } from './teacherRelated/teacherSlice';
import { complainReducer } from './complainRelated/complainSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        student: studentReducer,     // <-- from studentSlice.js
        teacher: teacherReducer,
        notice: noticeReducer,
        complain: complainReducer,
        sclass: sclassReducer
    },
});

export default store;
