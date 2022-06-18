import { Flex } from '@chakra-ui/react';
import { deleteObject, ref } from 'firebase/storage';
import { useEffect } from 'react';
import { IoTrash } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../app';
import { callAlert } from '../features/alert/alert.thunk';
import { selectVideoAsset } from '../features/videoAsset/videoAsset.selectors';
import { setVideoAsset } from '../features/videoAsset/videoAssetSlice';
import { storage } from '../firebase/firebase-config';
import { alertData } from '../utils/alert';

function UploadedVideo() {
  const dispatch = useAppDispatch();
  const { videoAsset } = useAppSelector(selectVideoAsset);

  const deleteImage = () => {
    if (!videoAsset) return;

    const deleteRef = ref(storage, videoAsset);
    deleteObject(deleteRef)
      .then(() => {
        dispatch(setVideoAsset(null));
        dispatch(callAlert(alertData.remove));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {}, [videoAsset]);

  return (
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
      {videoAsset && <video src={videoAsset} controls style={{ width: '100%', height: '100%' }} />}
    </Flex>
  );
}

export default UploadedVideo;
