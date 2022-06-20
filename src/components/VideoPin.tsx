import { Flex, Image, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';
import moment from 'moment';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app';
import { selectUserInfo } from '../features/users/users.selectors';
import { getUserInfo } from '../features/users/usersAsyncThunk';
import { IFeedData } from '../features/videos/videos.interface';

interface IVideoPinProps {
  data: IFeedData;
}

function VideoPin({ data }: IVideoPinProps) {
  const { colorMode } = useColorMode();
  const bg = useColorModeValue('blackAlpha.700', 'gray.900');
  const textColor = useColorModeValue('gray.100', 'gray.100');
  const dispatch = useAppDispatch();
  const usersInfo = useAppSelector(selectUserInfo);
  const user = usersInfo[data.userId];

  useEffect(() => {
    data && dispatch(getUserInfo(data.userId));
  }, []);

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      flexDirection="column"
      cursor="pointer"
      shadow="lg"
      _hover={{ shadow: 'xl' }}
      rounded="md"
      overflow="hidden"
      position="relative"
      maxWidth="300px">
      <Link to={`/videoDetail/${data?.id}`}>
        <video
          src={data.videoUrl}
          muted
          onMouseOver={(e) => {
            e.currentTarget.play();
          }}
          onMouseOut={(e) => {
            e.currentTarget.pause();
          }}
        />
      </Link>
      <Flex position="absolute" bottom="0" left="0" p={2} bg={bg} width="full" direction="column">
        <Flex width="full" justifyContent="space-between" alignItems="center">
          <Text color={textColor} noOfLines={1} fontSize={20}>
            {data.title}
          </Text>

          <Link to={`/userDetail/${data.userId}`} style={{ display: 'contents' }}>
            <Image
              src={user?.photoURL}
              rounded="full"
              width="50px"
              height="50px"
              border="2px"
              borderColor={bg}
              mt={-10}
            />
          </Link>
        </Flex>
        <Text color={textColor} ml="auto" fontSize={12}>
          {moment(new Date(parseInt(data.id)).toISOString()).fromNow()}
        </Text>
      </Flex>
    </Flex>
  );
}

export default VideoPin;
