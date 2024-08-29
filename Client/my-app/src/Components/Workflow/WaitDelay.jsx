import React, { useCallback } from 'react';
import { Box, Flex, Text, IconButton } from "@chakra-ui/react";
import { Position } from "reactflow";
import CustomHandle from "../../CustomHandle";
import { AiFillDelete } from "react-icons/ai";

const WaitDelay = React.memo(({ id, data }) => {
  const getDurationText = useCallback((taskType, duration, repeatInterval) => {
    switch(taskType) {
      case 'now':
        return 'Immediate';
      case 'schedule':
        switch(duration) {
          case '0':
            return 'Right Now';
          case '60':
            return 'After 1 Hour';
          case '1440':
            return 'After 1 Day';
          default:
            return `After ${duration} minutes`;
        }
      case 'repeat':
        switch(repeatInterval) {
          case '2':
            return 'Repeat every 2 Minute';
          case '60':
            return 'Repeat every 1 hour';
          case '10800':
            return 'Repeat every 1 Week';
          case '43200':
            return 'Repeat every 1 Month';
          default:
            return `Repeat every ${repeatInterval} minutes`;
        }
      default:
        return '';
    }
  }, []);

  return (
    <Flex
      alignItems="center"
      borderRadius="12px"
      bg="#edf2f7"
      border="1px solid purple"
      p="8px"
      gap={4}
      width="125px"
      boxShadow="md"
      transition="all 0.2s"
      position="relative"
      _hover={{ boxShadow: "lg", transform: "scale(1.02)" }}
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
          <Text fontSize="8px" fontWeight="500" color="#2d3748" mb="3px">Wait/Delay</Text>
          <Text fontSize="9px" fontWeight="500" color="#4a5568">
            {getDurationText(data.taskType, data.duration, data.repeatInterval)}
          </Text>
        </Box>
      </Flex>
      <CustomHandle type="source" position={Position.Right} />
      <CustomHandle type="target" position={Position.Left} />
    </Flex>
  );
});

export default WaitDelay;

