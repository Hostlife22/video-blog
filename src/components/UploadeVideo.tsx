import { Flex, FormLabel, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useEffect } from 'react';
import { IoCloudUpload } from 'react-icons/io5';
import { Spinner } from '.';
import { useAppDispatch, useAppSelector } from '../app';
import { callAlert } from '../features/alert/alert.thunk';
import { selectVideoAsset } from '../features/videoAsset/videoAsset.selectors';
import {
  changeLoading,
  changeProgress,
  setVideoAsset,
} from '../features/videoAsset/videoAssetSlice';
import { storage } from '../firebase/firebase-config';
import { alertData } from '../utils/alert';

function UploadeVideo() {
  const { colorMode } = useColorMode();
  const textColor = useColorModeValue('gray.900', 'gray.50');
  const dispatch = useAppDispatch();
  const { loading, progress } = useAppSelector(selectVideoAsset);

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    dispatch(changeLoading(true));
    const videoFile = e.target.files[0];
    const storageRef = ref(storage, `Videos/${Date.now()}-${videoFile.name}`);

    const uploadTask = uploadBytesResumable(storageRef, videoFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        dispatch(changeProgress(uploadProgress));
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          dispatch(setVideoAsset(downloadURL));
          dispatch(callAlert(alertData.upload));
        });
      },
    );
  };

  useEffect(() => {}, [loading, progress]);

  return (
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
              <IoCloudUpload fontSize={30} color={colorMode === 'dark' ? '#f1f1f1' : '#111'} />
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
  );
}

export default UploadeVideo;
