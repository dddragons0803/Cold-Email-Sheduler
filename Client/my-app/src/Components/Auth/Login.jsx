import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/workflow/authSlice';
import { Box, Button, Input, FormLabel, FormControl, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handle submit")
    console.log(email,password)
    await dispatch(login({ email, password }));
    console.log("handle submit")
    console.log(isAuthenticated)
    if (isAuthenticated) {
      navigate('/');
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
          Login
        </Button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </Box>
    </Flex>
  );
};

export default Login;
