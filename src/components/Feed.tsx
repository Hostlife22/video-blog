import { SimpleGrid } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NotFound, Spinner, VideoPin } from '.';
import { useAppDispatch, useAppSelector } from '../app';
import { selecVideos, selecVideosLoading } from '../features/videos/videos.selectors';
import { categoryFeeds, getAllFeeds } from '../features/videos/videosAsyncThunk';

function Feed() {
  const loading = useAppSelector(selecVideosLoading);
  const feeds = useAppSelector(selecVideos);
  const dispatch = useAppDispatch();
  const { categoryId } = useParams();

  useEffect(() => {
    if (categoryId) {
      dispatch(categoryFeeds(categoryId));
    } else {
      dispatch(getAllFeeds());
    }
  }, [categoryId]);

  if (loading) {
    return <Spinner msg="Loading your feeds" />;
  }

  if (feeds && !feeds?.length) {
    return <NotFound />;
  }

  return (
    <SimpleGrid
      minChildWidth="300px"
      spacing="15px"
      width="full"
      autoColumns="max-content"
      px="2"
      overflowX="hidden">
      {feeds && feeds.map((feed) => <VideoPin key={feed.id} data={feed} />)}
    </SimpleGrid>
  );
}

export default Feed;
