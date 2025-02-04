import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    token: null,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    loginStart: (state) => {
      console.log("🟡 Reducer : loginStart");
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      console.log("✅ Reducer : loginSuccess - Token reçu :", action.payload.token);
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.loading = false;
    },
    loginFailure: (state, action) => {
      console.log("❌ Reducer : loginFailure - Erreur :", action.payload);
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      console.log("🔴 Reducer : logout");
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    },
  },
});



export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
