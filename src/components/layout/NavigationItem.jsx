import React from 'react';
import {
  Flex,
  IconButton,
  Text,
  Input,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';

const NavigationItem = ({ item }) => {
  const textColor = useColorModeValue('gray.800', 'white');
  const placeholderColor = useColorModeValue('gray.500', 'gray.400');
  const inputBgColor = useColorModeValue('white', 'gray.700');
  const inputHoverBgColor = useColorModeValue('gray.100', 'gray.600');

  if (item?.type === 'logo') {
    // return <IconButton aria-label="Logo" icon={item.icon} variant="ghost" />;
    return <Avatar size="sm" name={item.content} />;
  }

  if (item.type === 'heading') {
    return (
      <Text ml={2} fontWeight="bold" color={textColor}>
        {item.content}
      </Text>
    );
  }

  if (item.type === 'searchBar') {
    return (
      <Flex align="center">
        <Input
          type="text"
          placeholder="Search..."
          borderRadius="md"
          mr={2}
          bg={inputBgColor}
          color={textColor}
          _placeholder={{ color: placeholderColor }}
          _hover={{ bg: inputHoverBgColor }}
          _focus={{ outline: 'none', boxShadow: 'outline' }}
        />
        <IconButton aria-label="Search" icon={<FiSearch />} variant="ghost" />
      </Flex>
    );
  }

  // if (item.name === 'userAvatar') {
  //   return <Avatar size="sm" name={item.content} />;
  // }

  // return null;
};

export default NavigationItem;
