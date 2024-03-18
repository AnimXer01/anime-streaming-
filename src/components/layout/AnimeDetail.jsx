import React, { useCallback, useState } from 'react';
import {
  Box,
  Image,
  Text,
  VStack,
  Button,
  Skeleton,
  Container,
  keyframes,
} from '@chakra-ui/react';
import { MotionConfig, motion } from 'framer-motion';

const AnimeDetails = ({ animeDetail }) => {
  const [showFullSummary, setShowFullSummary] = useState(false);

  const handleToggleSummary = useCallback(() => {
    setShowFullSummary(!showFullSummary);
  }, [showFullSummary]);

  const animationKeyframes = keyframes`
  0% { transform: scale(0.5) rotate(0); border-radius: 20%; }
  20% { transform: scale(0.5) rotate(0); border-radius: 20%; }

`;

  const animation = `${animationKeyframes} 2s ease-in-out infinite`;

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      width={{ base: '100%', md: '60%' }}
    >
      <VStack align="center" spacing={4}>
        {!animeDetail ? (
          <Container display="flex" alignItems="center" justifyContent="center">
            <Box p="4" as={motion.div} animation={animation}>
              Loading...
            </Box>
          </Container>
        ) : (
          <>
            <Image
              src={animeDetail?.imageSrc}
              alt={animeDetail?.animeTitle}
              height={'50%'}
              objectFit="cover"
              borderRadius="md"
            />
            <Text fontSize="md" fontWeight="bold" wordBreak="break-word">
              {animeDetail?.animeTitle}
            </Text>
            <Text fontSize="sm" fontStyle="italic" wordBreak="break-word">
              Other Name: {animeDetail?.otherName}
            </Text>
            <Text fontSize="sm">
              Released Date: {animeDetail?.releasedDate}
            </Text>
            <Text fontSize="md" fontWeight="bold" mb={2}>
              Plot Summary:
            </Text>
            <Text
              fontSize="xs"
              noOfLines={showFullSummary ? 0 : 3}
              wordBreak="break-word"
            >
              {animeDetail?.plotSummary}
            </Text>
            {animeDetail?.plotSummary?.length > 180 && (
              <Button
                onClick={handleToggleSummary}
                colorScheme="teal"
                size="sm"
              >
                {showFullSummary ? 'See Less' : 'See More'}
              </Button>
            )}
          </>
        )}
      </VStack>
    </Box>
  );
};

export default AnimeDetails;
