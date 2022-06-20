import {
  Box,
  Flex,
  Image,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { IoPause, IoPlay } from 'react-icons/io5';
import {
  MdForward10,
  MdFullscreen,
  MdOutlineReplay10,
  MdVolumeOff,
  MdVolumeUp,
} from 'react-icons/md';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import { ImgLogo } from '../img';
import { format } from '../utils/format';

interface VideoPlayerProps {
  videoUrl: string | undefined;
}

interface IProgressState {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
}

function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [seeking, setSeeking] = useState<boolean>(false);
  const [muted, setMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);
  const [played, setPlayed] = useState<number>(0);

  const playerRef = useRef<ReactPlayer>(null);
  const playerContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {}, [muted, volume, played]);

  const onVolumeChange = (event: number) => {
    setVolume(Math.floor(event / 100));

    event === 0 ? setMuted(true) : setMuted(false);
  };

  const handleFastRewind = () => {
    playerRef.current?.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleFastForward = () => {
    playerRef.current?.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleProgress = (changeState: IProgressState) => {
    if (!seeking) {
      setPlayed((changeState.played / 100) * 100);
    }
  };

  const handleSeekChange = (e: number) => {
    setPlayed(e / 100);
  };

  const onSeekMouseDown = () => {
    setSeeking(true);
  };

  const onSeekMouseUp = (e: number) => {
    setSeeking(false);
    playerRef.current?.seekTo(e / 100);
  };

  const currentTime = playerRef?.current ? playerRef.current.getCurrentTime() : '00:00';
  const duration = playerRef?.current ? playerRef.current.getDuration() : '00:00';

  const elapsedTime = format(currentTime);
  const totalDuration = format(duration);

  return (
    <Flex width="100%" bg="black" position="relative" ref={playerContainer}>
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        width="100%"
        height="100%"
        playing={isPlaying}
        muted={muted}
        volume={volume}
        onProgress={handleProgress}
      />
      <Flex
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        zIndex={1}
        cursor="pointer">
        <Flex
          alignItems="center"
          justifyContent="center"
          onClick={() => setIsPlaying((prev) => !prev)}
          width="full"
          height="full">
          {!isPlaying && <IoPlay fontSize={60} color="#f2f2f2" cursor="pointer" />}
        </Flex>
        <Flex
          width="full"
          alignItems="center"
          direction="column"
          px={4}
          bgGradient="linear(to-t,blackAlpha.900,blackAlpha.500,blackAlpha.50)">
          <Slider
            aria-label="slider-ex-4"
            min={0}
            max={100}
            value={played * 100}
            transition="ease-in-out"
            transitionDuration="0.2"
            onChange={handleSeekChange}
            onMouseDown={onSeekMouseDown}
            onChangeEnd={onSeekMouseUp}>
            <SliderTrack bg="teal.50">
              <SliderFilledTrack bg="teal.300" />
            </SliderTrack>
            <SliderThumb
              boxSize={3}
              bg="teal.300"
              transition="ease-in-out"
              transitionDuration="0.2"
            />
          </Slider>

          <Flex width="full" alignItems="center" my={2} gap={10}>
            <MdOutlineReplay10
              fontSize={30}
              color="#f1f1f1"
              cursor="pointer"
              onClick={handleFastRewind}
            />
            <Box onClick={() => setIsPlaying((prev) => !prev)}>
              {!isPlaying ? (
                <IoPlay fontSize={30} color="#f2f2f2" cursor="pointer" />
              ) : (
                <IoPause fontSize={30} color="#f2f2f2" cursor="pointer" />
              )}
            </Box>
            <MdForward10
              fontSize={30}
              color="#f1f1f1"
              cursor="pointer"
              onClick={handleFastForward}
            />

            <Flex alignItems="center">
              <Box onClick={() => setMuted((prev) => !prev)}>
                {!muted ? (
                  <MdVolumeUp fontSize={30} color="#f1f1f1" cursor="pointer" />
                ) : (
                  <MdVolumeOff fontSize={30} color="#f1f1f1" cursor="pointer" />
                )}
              </Box>
              <Slider
                aria-label="slider-ex-1"
                defaultValue={volume * 100}
                min={0}
                max={100}
                size="sm"
                width={16}
                mx={2}
                onChangeStart={onVolumeChange}
                onChangeEnd={onVolumeChange}>
                <SliderTrack bg="teal.50">
                  <SliderFilledTrack bg="teal.300" />
                </SliderTrack>
                <SliderThumb boxSize={2} bg="teal.300" />
              </Slider>
            </Flex>
            <Flex alignItems="center" gap={2}>
              <Text fontSize={16} color="whitesmoke">
                {elapsedTime}
              </Text>
              <Text fontSize={16} color="whitesmoke">
                /
              </Text>
              <Text fontSize={16} color="whitesmoke">
                {totalDuration}
              </Text>
            </Flex>
            <Image src={ImgLogo} width="120px" ml="auto" />
            <MdFullscreen
              fontSize={30}
              color="#f1f1f1"
              cursor="pointer"
              onClick={() => {
                playerContainer?.current && screenfull.toggle(playerContainer.current);
              }}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default VideoPlayer;
