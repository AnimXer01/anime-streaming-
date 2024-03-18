import { NavigationItem } from './index';
import { Flex, useColorMode, IconButton, Spacer } from '@chakra-ui/react';
import { navHeaders } from './InitialState';
import { FiMoon, FiSun } from 'react-icons/fi';
// const { filter, map } = require('lodash');
import { map, filter } from 'lodash';

const TopNavigation = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const leftItems = filter(navHeaders, { position: 'left' });
  const rightItems = filter(navHeaders, { position: 'right' });

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      p={4}
      bg={colorMode === 'light' ? 'gray.200' : '#1f1f1f'} // Adjust the background color based on the color mode
      color={colorMode === 'light' ? 'black' : 'white'} // Adjust the font color based on the color mode
    >
      <Flex align="center">
        {map(leftItems, (item, idx) => (
          <NavigationItem key={idx} item={item} />
        ))}
      </Flex>

      <Flex align="center">
        <Spacer />
        {map(rightItems, (item, idx) => (
          <NavigationItem key={idx} item={item} />
        ))}

        <IconButton
          aria-label="Toggle Dark Mode"
          icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
          variant="ghost"
          onClick={toggleColorMode}
          ml={2}
        />
      </Flex>
    </Flex>
  );
};

export default TopNavigation;
