import { createSlice } from '@reduxjs/toolkit';
import { IVideosState } from './videos.interface';
import { getAllFeeds } from './videosAsyncThunk';

const initialState: IVideosState = {
  feed: null,
  loading: false,
  status: 'idle',
};

export const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    fetchUser: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllFeeds.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(getAllFeeds.fulfilled, (state, action) => {
        state.status = 'idle';
        state.feed = action.payload;
        state.loading = false;
      })
      .addCase(getAllFeeds.rejected, (state) => {
        state.status = 'failed';
        state.loading = false;
      });
  },
});

export const { fetchUser } = videosSlice.actions;

export default videosSlice.reducer;
