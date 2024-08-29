// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import departmentReducer from './departmentSlice';
import projectManagerReducer from './projectManagerSlice';

export const store = configureStore({
  reducer: {
    department: departmentReducer,
    projectManager: projectManagerReducer,
  },
});

export default store;
