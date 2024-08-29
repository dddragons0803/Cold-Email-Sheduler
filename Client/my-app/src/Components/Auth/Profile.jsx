import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Text, Button } from '@chakra-ui/react';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Box p="4">
      <Text fontSize="xl" mb="4">Profile</Text>
      {user && (
        <>
          <Text>Email: {user.email}</Text>
          {/* Add more user information here if needed */}
        </>
      )}
    </Box>
  );
};

export default Profile;
