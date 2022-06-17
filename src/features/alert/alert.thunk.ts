import { AppThunk } from '../../app';
import { IAlertPayload } from './alert.interface';
import { hideAlert, showAlert } from './alertSlice';

export const callAlert =
  (payload: IAlertPayload): AppThunk =>
  (dispatch) => {
    dispatch(showAlert(payload));

    setTimeout(() => {
      dispatch(hideAlert());
    }, 4000);
  };
