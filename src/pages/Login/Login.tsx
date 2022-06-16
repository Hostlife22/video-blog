import { Button, Flex, HStack, Image } from '@chakra-ui/react';
import { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app';
import { selectUser } from '../../features/auth/auth.selectors';
import { loginAsync } from '../../features/auth/authAsyncThunk';
import { ImgMusicBg } from '../../img';

function Login() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.length) {
      navigate('/', { replace: true });
    }
  }, [dispatch, user]);

  const login = () => {
    dispatch(loginAsync());
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
      position="relative">
      <Image src={ImgMusicBg} objectFit="cover" width="full" height="full" />
      <Flex
        position="absolute"
        width="100vw"
        height="100vh"
        bg="blackAlpha.600"
        top={0}
        left={0}
        justifyContent="center"
        alignContent="center">
        <HStack>
          <Button
            leftIcon={<FcGoogle fontSize={25} />}
            colorScheme="whiteAlpha"
            shadow="lg"
            onClick={() => login()}>
            Signin with Google
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
}

export default Login;
