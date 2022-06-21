export interface IVideosState {
  feed: IFeedData[] | null;
  recommended: IFeedData[] | null;
  uploaded: IFeedData[] | null;
  loading: boolean;
  status: 'idle' | 'loading' | 'failed';
}

export interface IFeedData {
  category: string;
  description: string;
  id: string;
  location: string;
  title: string;
  userId: string;
  videoUrl: string;
}

export interface IUserInfo {
  displayName: string;
  email: string;
  phoneNumber: null | string;
  photoURL: string;
  providerId: string;
  uid: string;
}

export interface IArgs {
  videoId: string;
  categoryId: string;
}
