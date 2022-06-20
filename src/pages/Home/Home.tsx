import { Flex } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import {
  Category,
  Create,
  Feed,
  NavBar,
  Search,
  UserProfile,
  VideoPinDetail,
} from '../../components';
import { categories } from '../../utils/data';

function Home() {
  return (
    <>
      <NavBar />
      <Flex width="100vw">
        <Flex direction="column" justifyContent="start" alignItems="center" width="5%">
          {categories &&
            categories.map((category) => <Category key={category.id} data={category} />)}
        </Flex>
        <Flex width="95%" px={4} justifyContent="center" alignItems="center">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/category/:categoryId" element={<Feed />} />
            <Route path="/create" element={<Create />} />
            <Route path="/videoDetail/:videoId" element={<VideoPinDetail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/userDetail/:userId" element={<UserProfile />} />
          </Routes>
        </Flex>
      </Flex>
    </>
  );
}

export default Home;
