import React, { useState } from 'react';
import Papa from 'papaparse';
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
  Textarea,
  Box,
  Text,
} from '@chakra-ui/react';
import 'reactflow/dist/style.css';

const ColdEmailModal = ({ isOpen, onClose, onSave }) => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSave = async () => {
    if (selectedFile) {
      // Parse the CSV file
      Papa.parse(selectedFile, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          // Process each row in the CSV
          results.data.forEach(row => {
            const { email, subject, body } = row;
            onSave({ email, subject, body });
          });
          // Close the modal after processing
          onClose();
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
          setFileError('Error parsing CSV file. Please try again.');
        },
      });
    } else if (email && subject && body) {
      // Send a single email
      onSave({ email, subject, body });
      onClose();
    } else {
      // Handle error if no CSV file uploaded and no email data entered
      setFileError('Please upload a CSV file or fill in the email fields.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent  borderRadius="lg">
        <Box bg="#410566" p={3} borderTopRadius="lg">
          <ModalHeader color="white">Add Cold Emails</ModalHeader>
          <ModalCloseButton color="white" />
        </Box>
        <ModalBody bg="#f0f4f8">
          <FormControl mb={4}>
            <FormLabel>Email Address</FormLabel>
            <Input 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bg="white"
              borderColor="#aa1fff"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Subject</FormLabel>
            <Input 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              bg="white"
              borderColor="#aa1fff"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Body</FormLabel>
            <Textarea 
              value={body}
              onChange={(e) => setBody(e.target.value)}
              bg="white"
              borderColor="#aa1fff"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Or Upload CSV</FormLabel>
            <Input 
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              bg="white"
              borderColor="#aa1fff"
            />
            {fileError && <Text color="red">{fileError}</Text>}
          </FormControl>
        </ModalBody>
        <ModalFooter bg="#f0f4f8">
          <Button colorScheme="purple" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button variant="outline" colorScheme="purple" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ColdEmailModal;
