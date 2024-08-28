// src/redux/departmentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: sessionStorage.getItem('departmentId') || '',
  name: sessionStorage.getItem('departmentName') || '',
  location: sessionStorage.getItem('departmentLocation') || '',
  role: sessionStorage.getItem('departmentRole') || '',
};

export const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {
    setDepartmentId: (state, action) => {
      state.id = action.payload;
      sessionStorage.setItem('departmentId', action.payload); // Save to sessionStorage
    },
    setDepartmentName: (state, action) => {
      state.name = action.payload;
      sessionStorage.setItem('departmentName', action.payload); 
    },
    setDepartmentLocation: (state, action) => {
      state.location = action.payload;
      sessionStorage.setItem('departmentLocation', action.payload); 
    },
    setDepartmentRole: (state, action) => {
      state.role = action.payload;
      sessionStorage.setItem('departmentRole', action.payload); 
    }
  },
});

export const { setDepartmentId , setDepartmentName, setDepartmentLocation, setDepartmentRole } = departmentSlice.actions;

export default departmentSlice.reducer;
