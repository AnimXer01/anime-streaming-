// FullScreenModal.js
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  IconButton,
  useDisclosure,
  VStack,
  Box,
  Link,
  HStack,
  Flex,
} from '@chakra-ui/react';
import VideoPlayer from '../video/videoPlayer';
import { fetchData } from '../../services/api';
import { useQuery, QueryCache } from '@tanstack/react-query';
import Select from 'react-dropdown-select';
import { processAnimeName, processEpisodeList } from '../helpers/DataProcessor';
import AnimeDetails from './AnimeDetail';
import { IoMdArrowRoundBack } from 'react-icons/io';

const PlayerModal = ({
  videoUrl,
  onClose,
  changeVideoUrl,
  currentStreamingAnime = null,
}) => {
  const [defaultEp, setDefaultEp] = useState([]);
  const [currentAnimeValue, setCurrentAnimeValue] = useState('');
  const [currentAnimeInfo, setCurrentAnimeInfo] = useState('');

  const [currentStrAnime, setCurrentStrAnime] = useState(
    currentStreamingAnime ?? null
  );
  useEffect(() => {
    if (currentStreamingAnime) {
      setCurrentStrAnime(currentStreamingAnime);
    }
  }, [currentStreamingAnime]);

  const {
    data: animeDetail,
    isLoading: isFetchingAnime,
    isFetching: fetchingAnime,
  } = useQuery({
    enabled: !!currentStrAnime,
    queryFn: async () => {
      return await fetchData(
        `/details/${currentStrAnime}?extractEpisode=${!!currentStrAnime}`
      );
    },
    queryKey: [`detail`, currentStrAnime],
    staleTime: 1200000,
  });

  // Extracting Episide list from animeDetail and Setitng 1st Episode as Default
  const episodesOptions = useMemo(() => {
    if (animeDetail && animeDetail?.data?.animeInfo?.episodeList?.length > 0)
      return animeDetail?.data?.animeInfo?.episodeList;
  }, [animeDetail]);

  useEffect(() => {
    if (
      episodesOptions &&
      episodesOptions?.length > 0 &&
      defaultEp?.length === 0
    ) {
      // Set Default Episode as the latest
      setDefaultEp([animeDetail?.data?.animeInfo?.episodeList[0]]);
      setCurrentAnimeInfo(true);
    }
  }, [episodesOptions]);

  useEffect(() => {
    if (defaultEp && Array.isArray(defaultEp) && defaultEp?.length > 0) {
      setCurrentAnimeValue(defaultEp[0].value);
    }
  }, [defaultEp]);

  // Call Currently Selected Anime Episode URL:

  const { data: AnimeSrcLink, isLoading } = useQuery({
    queryFn: async () => {
      return await fetchData(`/watch${currentAnimeValue}`);
    },
    queryKey: [`${currentAnimeValue}`],
    staleTime: 1200000,
    enabled: !!currentAnimeValue,
  });

  const vidSrc = useMemo(() => {
    if (Array.isArray(AnimeSrcLink?.data?.source)) {
      return AnimeSrcLink?.data?.source[0].file;
    }
  }, [AnimeSrcLink]);

  useEffect(() => {
    if (AnimeSrcLink && !currentStrAnime) {
      setCurrentStrAnime(AnimeSrcLink?.data?.animeInfo);
    }
  }, [AnimeSrcLink]);

  const onEpisodeChange = useCallback((val) => {
    if (val && Array.isArray(val)) {
      setDefaultEp([...val]);
      setCurrentAnimeValue(val?.[0]?.value);
    }
  }, []);

  useEffect(() => {
    if (videoUrl) {
      setCurrentAnimeValue(videoUrl);
    }
  }, [videoUrl]);

  return (
    <Modal isOpen={true} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent maxW="100%" maxH="100%" overflow="hidden">
        <ModalHeader>
          <IconButton icon={<IoMdArrowRoundBack />} onClick={onClose} />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody overflow="auto">
          <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
            <Box flex={{ base: '1', md: '1' }} mb={{ base: '4', md: '0' }}>
              <VideoPlayer url={vidSrc} />
              <HStack spacing={4} mt={4}>
                <Box fontWeight="bold">Episodes:</Box>
                <Select
                  values={defaultEp || []}
                  onChange={(val) => onEpisodeChange(val)}
                  options={episodesOptions}
                  loading={isFetchingAnime || isLoading}
                  dropdownPosition={'auto'}
                  style={{
                    color: 'black',
                    backgroundColor: 'inherit',
                    minWidth: '100px',
                  }}
                />
              </HStack>
            </Box>
            <Box flex={{ base: '1', md: '1' }}>
              <AnimeDetails animeDetail={animeDetail?.data?.animeInfo} />
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PlayerModal;
