import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
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
