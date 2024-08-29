import React from 'react';
import { Box, Flex, Text, IconButton } from '@chakra-ui/react';
import { Position } from 'reactflow';
import CustomHandle from '../../CustomHandle';
import { AiFillDelete } from 'react-icons/ai';

const LeadSource = ({ id, data }) => {
  return (
    
    <Flex
      alignItems="center"
      borderRadius="12px"
      bg="#edf2f7"
      border="1px solid purple"
      p="6px"
      gap={4}
      width="80px"
      boxShadow="md"
      transition="all 0.2s"
      _hover={{ boxShadow: 'lg', transform: 'scale(1.02)' }}
      position="relative"
    >
     
      <IconButton
        position="absolute"
        icon={<AiFillDelete />}
        fontSize="12px"
        size="10px"
        right="4px"
        height="10px"
        top="8px"
        colorScheme="red"
        variant="ghost"
        onClick={() => data.onDelete(id)}
        aria-label="Delete Node"
      />
      
      <Flex flex="1">
        <Box>
        
          <Text fontSize="8px" fontWeight="600" color="#2d3748" mb="3px">
            Lead Source
          </Text>
          <Text fontSize="9px" fontWeight="500" color="#4a5568">
            {data.source}
          </Text>
        </Box>
      </Flex>
      <CustomHandle type="source" position={Position.Right} />
      <CustomHandle type="target" position={Position.Left} />
    </Flex>
  );
};

export default LeadSource;
