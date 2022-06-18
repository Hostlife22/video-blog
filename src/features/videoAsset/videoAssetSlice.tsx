import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IVideoAssetState } from './videoAsset.interface';

const initialState: IVideoAssetState = {
  loading: false,
  progress: 0,
  videoAsset: null,
};

export const videoAssetSlice = createSlice({
  name: 'videoAsset',
  initialState,
  reducers: {
    setVideoAsset: (state, action: PayloadAction<null | string>) => {
      state.videoAsset = action.payload;
      state.loading = false;
    },
    changeProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
    changeLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setVideoAsset, changeProgress, changeLoading } = videoAssetSlice.actions;

export default videoAssetSlice.reducer;
