import { useContext, useMemo, useState } from 'react';
import { map } from 'lodash';
import {
  Box,
  Flex,
  Text,
  Button,
  Skeleton,
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react';
import { extractAnimeName } from '../helpers/DataProcessor';
import { PaginationLayout as Headers, currentAnimeType } from './InitialState';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { PageContext } from '../../store/page-context';
import { AnimeSwitcher } from './index';
const Pagination = () => {
  const { currentPage, nextPageHandler, previousPageHandler, animeType } =
    useContext(PageContext);

  const textColor = useColorModeValue('teal.500', 'teal.300');
  const animeName = useMemo(() => {
    return extractAnimeName(animeType, currentAnimeType) || 'Recently Released';
  }, [animeType]);

  return (
    <Skeleton
      isLoaded={true} // Replace isLoading with your loading state
      startColor="teal.100"
      endColor="teal.300"
    >
      <Flex justifyContent="space-between" alignItems="center" px={4} pt={4}>
        {map(Headers, (el) => {
          if (el.type === 'recentRelease') {
            return (
              <Text
                key={el.type}
                fontWeight="semibold"
                fontSize="lg"
                color={textColor}
              >
                {animeName}
              </Text>
            );
          } else if (el.type === 'pagination') {
            return (
              <Flex key={el.type} alignItems="center">
                <AnimeSwitcher />

                <Tooltip label={currentPage - 1} hasArrow placement="top">
                  <Button
                    size={'sm'}
                    variant="ghost"
                    isDisabled={currentPage === 1}
                    onClick={previousPageHandler}
                  >
                    <FiChevronLeft />
                  </Button>
                </Tooltip>
                <Tooltip label={currentPage + 1} hasArrow placement="top">
                  <Button size={'sm'} variant="ghost" onClick={nextPageHandler}>
                    <FiChevronRight />
                  </Button>
                </Tooltip>
              </Flex>
            );
          }
          return null;
        })}
      </Flex>
    </Skeleton>
  );
};

export default Pagination;
