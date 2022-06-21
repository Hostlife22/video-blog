import { RootState } from '../../app';

export const selecVideos = (state: RootState) => state.videos.feed;
export const selectRecommendedVideos = (state: RootState) => state.videos.recommended;
export const selectUploadedVideos = (state: RootState) => state.videos.uploaded;
export const selecVideosLoading = (state: RootState) => state.videos.loading;
