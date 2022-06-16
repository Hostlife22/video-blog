import { Flex } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { Category, Create, Feed, NavBar, Search, VideoPin } from '../../components';

function Home() {
  return (
    <>
      <NavBar />
      <Flex direction="column" justifyContent="start" alignItems="center" width="20">
        <Category />
      </Flex>
      <Flex width="full" justifyContent="center" alignItems="center" px="4">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route path="/create" element={<Create />} />
          <Route path="/videoDetail/:videoId" element={<VideoPin />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Flex>
    </>
  );
}

export default Home;
