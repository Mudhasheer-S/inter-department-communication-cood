// src/redux/departmentSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const departmentSlice = createSlice({
  name: 'department',
  initialState: {
    name: '',
    location: '',
    role: '',
  },
  reducers: {
    setDepartmentName: (state, action) => {
      state.name = action.payload;
    },
    setDepartmentLocation: (state, action) => {
      state.location = action.payload;
    },
    setDepartmentRole: (state, action) => {
      state.role = action.payload;
    }
  },
});

export const { setDepartmentName, setDepartmentLocation, setDepartmentRole } = departmentSlice.actions;

export default departmentSlice.reducer;
