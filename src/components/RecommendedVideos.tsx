import { SimpleGrid } from '@chakra-ui/react';
import { IFeedData } from '../features/videos/videos.interface';
import VideoPin from './VideoPin';

interface IRecommendedVideosProps {
  feeds: IFeedData[] | null;
}

function RecommendedVideos({ feeds }: IRecommendedVideosProps) {
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

export default RecommendedVideos;
