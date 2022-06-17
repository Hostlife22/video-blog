import { IoCheckmark, IoWarning } from 'react-icons/io5';
import { IAlertPayload } from '../features/alert/alert.interface';

export interface IAlertData {
  [key: string]: IAlertPayload;
}

export const alertData: IAlertData = {
  upload: {
    status: 'success',
    message: 'Your video is uploaded to our server',
    icon: <IoCheckmark fontSize={25} />,
  },
  remove: {
    status: 'error',
    message: 'Your video was removes from our server',
    icon: <IoWarning fontSize={25} />,
  },
  require: {
    status: 'error',
    message: 'Required Fields are missing',
    icon: <IoWarning fontSize={25} />,
  },
};
