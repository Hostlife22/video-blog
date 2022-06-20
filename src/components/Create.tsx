import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { doc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { IoChevronDown, IoLocation } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { AlertMsg, TinyEditor, UploadedVideo, UploadeVideo } from '.';
import { useAppDispatch, useAppSelector } from '../app';
import { selectAlert } from '../features/alert/alert.selectors';
import { callAlert } from '../features/alert/alert.thunk';
import { selectUser } from '../features/auth/auth.selectors';
import { selectVideoAsset } from '../features/videoAsset/videoAsset.selectors';
import { changeLoading, setVideoAsset } from '../features/videoAsset/videoAssetSlice';
import { setFeed } from '../features/videos/videosSlice';
import { firebaseDb } from '../firebase/firebase-config';
import { alertData } from '../utils/alert';
import { categories } from '../utils/data';

function Create() {
  const { colorMode } = useColorMode();
  //   const bg = useColorModeValue('gray.50', 'gray.900');
  //   const textColor = useColorModeValue('gray.900', 'gray.50');

  const dispatch = useAppDispatch();
  const { alert, status, message, icon } = useAppSelector(selectAlert);
  const { loading, videoAsset } = useAppSelector(selectVideoAsset);
  const [user] = useAppSelector(selectUser);

  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const navigate = useNavigate();

  const uploadDetails = async () => {
    try {
      dispatch(changeLoading(true));

      if (title && category && videoAsset) {
        const data = {
          id: `${Date.now()}`,
          userId: user?.uid,
          videoUrl: videoAsset,
          location,
          title,
          description,
          category,
        };

        await setDoc(doc(firebaseDb, 'videos', `${Date.now()}`), data);
        dispatch(setFeed(data));
        dispatch(setVideoAsset(null));
        navigate('/', { replace: true });
      } else {
        dispatch(callAlert(alertData.require));
        dispatch(changeLoading(false));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {}, [title, location, description, category, videoAsset]);

  return (
    <Flex justifyContent="center" alignItems="center" width="full" minHeight="100vh" padding={10}>
      <Flex
        width="80%"
        height="full"
        border="1px"
        borderColor="gray.300"
        borderRadius="md"
        p="4"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={2}>
        {alert && <AlertMsg status={status} msg={message} icon={icon} />}

        <Input
          variant="flushed"
          placeholder="Title"
          focusBorderColor="gray.400"
          isRequired
          errorBorderColor="red"
          type="text"
          _placeholder={{ color: 'gray.500' }}
          fontSize={20}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Flex justifyContent="space-between" width="full" alignContent="center" gap={8} my={4}>
          <Menu>
            <MenuButton
              width="full"
              colorScheme="blue"
              as={Button}
              rightIcon={<IoChevronDown fontSize={25} />}>
              {category || 'Choose as category'}
            </MenuButton>
            <MenuList zIndex={101} width="md" shadow="xl">
              {categories &&
                categories.map((data) => (
                  <MenuItem
                    key={data.id}
                    _hover={{ bg: 'blackAlpha.300' }}
                    fontSize={20}
                    px={4}
                    onClick={() => setCategory(data.name)}>
                    {data.iconSrc}
                    <Text fontSize={18} ml={4}>
                      {data.name}
                    </Text>
                  </MenuItem>
                ))}
            </MenuList>
          </Menu>

          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={
                <IoLocation fontSize={20} color={colorMode === 'dark' ? '#f1f1f1' : '#111'} />
              }
            />
            <Input
              variant="flushed"
              placeholder="Location"
              focusBorderColor="gray.400"
              isRequired
              errorBorderColor="red"
              type="text"
              _placeholder={{ color: 'gray.500' }}
              fontSize={20}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </InputGroup>
        </Flex>
        <Flex
          border="1px"
          borderColor="gray.500"
          height="400px"
          borderStyle="dashed"
          width="full"
          borderRadius="md"
          overflow="hidden"
          position="relative">
          {!videoAsset ? <UploadeVideo /> : <UploadedVideo />}
        </Flex>
        <TinyEditor handler={setDescription} />
        <Button
          isLoading={loading}
          loadingText="Uploading"
          colorScheme="linkedin"
          variant={loading ? 'outline' : 'solid'}
          width="xl"
          _hover={{ shadow: 'lg' }}
          fontSize={20}
          onClick={() => uploadDetails()}>
          Upload
        </Button>
      </Flex>
    </Flex>
  );
}

export default Create;
