import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: sessionStorage.getItem('siteEngineerEmail') || '',
  name: sessionStorage.getItem('siteEngineerName') || '',
};

export const siteEngineerSlice = createSlice({
  name: 'siteEngineerSlice',
  initialState,
  reducers: {
    setsiteEngineerEmail: (state, action) => {
      state.email = action.payload;
      sessionStorage.setItem('siteEngineerEmail', action.payload);
    },
    setsiteEngineerName: (state, action) => {
      state.name = action.payload;
      sessionStorage.setItem('siteEngineerName', action.payload);
    },
    logout: (state) => {
      state.email = '';
      state.name = '';
      sessionStorage.removeItem('siteEngineerEmail');
      sessionStorage.removeItem('siteEngineerName');
    },
  },
});

export const { setsiteEngineerEmail, setsiteEngineerName,logout } = siteEngineerSlice.actions;

export default siteEngineerSlice.reducer;
