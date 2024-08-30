// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import departmentReducer from './departmentSlice';
import projectManagerReducer from './projectManagerSlice';
import siteEngineerSlice from './siteEngineerSlice';

export const store = configureStore({
  reducer: {
    department: departmentReducer,
    projectManager: projectManagerReducer,
    siteEngineer: siteEngineerSlice,
  },
});

export default store;
