import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../features/workflow/authActions';
// import { useHistory } from 'react-router-dom';
import { Box, Button, Input, FormLabel, FormControl, Flex } from '@chakra-ui/react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
//   const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(register({ email, password }));
    //   history.push('/');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <Box as="form" onSubmit={handleSubmit} p="4" borderWidth="1px" borderRadius="lg" width="400px">
        <FormControl mb="4">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormControl>
        <Button type="submit" colorScheme="teal" width="full">
          Register
        </Button>
      </Box>
    </Flex>
  );
};

export default Register;
