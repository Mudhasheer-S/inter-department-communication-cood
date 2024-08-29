// src/redux/projectManagerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: sessionStorage.getItem('projectManagerId') || '',
  name: sessionStorage.getItem('projectManagerName') || '',
};

export const projectManagerSlice = createSlice({
  name: 'projectManager',
  initialState,
  reducers: {
    setProjectManagerId: (state, action) => {
      state.id = action.payload;
      sessionStorage.setItem('projectManagerId', action.payload); // Save to sessionStorage
    },
    setProjectManagerName: (state, action) => {
      state.name = action.payload;
      sessionStorage.setItem('projectManagerName', action.payload); // Save to sessionStorage
    },
  },
});

export const { setProjectManagerId, setProjectManagerName } = projectManagerSlice.actions;

export default projectManagerSlice.reducer;
