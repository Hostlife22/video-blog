import { createSlice } from '@reduxjs/toolkit';
import { IUserInfo, IVideosState } from './users.interface';
import { getUserInfo } from './usersAsyncThunk';

const initialState: IVideosState = {
  usersInfo: {},
  status: 'idle',
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.status = 'idle';

        if (action.payload) {
          state.usersInfo = { ...state.usersInfo, ...action.payload } as IUserInfo;
        }
      })
      .addCase(getUserInfo.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default usersSlice.reducer;
