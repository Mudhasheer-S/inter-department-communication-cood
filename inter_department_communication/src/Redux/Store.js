// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import departmentReducer from './departmentSlice';

export const store = configureStore({
  reducer: {
    department: departmentReducer,
  },
});

export default store;
