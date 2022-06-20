import { Box, Flex, Grid, GridItem, Text, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { IoHome } from 'react-icons/io5';
import { Link, useParams } from 'react-router-dom';
import { Spinner, VideoPlayer } from '.';
import { useAppDispatch, useAppSelector } from '../app';
import { IFeedData } from '../features/videos/videos.interface';
import { selecVideos, selecVideosLoading } from '../features/videos/videos.selectors';
import { getSpecificVideo } from '../features/videos/videosAsyncThunk';

function VideoPinDetail() {
  const { videoId } = useParams();
  const loading = useAppSelector(selecVideosLoading);
  const feeds = useAppSelector(selecVideos);
  const dispatch = useAppDispatch();
  const textColor = useColorModeValue('gray.900', 'gray.50');
  const [videoInfo, setVideoInfo] = useState<IFeedData | null>();

  useEffect(() => {
    if (videoId && !feeds) {
      dispatch(getSpecificVideo(videoId));
    }
  }, [videoId]);

  useEffect(() => {
    if (feeds) {
      setVideoInfo(feeds.find((feed) => feed.id === videoId));
    }
  }, [feeds]);

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

      <Grid templateColumns="repeat(3, 1fr)" gap={2} width="100%">
        <GridItem width="100%" colSpan={2}>
          <VideoPlayer videoUrl={videoInfo?.videoUrl} />
        </GridItem>
        <GridItem width="100%" colSpan={1}>
          d
        </GridItem>
      </Grid>
    </Flex>
  );
}

export default VideoPinDetail;
