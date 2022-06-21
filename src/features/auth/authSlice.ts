import { createSlice } from '@reduxjs/toolkit';
import { UserInfo } from 'firebase/auth';
import { IAuthState } from './auth.interface';
import { loginAsync } from './authAsyncThunk';

const initialState: IAuthState = {
  user: [],
  accessToken: '',
  status: 'idle',
};

export const authSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    fetchUser: (state) => {
      const userInfo = localStorage.getItem('user');
      const accessToken = localStorage.getItem('accessToken');

      if (userInfo && accessToken) {
        state.user = JSON.parse(userInfo) as UserInfo[];
        state.accessToken = JSON.parse(accessToken);
      } else {
        localStorage.clear();
      }
    },
    logOut: (state) => {
      localStorage.clear();
      state.user = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { fetchUser, logOut } = authSlice.actions;

export default authSlice.reducer;
