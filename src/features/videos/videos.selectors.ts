import { RootState } from '../../app';

export const selecVideos = (state: RootState) => state.videos.feed;
export const selecVideosLoading = (state: RootState) => state.videos.loading;
