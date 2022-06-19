export interface IUserInfo {
  [key: string]: IUserInfoData;
}

export interface IUserInfoData {
  displayName: string;
  email: string;
  phoneNumber: null | string;
  photoURL: string;
  providerId: string;
  uid: string;
}

export type PayloadUserInfo = null | IUserInfo;

export interface IVideosState {
  usersInfo: IUserInfo;
  status: 'idle' | 'loading' | 'failed';
}
