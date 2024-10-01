import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    username: string;
    token: string;
  } | null;
}

const initialState: AuthState = {
  isAuthenticated: !!Cookies.get('token'),
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ username: string; token: string }>) => {
      state.isAuthenticated = true;
      state.user = {
        username: action.payload.username,
        token: action.payload.token,
      };
      Cookies.set('token', action.payload.token);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      Cookies.remove('token');
    },
    setToken: (state, action: PayloadAction<string>) => {
      Cookies.set('token', action.payload);
      state.isAuthenticated = true;
    },
  },
});

export const { login, logout, setToken } = authSlice.actions;
export default authSlice.reducer;
