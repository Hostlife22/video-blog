import { createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { firebaseAuth, firebaseDb, provider } from '../../firebase/firebase-config';

export const loginAsync = createAsyncThunk('auth/login', async (_, { rejectWithValue }) => {
  try {
    const { user } = await signInWithPopup(firebaseAuth, provider);
    const { refreshToken, providerData } = user;

    localStorage.setItem('user', JSON.stringify(providerData));
    localStorage.setItem('accessToken', JSON.stringify(refreshToken));

    await setDoc(doc(firebaseDb, 'users', providerData[0].uid), providerData[0]);

    return {
      user: providerData,
      accessToken: refreshToken,
    };
  } catch (e) {
    return rejectWithValue(e);
  }
});
