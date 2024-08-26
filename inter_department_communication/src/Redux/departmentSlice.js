// src/redux/departmentSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const departmentSlice = createSlice({
  name: 'department',
  initialState: {
    name: '',
  },
  reducers: {
    setDepartmentName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { setDepartmentName } = departmentSlice.actions;

export default departmentSlice.reducer;
