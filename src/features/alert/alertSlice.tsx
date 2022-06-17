import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAlertPayload, IAlertState } from './alert.interface';

const initialState: IAlertState = {
  alert: false,
  status: null,
  message: '',
  icon: null,
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<IAlertPayload>) => {
      state.alert = true;
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.icon = action.payload.icon;
    },

    hideAlert: (state) => {
      state.alert = false;
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;

export default alertSlice.reducer;
