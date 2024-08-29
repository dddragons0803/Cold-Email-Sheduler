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
  Select,
  Box,
} from '@chakra-ui/react';

const WaitDelayModal = ({ isOpen, onClose, onSave }) => {
  const [taskType, setTaskType] = useState('');
  const [duration, setDuration] = useState('');
  const [customMinutes, setCustomMinutes] = useState('');
  const [repeatInterval, setRepeatInterval] = useState('');

  const handleSave = () => {
    const selectedDuration = duration === 'custom' ? customMinutes : duration;
    onSave({ taskType, duration: selectedDuration, repeatInterval });

    onClose();
    setTaskType('');
    setDuration('');
    setCustomMinutes('');
    setRepeatInterval('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} >
    <ModalOverlay />
    <ModalContent borderRadius="lg"  >
      <Box bg="#410566" p={3} borderTopRadius="lg">
        <ModalHeader color="white">Add Task</ModalHeader>
        <ModalCloseButton color="white" />
      </Box>
      <ModalBody bg="#f0f4f8" >
        <FormControl mb={4}>
          <FormLabel>Task Type</FormLabel>
          <Select 
            value={taskType} 
            onChange={(e) => setTaskType(e.target.value)}
            bg="white"
            borderColor="#aa1fff"
          >
            <option value="" disabled>Choose</option> 
            <option value="now">Immediate</option>
            <option value="schedule">Scheduled</option>
            <option value="repeat">Repeating</option>
          </Select>
        </FormControl>
        {taskType === 'schedule' && (
          <FormControl mb={4}>
            <FormLabel>Choose Duration</FormLabel>
            <Select 
              value={duration} 
              onChange={(e) => setDuration(e.target.value)}
              bg="white"
              borderColor="#aa1fff"
            >
              <option value="" disabled>Choose</option> 
              <option value="0">Right Now</option>
              <option value="60">After 1 Hour</option>
              <option value="1440">After 1 Day</option>
              <option value="custom">Custom (minutes)</option>
            </Select>
            {duration === 'custom' && (
              <FormControl>
                <FormLabel>Duration (minutes)</FormLabel>
                <Input 
                  value={customMinutes} 
                  onChange={(e) => setCustomMinutes(e.target.value)} 
                  type="number"
                  bg="white"
                  borderColor="#aa1fff"
                />
              </FormControl>
            )}
          </FormControl>
        )}
        {taskType === 'repeat' && (
          <>
            <FormControl mb={4}>
              <FormLabel>Repeat Interval</FormLabel>
              <Select 
                // value={repeatInterval} 
                value={duration}
                onChange={(e) => {
                  setRepeatInterval(e.target.value);
                  console.log("rrreeaapeat intrval",duration)
                }}
                bg="white"
                borderColor="#aa1fff"
              >
                <option value="" disabled>Choose</option> 
                <option value="2">2  min</option>
                <option value="60">1  hour</option>
                <option value="10800">1 Week</option>
                <option value="43200">1 Month</option>
              </Select>
            </FormControl>
          </>
        )}
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

export default WaitDelayModal;
