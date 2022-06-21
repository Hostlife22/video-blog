import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import HTMLReactParser from 'html-react-parser';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { FcApproval } from 'react-icons/fc';
import { IoHome } from 'react-icons/io5';
import { Link, useParams } from 'react-router-dom';
import { PopUp, RecommendedVideos, Spinner, VideoPlayer } from '.';
import { useAppDispatch, useAppSelector } from '../app';
import { selectUser } from '../features/auth/auth.selectors';
import { IUserInfoData } from '../features/users/users.interface';
import { selectUserInfo } from '../features/users/users.selectors';
import { getUserInfo } from '../features/users/usersAsyncThunk';
import { IFeedData } from '../features/videos/videos.interface';
import {
  selectRecommendedVideos,
  selecVideos,
  selecVideosLoading,
} from '../features/videos/videos.selectors';
import { getSpecificVideo, recommendedFeed } from '../features/videos/videosAsyncThunk';
import { AvatarSprite } from '../img';

function VideoPinDetail() {
  const [videoInfo, setVideoInfo] = useState<IFeedData | null>();
  const [user, setUser] = useState<IUserInfoData | null | undefined>(null);
  const { videoId } = useParams();
  const dispatch = useAppDispatch();
  const textColor = useColorModeValue('gray.900', 'gray.50');
  const loading = useAppSelector(selecVideosLoading);
  const feeds = useAppSelector(selecVideos);
  const recFeeds = useAppSelector(selectRecommendedVideos);
  const [localUser] = useAppSelector(selectUser);
  const usersInfo = useAppSelector(selectUserInfo);

  useEffect(() => {
    if (videoId && !feeds) {
      dispatch(getSpecificVideo(videoId));
    }
  }, [videoId]);

  useEffect(() => {
    if (feeds) {
      setVideoInfo(feeds.find((feed) => feed.id === videoId));
    }
    if (videoId && videoInfo) {
      dispatch(getUserInfo(videoInfo.userId));
    }
  }, [feeds]);

  useEffect(() => {
    if (videoInfo?.userId && usersInfo) {
      setUser(usersInfo[videoInfo.userId]);
    }

    if (videoInfo?.userId && videoId) {
      dispatch(
        recommendedFeed({
          categoryId: videoInfo.category,
          videoId,
        }),
      );
    }
  }, [usersInfo, videoInfo?.userId]);

  if (loading) {
    return <Spinner msg="Loading your feed" />;
  }

  return (
    <Flex
      width="full"
      height="auto"
      justifyContent="center"
      alignItems="center"
      direction="column"
      py={2}
      px={4}>
      <Flex alignItems="center" width="full" my={4}>
        <Link to="/">
          <IoHome size={25} />
        </Link>
        <Box width="1px" height="25px" bg="gray.500" mx={2} />
        <Text color={textColor} noOfLines={1} fontWeight="semibold" width="100%">
          {videoInfo?.title}
        </Text>
      </Flex>

      <Grid templateColumns="repeat(4, 1fr)" gap={2} width="100%">
        <GridItem width="100%" colSpan={3}>
          <VideoPlayer videoUrl={videoInfo?.videoUrl} />
          {videoInfo?.description && (
            <Flex my={6} direction="column">
              <Text my={2} fontSize={25} fontWeight="semibold">
                Description
              </Text>
              {HTMLReactParser(videoInfo?.description)}
            </Flex>
          )}
        </GridItem>
        <GridItem width="100%" colSpan={1}>
          {user && (
            <Flex direction="column" width="full">
              <Flex alignItems="center" width="full">
                <Image
                  src={user?.photoURL ? user?.photoURL : AvatarSprite}
                  rounded="full"
                  width="60px"
                  height="60px"
                  minHeight="60px"
                  minWidth="60px"
                />

                <Flex direction="column" ml={3}>
                  <Flex alignItems="center">
                    <Text color={textColor} noOfLines={1} fontWeight="semibold">
                      {user?.displayName}
                    </Text>
                    <FcApproval />
                  </Flex>
                  {videoInfo?.id && (
                    <Text fontSize={12}>
                      {moment(new Date(parseInt(videoInfo.id)).toISOString()).fromNow()}
                    </Text>
                  )}
                </Flex>
              </Flex>
              <Flex justifyContent="space-around" mt={6}>
                {user?.uid === localUser.uid && <PopUp videoId={videoInfo?.id} />}
                <a
                  href={videoInfo?.videoUrl}
                  target="_blank"
                  download
                  onClick={(e) => e.stopPropagation()}
                  rel="noreferrer">
                  <Button colorScheme="whatsapp" rounded="full" my={2} mt="0">
                    Free Download
                  </Button>
                </a>
              </Flex>
            </Flex>
          )}
        </GridItem>
      </Grid>

      {recFeeds && !!recFeeds.length && (
        <Flex direction="column" width="full" my={6}>
          <Text my={4} fontSize={25} fontWeight="semibold">
            Recommended Videos
          </Text>
          <RecommendedVideos feeds={recFeeds} />
        </Flex>
      )}
    </Flex>
  );
}

export default VideoPinDetail;
