import { Box, Flex, Text, IconButton } from "@chakra-ui/react";
import { AiFillDelete } from "react-icons/ai";
import React from "react";
import { Position } from "reactflow";
import CustomHandle from "../../CustomHandle";

export default function ColdEmail({ id, data }) {
  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

  return (
    <Flex
      alignItems="center"
      borderRadius="12px"
      bg="#edf2f7"
      border="1px solid purple"
      p="8px"
      gap="8px"
      width="160px"
      boxShadow="md"
      transition="all 0.2s"
      _hover={{ boxShadow: "lg", transform: "scale(1.02)" }}
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
      <Flex grow="1" direction="column">
        <Box>  
          <Text fontSize="8px" fontWeight="500" color="#2d3748" mb="3px">To {data.email}</Text>
          <Text fontSize="8px" fontWeight="400" color="#4a5568" mb="2px"><b>Subject:</b> {truncateText(data.subject, 35)}</Text>
          <Text 
            fontSize="7px"
            whiteSpace="nowrap" 
            overflow="hidden" 
            textOverflow="ellipsis"
            maxWidth="140px"
            color="#4a5568"
          >
            {truncateText(data.body, 80)}
          </Text>       
        </Box>
      </Flex>
      <CustomHandle type="source" position={Position.Right} />
      <CustomHandle type="target" position={Position.Left} />
    </Flex>
  );
}
