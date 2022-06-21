import { Flex, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RecommendedVideos, Spinner } from '.';
import { useAppDispatch, useAppSelector } from '../app';
import { IUserInfoData } from '../features/users/users.interface';
import { selectUserInfo } from '../features/users/users.selectors';
import { getUserInfo } from '../features/users/usersAsyncThunk';
import { selectUploadedVideos, selecVideosLoading } from '../features/videos/videos.selectors';
import { userUploadedVideos } from '../features/videos/videosAsyncThunk';

const randomImage = 'https://source.unsplash.com/1600x900/?nature,photography,technology';

function UserProfile() {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState<IUserInfoData | null>(null);
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUserInfo);
  const isLoading = useAppSelector(selecVideosLoading);
  const feed = useAppSelector(selectUploadedVideos);

  useEffect(() => {
    if (userId) {
      dispatch(getUserInfo(userId));
      dispatch(userUploadedVideos(userId));
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      setUserInfo(users[userId]);
    }
  }, [users]);

  if (isLoading) {
    return <Spinner msg="Loading..." />;
  }

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      height="auto"
      width="full"
      p={2}
      direction="column">
      <Flex justifyContent="center" width="full" direction="column" alignItems="center">
        <Image src={randomImage} height="320px" width="full" objectFit="cover" borderRadius="md" />
        <Image
          src={userInfo?.photoURL}
          width="120px"
          objectFit="cover"
          border="2px"
          borderColor="gray.100"
          rounded="full"
          shadow="lg"
          mt="-16"
        />
      </Flex>
      {feed && !!feed.length && (
        <Flex direction="column" width="full" my={6}>
          <RecommendedVideos feeds={feed} />
        </Flex>
      )}
    </Flex>
  );
}

export default UserProfile;
