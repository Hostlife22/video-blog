import {
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { IoAdd, IoLogOut, IoMoon, IoSearch, IoSunny } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app';
import { selectUser } from '../features/auth/auth.selectors';
import { logOut } from '../features/auth/authSlice';
import { ImgLogo, ImgLogoDark } from '../img';

function NavBar() {
  const [user] = useAppSelector(selectUser);
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('gray.600', 'gray.300');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logOutUser = () => {
    dispatch(logOut());
    navigate('/login', { replace: true });
  };

  return (
    <Flex justifyContent="space-between" alignItems="center" width="100vw" p={4}>
      <Link to="/">
        <Image src={colorMode === 'light' ? ImgLogoDark : ImgLogo} width="180px" />
      </Link>
      <InputGroup mx={6} width="60vw">
        <InputLeftElement pointerEvents="none" children={<IoSearch fontSize={25} />} />
        <Input
          type="text"
          placeholder="Search..."
          fontSize={18}
          fontWeight="medium"
          variant="filled"
        />
      </InputGroup>
      <Flex justifyContent="center" alignItems="center">
        <Flex
          width="40px"
          height="40px"
          justifyContent="center"
          alignItems="center"
          cursor="pointer"
          borderRadius="5px"
          onClick={toggleColorMode}>
          {colorMode === 'light' ? <IoMoon fontSize="25px" /> : <IoSunny fontSize="25px" />}
        </Flex>
        <Link to="/create">
          <Flex
            justifyContent="center"
            alignItems="center"
            bg={bg}
            width="40px"
            height="40px"
            borderRadius="5px"
            mx={6}
            cursor="pointer"
            _hover={{ shadow: 'md' }}
            transition="ease-in-out"
            transitionDuration="0.3s">
            <IoAdd fontSize={25} color={colorMode === 'dark' ? '#111' : '#f1f1f1'} />
          </Flex>
        </Link>
        <Menu>
          <MenuButton>
            <Image
              src={user?.photoURL!}
              width="40px"
              height="40px"
              minHeight="40px"
              minWidth="40px"
              rounded="full"
            />
          </MenuButton>
          <MenuList shadow="lg">
            <Link to={`userDetail/${user?.uid}`}>
              <MenuItem>My Account</MenuItem>
            </Link>
            <MenuItem flexDirection="row" alignItems="center" gap={4} onClick={logOutUser}>
              Logout <IoLogOut fontSize={20} />
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}

export default NavBar;
