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
    },
    logout: (state) => {
      state.id = '';
      state.name = '';
      state.location = '';
      state.role = '';
      sessionStorage.removeItem('departmentId');
      sessionStorage.removeItem('departmentName');
      sessionStorage.removeItem('departmentLocation');
      sessionStorage.removeItem('departmentRole');
    },
  },
});

export const { setDepartmentId, setDepartmentName, setDepartmentLocation, setDepartmentRole, logout } = departmentSlice.actions;

export default departmentSlice.reducer;
