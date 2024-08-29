// import React, { useEffect, useState } from 'react';
// import { Box, Button, List, ListItem,IconButton,  Text, VStack, useBreakpointValue } from '@chakra-ui/react';
// import axios from 'axios';
// import { MdDelete } from 'react-icons/md';

// const Sidebar = ({ onSelectWorkflow }) => {
//   const [workflows, setWorkflows] = useState([]);
//   const sidebarWidth = useBreakpointValue({ base: 'full', md: '250px' });

//   useEffect(() => {
//     const fetchWorkflows = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:3000/api/workflows', {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });
//         setWorkflows(response.data);
//       } catch (error) {
//         console.error('Error fetching workflows:', error);
//       }
//     };

//     fetchWorkflows();
//   }, []);

//   const handleDeleteWorkflow = async (id) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`http://localhost:3000/api/workflow/${id}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       setWorkflows(workflows.filter(workflow => workflow._id !== id));
//     } catch (error) {
//       console.error('Error deleting workflow:', error);
//     }
//   };

//   return (
//     <Box 
//       width={sidebarWidth} 
//       borderRight="1px solid #e2e8f0" 
//       p="4" 
//       bg="#e5eff5"
//       height="100vh" 
//       overflowY="auto"
//     >
//       <Text as='samp' fontSize="2xl" fontWeight="bold"  >
//         Workflows
//       </Text>
//       <VStack mt='4' spacing={4} align="start">
//         {workflows.map((workflow) => (
//            <Box key={workflow._id} display="flex" alignItems="center" width="full">
//            <Button
//              variant="outline"
//              colorScheme="purple"
//              flex="1"
//              justifyContent="start"
//              onClick={() => onSelectWorkflow(workflow._id)}
//              borderRadius="md"
//              bg={"#fff"}
//              _hover={{ bg: "purple.50" }}
//            >
//              {workflow.name || 'Unnamed Workflow'}
//            </Button>
//            <IconButton
//              aria-label="Delete workflow"
//              icon={<MdDelete />}
//              size="md"
//              colorScheme="red"
//              variant="outline"
//              onClick={() => handleDeleteWorkflow(workflow._id)}
//              ml={2}
//            />
//          </Box>
//         ))}
//       </VStack>
//     </Box>
//   );
// };

// export default Sidebar;




import React, { useEffect, useState } from 'react';
import { Box, Button, VStack, IconButton, Text, useBreakpointValue } from '@chakra-ui/react';
import axios from 'axios';
import { MdDelete, MdPause, MdPlayArrow } from 'react-icons/md';

const Sidebar = ({ onSelectWorkflow }) => {
  const [workflows, setWorkflows] = useState([]);
  const sidebarWidth = useBreakpointValue({ base: 'full', md: '250px' });

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/workflows', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setWorkflows(response.data);
      } catch (error) {
        console.error('Error fetching workflows:', error);
      }
    };

    fetchWorkflows();
  }, []);

  const handleDeleteWorkflow = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/workflow/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setWorkflows(workflows.filter(workflow => workflow._id !== id));
    } catch (error) {
      console.error('Error deleting workflow:', error);
    }
  };

  const handlePauseWorkflow = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:3000/api/workflow/${id}/pause`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setWorkflows(workflows.map(workflow => 
        workflow._id === id ? { ...workflow, status: 'paused' } : workflow
      ));
    } catch (error) {
      console.error('Error pausing workflow:', error);
    }
  };

  const handleResumeWorkflow = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:3000/api/workflow/${id}/resume`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setWorkflows(workflows.map(workflow => 
        workflow._id === id ? { ...workflow, status: 'running' } : workflow
      ));
    } catch (error) {
      console.error('Error resuming workflow:', error);
    }
  };

  return (
    <Box 
      width={sidebarWidth} 
      borderRight="1px solid #e2e8f0" 
      p="4" 
      bg="#e5eff5"
      height="100vh" 
      overflowY="auto"
    >
      <Text as='samp' fontSize="2xl" fontWeight="bold">
        Workflows
      </Text>
      <VStack mt='4' spacing={4} align="start">
        {workflows.map((workflow) => (
          <Box key={workflow._id} display="flex" alignItems="center" width="full">
            <Button
              variant="outline"
              colorScheme="purple"
              flex="1"
              justifyContent="start"
              onClick={() => onSelectWorkflow(workflow._id)}
              borderRadius="md"
              bg="#fff"
              _hover={{ bg: "purple.50" }}
            >
              {workflow.name || 'Unnamed Workflow'}
            </Button>
            <IconButton
              aria-label="Delete workflow"
              icon={<MdDelete />}
              size="md"
              colorScheme="red"
              variant="outline"
              onClick={() => handleDeleteWorkflow(workflow._id)}
              ml={2}
            />
            {workflow.status === 'running' ? (
              <IconButton
                aria-label="Pause workflow"
                icon={<MdPause />}
                size="md"
                colorScheme="yellow"
                variant="outline"
                onClick={() => handlePauseWorkflow(workflow._id)}
                ml={2}
              />
            ) : (
              <IconButton
                aria-label="Resume workflow"
                icon={<MdPlayArrow />}
                size="md"
                colorScheme="green"
                variant="outline"
                onClick={() => handleResumeWorkflow(workflow._id)}
                ml={2}
              />
            )}
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;

