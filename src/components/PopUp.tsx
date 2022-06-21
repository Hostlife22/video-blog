import {
  Button,
  ButtonGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';
import { deleteDoc, doc } from 'firebase/firestore';
import { IoTrash } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app';
import { setLoading } from '../features/videos/videosSlice';
import { firebaseDb } from '../firebase/firebase-config';

interface VideoAssetProps {
  videoId: string | undefined;
}

function PopUp({ videoId }: VideoAssetProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const deleteVideo = async () => {
    if (!videoId) return;

    dispatch(setLoading(true));

    try {
      await deleteDoc(doc(firebaseDb, 'videos', videoId));
    } catch (e) {
      console.log(e);
    }

    dispatch(setLoading(false));
    navigate('/', { replace: true });
  };

  return (
    <Popover closeOnEsc>
      <PopoverTrigger>
        <Button colorScheme="red">
          <IoTrash fontSize={20} color="#fff" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Confirmation!</PopoverHeader>
        <PopoverBody>Are you sure you want to delete it?</PopoverBody>
        <PopoverFooter display="flex" justifyContent="flex-end">
          <ButtonGroup size="sm">
            <Button colorScheme="red" onClick={deleteVideo}>
              Yes
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}

export default PopUp;
