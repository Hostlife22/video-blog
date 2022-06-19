import { RootState } from '../../app';

export const selectUserInfo = (state: RootState) => state.users.usersInfo;
