import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import alertReducer from '../features/alert/alertSlice';
import authReducer from '../features/auth/authSlice';
import searchReducer from '../features/search/searchSlice';
import usersReducer from '../features/users/usersSlice';
import videoAssetReducer from '../features/videoAsset/videoAssetSlice';
import videosReducer from '../features/videos/videosSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer,
    videoAsset: videoAssetReducer,
    videos: videosReducer,
    users: usersReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
