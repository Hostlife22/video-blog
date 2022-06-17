import {
  Button,
  Flex,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { Editor } from '@tinymce/tinymce-react';
import { doc, setDoc } from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useEffect, useRef, useState } from 'react';
import { IoChevronDown, IoCloudUpload, IoLocation, IoTrash } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { Editor as TinyMCEEditor } from 'tinymce';
import { AlertMsg, Spinner } from '.';
import { useAppDispatch, useAppSelector } from '../app';
import { selectAlert } from '../features/alert/alert.selectors';
import { callAlert } from '../features/alert/alert.thunk';
import { selectUser } from '../features/auth/auth.selectors';
import { firebaseApp, firebaseDb } from '../firebase/firebase-config';
import { alertData } from '../utils/alert';
import { categories } from '../utils/data';

function Create() {
  const { colorMode } = useColorMode();
  const bg = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.900', 'gray.50');
  const dispatch = useAppDispatch();
  const editorRef = useRef<null | TinyMCEEditor>(null);

  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('Choose as category');
  const [location, setLocation] = useState<string>('');
  const [videoAsset, setVdeoAsset] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(1);
  const [description, setDescription] = useState<string>('');
  const { alert, status, message, icon } = useAppSelector(selectAlert);
  const [user] = useAppSelector(selectUser);
  const navigate = useNavigate();

  const storage = getStorage(firebaseApp);

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setLoading(true);
    const videoFile = e.target.files[0];
    const storageRef = ref(storage, `Videos/${Date.now()}-${videoFile.name}`);

    const uploadTask = uploadBytesResumable(storageRef, videoFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(uploadProgress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setVdeoAsset(downloadURL);
          setLoading(false);

          dispatch(callAlert(alertData.upload));
        });
      },
    );
  };

  const deleteImage = () => {
    if (!videoAsset) return;

    const deleteRef = ref(storage, videoAsset);
    deleteObject(deleteRef)
      .then(() => {
        setVdeoAsset(null);
        dispatch(callAlert(alertData.remove));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDescriptionValue = () => {
    if (editorRef.current) {
      setDescription(editorRef.current.getContent());
    }
  };

  const uploadDetails = async () => {
    try {
      setLoading(true);
      if (!title && !category && !videoAsset) {
        dispatch(callAlert(alertData.require));
      } else {
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
        setLoading(false);
        navigate('/', { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {}, [title, location, description, category]);

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
              {category}
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
          {!videoAsset ? (
            <FormLabel width="full">
              <Flex
                direction="column"
                alignItems="center"
                justifyContent="center"
                width="full"
                height="full">
                <Flex
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  width="full"
                  height="full"
                  cursor="pointer">
                  {loading ? (
                    <Spinner msg="Uploading Your Video" progress={progress} />
                  ) : (
                    <>
                      <IoCloudUpload
                        fontSize={30}
                        color={colorMode === 'dark' ? '#f1f1f1' : '#111'}
                      />
                      <Text mt={5} fontSize={20} color={textColor}>
                        Click to upload{' '}
                      </Text>
                    </>
                  )}
                </Flex>
              </Flex>

              {!loading && (
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  style={{ width: 0, height: 0 }}
                  accept="video/mp4,video/x-m4v,video/*"
                />
              )}
            </FormLabel>
          ) : (
            <Flex
              width="full"
              height="full"
              justifyContent="center"
              alignItems="center"
              bg="black"
              position="relative">
              <Flex
                justifyContent="center"
                alignItems="center"
                width="40px"
                height="40px"
                rounded="full"
                bg="red"
                top={5}
                right={5}
                position="absolute"
                cursor="pointer"
                zIndex={10}
                onClick={deleteImage}>
                <IoTrash fontSize={20} color="white" />
              </Flex>

              <video src={videoAsset} controls style={{ width: '100%', height: '100%' }} />
            </Flex>
          )}
        </Flex>
        <Editor
          onChange={getDescriptionValue}
          onInit={(evt, editor: TinyMCEEditor) => {
            editorRef.current = editor;
          }}
          apiKey={import.meta.env.VITE_APP_TINYMCE_EDITOR_API}
          init={{
            height: 500,
            width: '100%',
            menubar: false,
            plugins: [
              'advlist',
              'autolink',
              'lists',
              'link',
              'image',
              'charmap',
              'preview',
              'anchor',
              'searchreplace',
              'visualblocks',
              'code',
              'fullscreen',
              'insertdatetime',
              'media',
              'table',
              'code',
              'help',
              'wordcount',
            ],
            toolbar:
              'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            content_css: 'dark',
            skin: 'oxide-dark',
          }}
        />
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
