import { SimpleGrid } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Spinner, VideoPin } from '.';
import { useAppDispatch, useAppSelector } from '../app';
import { selecVideos, selecVideosLoading } from '../features/videos/videos.selectors';
import { getAllFeeds } from '../features/videos/videosAsyncThunk';

function Feed() {
  const loading = useAppSelector(selecVideosLoading);
  const feeds = useAppSelector(selecVideos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!feeds) {
      dispatch(getAllFeeds());
    }
  }, []);

  if (loading) {
    return <Spinner msg="Loading your feeds" />;
  }

  return (
    <SimpleGrid
      minChildWidth="300px"
      spacing="15px"
      width="full"
      autoColumns="max-content"
      px="2"
      overflowX="hidden">
      {feeds &&
        feeds.map((feed) => <VideoPin key={feed.id} maxWidth={420} height="80px" data={feed} />)}
    </SimpleGrid>
  );
}

export default Feed;
