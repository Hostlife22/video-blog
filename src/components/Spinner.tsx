import { Flex, Progress, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Circles } from 'react-loader-spinner';

interface ISpinnerProps {
  msg: string;
  progress?: number;
}

function Spinner({ msg, progress }: ISpinnerProps) {
  useEffect(() => {}, [progress]);

  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      height="full"
      px={[0, null, 10]}>
      <Circles color="#00BFFF" height={80} width={80} />
      <Text fontSize={[18, null, 25]} textAlign="center" px={2}>
        {msg}
      </Text>

      {progress && (
        <Progress
          mt={50}
          isAnimated
          hasStripe
          size="sm"
          value={Math.floor(progress)}
          width={['90%', null, 'full']}
          rounded="sm"
          colorScheme="linkedin"
        />
      )}
    </Flex>
  );
}

export default Spinner;
