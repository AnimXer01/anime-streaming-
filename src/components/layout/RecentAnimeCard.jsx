// RecentAnimeCard.js

import React from 'react';
import { Box, Image, Heading, Text, useColorModeValue } from '@chakra-ui/react';

const RecentAnimeCard = ({ anime, onClick }) => {
  const textColor = useColorModeValue('teal.500', 'teal.300');

  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      transition="transform 0.1s"
      _hover={{
        transform: 'scale(1.05)',
        borderColor: 'blue.500',
        boxShadow: 'lg',
      }}
      boxShadow="md"
      maxW="180px"
      margin="0.5rem"
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'space-between'}
      cursor="pointer"
      onClick={onClick}
    >
      <Image
        src={anime.animeImg}
        alt={anime.title}
        objectFit="cover"
        height="200px"
        width="100%"
        borderRadius="md"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      />
      <Box
        p="4"
        height="100%"
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'space-around'}
      >
        <Heading
          fontSize="sm"
          mb="2"
          maxH="2.5rem"
          noOfLines={2}
          color={textColor}
        >
          {anime.title}
        </Heading>
        <Text
          justifySelf={'flex-end'}
          fontSize="sm"
          color="gray.500"
          mb="2"
          maxH="2rem"
          noOfLines={1}
        >
          {anime.epNumber}
        </Text>
      </Box>
    </Box>
  );
};

export default RecentAnimeCard;
