import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IVideosState } from './videos.interface';
import { getAllFeeds, getSpecificVideo, recommendedFeed } from './videosAsyncThunk';

const initialState: IVideosState = {
  feed: null,
  recommended: null,
  loading: false,
  status: 'idle',
};

export const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    setFeed: (state, action) => {
      if (state.feed) {
        state.feed = state.feed.concat(action.payload);
      } else {
        state.feed = [action.payload];
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
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
      })
      .addCase(recommendedFeed.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(recommendedFeed.fulfilled, (state, action) => {
        state.status = 'idle';
        state.recommended = action.payload;
      })
      .addCase(recommendedFeed.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getSpecificVideo.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(getSpecificVideo.fulfilled, (state, action) => {
        state.status = 'idle';

        if (action.payload) {
          state.feed = [action.payload];
        }

        state.loading = false;
      })
      .addCase(getSpecificVideo.rejected, (state) => {
        state.status = 'failed';
        state.loading = false;
      });
  },
});

export const { setFeed, setLoading } = videosSlice.actions;

export default videosSlice.reducer;
