import { UserInfo } from 'firebase/auth';

export interface IAuthState {
  user: UserInfo[];
  accessToken: string;
  status: 'idle' | 'loading' | 'failed';
}
