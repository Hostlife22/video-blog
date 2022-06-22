import { SimpleGrid } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NotFound, Spinner, VideoPin } from '.';
import { useAppDispatch, useAppSelector } from '../app';
import { selectSearchValue } from '../features/search/search.selectors';
import { selecVideos, selecVideosLoading } from '../features/videos/videos.selectors';
import { categoryFeeds, getAllFeeds } from '../features/videos/videosAsyncThunk';

function Feed() {
  const loading = useAppSelector(selecVideosLoading);
  const feeds = useAppSelector(selecVideos);
  const searchValue = useAppSelector(selectSearchValue);
  const dispatch = useAppDispatch();
  const { categoryId } = useParams();
  const sortedFeed = feeds?.filter((f) =>
    f.title.toLowerCase().includes(searchValue.toLowerCase()),
  );

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

  if (sortedFeed && !sortedFeed?.length) {
    return <NotFound />;
  }

  return (
    <SimpleGrid
      minChildWidth={['200px', null, '300px']}
      spacing="15px"
      width="full"
      autoColumns="max-content"
      px="2"
      overflowX="hidden">
      {sortedFeed && sortedFeed.map((feed) => <VideoPin key={feed.id} data={feed} />)}
    </SimpleGrid>
  );
}

export default Feed;
