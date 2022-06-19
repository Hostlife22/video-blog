import { createAsyncThunk } from '@reduxjs/toolkit';
import { doc, getDoc } from 'firebase/firestore';
import { firebaseDb } from '../../firebase/firebase-config';
import { IUserInfo } from './users.interface';

export const getUserInfo = createAsyncThunk(
  'users/userInfo',
  async (userId: string, { rejectWithValue, getState }) => {
    try {
      const { users } = getState() as { users: IUserInfo };

      if (userId in users) return null;

      const userRef = doc(firebaseDb, 'users', userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data() as IUserInfo;
        return {
          [`${userData.uid}`]: userData,
        };
      }

      return null;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);
