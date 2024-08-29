import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
} from '@chakra-ui/react';

const LeadSourceModal = ({ isOpen, onClose, onSave }) => {
  const [source, setSource] = useState('');

  const handleSave = () => {
    onSave({ source });
    onClose();
    setSource('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent  borderRadius="lg">
        <Box bg="#410566" p={3} borderTopRadius="lg">
          <ModalHeader color="white">Add Lead Source</ModalHeader>
          <ModalCloseButton color="white" />
        </Box>
        <ModalBody bg="#f0f4f8">
          <FormControl mb={4}>
            <FormLabel>Lead Source</FormLabel>
            <Input
              value={source}
              onChange={(e) => setSource(e.target.value)}
              bg="white"
              borderColor="#aa1fff"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter bg="#f0f4f8">
          <Button colorScheme="purple" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button variant="outline" colorScheme="purple" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LeadSourceModal;
