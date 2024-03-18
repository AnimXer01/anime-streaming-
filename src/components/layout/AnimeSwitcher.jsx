import { AnimeTypeHeaders } from './InitialState';
import { Flex, Tooltip, Button } from '@chakra-ui/react';
import { useCallback, useContext } from 'react';
import { PageContext } from '../../store/page-context';
const AnimeSwitcher = () => {
  const { setAnimeType, setCurrentPage } = useContext(PageContext);

  const handleAnimeTypeChange = useCallback((value) => {
    setAnimeType(value);
    setCurrentPage(1);
  }, []);

  return (
    <Flex alignItems="center">
      {AnimeTypeHeaders.map((el) => (
        <Tooltip key={el.id} label={el.label} hasArrow placement="top">
          <Button
            size={'sm'}
            variant="ghost"
            fontSize="sm"
            onClick={() => handleAnimeTypeChange(el.value)}
          >
            {el.label}
          </Button>
        </Tooltip>
      ))}
    </Flex>
  );
};

export default AnimeSwitcher;
