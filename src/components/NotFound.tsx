import { Flex, Image, Text } from '@chakra-ui/react';
import { SvgNotFound } from '../img';

function NotFound() {
  return (
    <Flex width="full" justifyContent="center" alignItems="center" direction="column">
      <Image src={SvgNotFound} width={600} />
      <Text fontSize={40} fontWeight="semibold" fontFamily="cursive">
        Not Found
      </Text>
    </Flex>
  );
}

export default NotFound;
