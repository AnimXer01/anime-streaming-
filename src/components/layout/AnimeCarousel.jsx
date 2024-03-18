import { useState, useMemo, useCallback } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../../services/api';
import {
  Box,
  Image,
  Button,
  Text,
  Skeleton,
  useColorMode,
} from '@chakra-ui/react';
import PlayerModal from './PlayerModal';

const AnimeCarousel = () => {
  const colorMode = useColorMode();
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const { data: slides, isLoading } = useQuery({
    queryKey: ['carouselData'],
    queryFn: async () => {
      return await fetchData('/popular-ongoing', true);
    },
  });

  const [selectedAnimeUrl, setSelectedAnimeUrl] = useState(null);

  const handleCardClick = useCallback((videoUrl) => {
    // setSelectedVideoUrl(videoUrl);
    setSelectedAnimeUrl(videoUrl);
  }, []);

  const popularAnime = useMemo(() => {
    if (Array.isArray(slides?.data?.popularAnime)) {
      return slides?.data?.popularAnime;
    }
  }, [slides]);

  if (isLoading) {
    return (
      <Box maxWidth="inherit" mx="auto">
        <Skeleton height="250px" />
      </Box>
    );
  }

  return (
    <Box
      maxWidth={'inherit'}
      mx="auto"
      borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.300'} // Adjust the border color for dark and light modes
      borderRadius="md"
      overflow="hidden"
      boxShadow="md"
    >
      <Carousel
        showThumbs={false}
        showArrows={true}
        showStatus={true}
        autoPlay={true}
        infiniteLoop={true}
        centerMode={true}
        centerSlidePercentage={33.3}
        slidesToShow={3}
        dynamicHeight={true}
        transitionTime={'0.3s'}
      >
        {popularAnime &&
          popularAnime.length > 0 &&
          popularAnime.map((el, idx) => {
            const isHovered = hoveredIndex === idx;

            return (
              <Box
                key={idx}
                position="relative"
                overflow="hidden"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(-1)}
                boxShadow={isHovered ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'}
                border={isHovered ? '1px solid rgba(0, 0, 0, 0.1)' : 'none'}
                cursor={'pointer'}
              >
                <Image
                  src={el.animeImg}
                  alt={`Anime ${idx + 1}`}
                  maxW="100%"
                  maxH="250px"
                  objectFit="contain"
                  objectPosition="center"
                  filter={isHovered ? 'blur(1px)' : 'none'}
                  // onError={(e) => {
                  //   e.target.style.display = 'none'; // Hide the original image
                  // }}
                />
                {isHovered && (
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    w="100%"
                    h="100%"
                    bg="rgba(0, 0, 0, 0.5)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                    color="white"
                    p={4}
                  >
                    <Text fontSize="xl" fontWeight="bold" mb={2}>
                      {el.title}
                    </Text>
                    <Text>{el.description}</Text>
                    <Button
                      variant="solid"
                      colorScheme="teal"
                      size="sm"
                      mt={4}
                      onClick={() => handleCardClick(el.animeSrc)}
                    >
                      Watch Now
                    </Button>
                  </Box>
                )}
              </Box>
            );
          })}
      </Carousel>

      {/* TODO: Player Model  */}
      {selectedAnimeUrl && (
        <PlayerModal
          currentStreamingAnime={selectedAnimeUrl}
          onClose={() => handleCardClick(null)} // Close the modal
          changeVideoUrl={handleCardClick}
        />
      )}
    </Box>
  );
};

export default AnimeCarousel;
