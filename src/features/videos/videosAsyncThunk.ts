import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { firebaseDb } from '../../firebase/firebase-config';
import { IFeedData } from './videos.interface';

export const getAllFeeds = createAsyncThunk('videos/allFeeds', async (_, { rejectWithValue }) => {
  try {
    const feeds = await getDocs(query(collection(firebaseDb, 'videos'), orderBy('id', 'desc')));

    return feeds.docs.map((date) => date.data() as IFeedData);
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const getSpecificVideo = createAsyncThunk(
  'videos/video',
  async (videoId: string, { rejectWithValue, getState }) => {
    try {
      const { feed } = getState() as { feed: IFeedData[] };

      if (feed?.find((f) => f.id === videoId)) return null;

      const videoRef = doc(firebaseDb, 'videos', videoId);
      const videoSnap = await getDoc(videoRef);

      if (videoSnap.exists()) {
        return videoSnap.data() as IFeedData;
      }

      return null;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);
