import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Box, Grid, Heading, Skeleton } from '@chakra-ui/react';
import RecentAnimeCard from './RecentAnimeCard';
import { PlayerModal } from './index';
import { useMemo, useContext, useState, useCallback } from 'react';
import { fetchData } from '../../services/api';

import { PageContext } from '../../store/page-context';

const RecentRelease = () => {
  // const [selectedVideoUrl, setSelectedVideoUrl] = useState(null); // Track selected video URL for the modal
  const [selectedAnimeUrl, setSelectedAnimeUrl] = useState(null);
  const { currentPage, animeType, currentVideoUrl, setCurrentVideoUrl } =
    useContext(PageContext);

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      return await fetchData(
        `/recent-release?page=${currentPage}&type=${animeType}`
      );
    },
    queryKey: ['RECENT_RELEASE', `${currentPage}`, `${animeType}`],
  });

  const animeList = useMemo(() => {
    if (data && data?.data && Array.isArray(data?.data?.recentAnime)) {
      return data?.data?.recentAnime;
    }
  }, [data]);

  const handleCardClick = useCallback((videoUrl) => {
    // setSelectedVideoUrl(videoUrl);
    setSelectedAnimeUrl(videoUrl);
  }, []);

  return (
    <Box p="4">
      <Grid templateColumns="repeat(auto-fill, minmax(180px, 1fr))">
        {isLoading
          ? // Skeleton loader for when data is loading
            Array.from({ length: 12 }).map((_, index) => (
              <Skeleton key={index} height="300px" borderRadius="sm" />
            ))
          : animeList &&
            Array.isArray(animeList) &&
            animeList?.map((anime, idx) => (
              <RecentAnimeCard
                key={idx}
                anime={anime}
                onClick={() => handleCardClick(anime.epLink)}
              />
            ))}
      </Grid>

      {/* Render the modal when a video is selected */}
      {selectedAnimeUrl && (
        <PlayerModal
          videoUrl={selectedAnimeUrl}
          onClose={() => handleCardClick(null)} // Close the modal
          changeVideoUrl={handleCardClick}
        />
      )}
    </Box>
  );
};

export default RecentRelease;
