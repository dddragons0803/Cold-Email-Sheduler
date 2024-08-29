// import React, { useState, useEffect } from 'react';
// import ReactFlow, {
//   addEdge,
//   Background,
//   BackgroundVariant,
//   Controls,
//   useEdgesState,
//   useNodesState,
//   MiniMap
// } from 'reactflow';
// import 'reactflow/dist/style.css';
// import { Box, Button, Flex, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@chakra-ui/react';
// import axios from 'axios';
// import { initialEdges, initialNodes } from './Workflow_constant';
// import ColdEmail from './ColdEmail';
// import WaitDelay from './WaitDelay';
// import LeadSource from './LeadSource';
// import ColdEmailModal from './ColdEmailModal';
// import WaitDelayModal from './WaitDelayModal';
// import LeadSourceModal from './LeadSourceModal';
// import CustomEdge from "../../CustomEdge";
// import Sidebar from './Sidebar';


// const nodeTypes = {
//   coldEmail: ColdEmail,
//   waitDelay: WaitDelay,
//   leadSource: LeadSource,
// };

// const edgeTypes = {
//   customEdge: CustomEdge,
// };

// const Workflow = () => {
//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
//   const [isColdEmailModalOpen, setColdEmailModalOpen] = useState(false);
//   const [isWaitDelayModalOpen, setWaitDelayModalOpen] = useState(false);
//   const [isLeadSourceModalOpen, setLeadSourceModalOpen] = useState(false);
//   const [isSaveModalOpen, setSaveModalOpen] = useState(false); // New state for save modal
//   const [flowchartName, setFlowchartName] = useState(''); // New state for flowchart name




//   const token = localStorage.getItem('token');

//   const onConnect = (connection) => {
//     const edge = {
//       ...connection,
//       animated: true,
//       id: `${edges.length + 1}`,
//       type: "customEdge",
//     };

//     setEdges((prevEdges) => addEdge(edge, prevEdges));
//   };

//   const addNode = (type, data) => {
//     const newNode = {
//       id: `${nodes.length + 1}`,
//       type,
//       data: { ...data, onDelete: deleteNode },
//       position: { x: Math.random() * 300, y: Math.random() * 300 },
//     };
//     setNodes((nds) => nds.concat(newNode));
//   };

//   const handleSaveColdEmail = (data) => {
//     addNode('coldEmail', data);
//   };

//   const handleSaveWaitDelay = (data) => {
//     addNode('waitDelay', data);
//   };

//   const handleSaveLeadSource = (data) => {
//     addNode('leadSource', data);
//   };

//   const deleteNode = (id) => {
//     setNodes((nds) => nds.filter(node => node.id !== id));
//     setEdges((eds) => eds.filter(edge => edge.source !== id && edge.target !== id));
//   };

//   const saveFlowchart = async () => {

//     if (!flowchartName) {
//       alert('Please enter a name for the flowchart.');
//       return;
//     }

//     const flowchartData = { name: flowchartName, nodes, edges };

//     console.log('Flowchart saved:', flowchartData);

//     // Save flowchart to the backend
//     try {
//       const response = await axios.post('http://localhost:3000/api/workflow', flowchartData, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       console.log('Flowchart saved to backend:', response.data);
//       // Store the saved workflow ID to run it later
//       localStorage.setItem('workflowId', response.data._id);
//       setSaveModalOpen(false); // Close modal after saving
//     } catch (error) {
//       console.error('Error saving flowchart:', error);
//     }
//   };

//   const handleSelectWorkflow = async (id) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(`http://localhost:3000/api/workflow/${id}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       const { nodes, edges } = response.data;

//       // Update the state with the selected workflow's nodes and edges
//       setNodes(nodes);
//       setEdges(edges);
//     } catch (error) {
//       console.error('Error fetching workflow:', error);
//     }
//   };

//   const runFlowchart = async () => {
//     const workflowId = localStorage.getItem('workflowId');

//     if (!workflowId) {
//       alert('Please save the flowchart first.');
//       return;
//     }

//     try {
//       const response = await axios.post(`http://localhost:3000/api/workflow/${workflowId}/run`);
//       console.log('Flowchart execution response:', response.data);
//     } catch (error) {
//       console.error('Error running flowchart:', error);
//     }
//   };
  
//   function MiniMapNode({ x, y }) {
//     return <circle cx={x} cy={y} r="25" />;
//   }

//   // function nodeColor(node) {
//   //   switch (node.type) {
//   //     case 'leadSource':
//   //       return '#4fbe9c';
//   //     case 'waitDelay':
//   //       return '#b74f44';
//   //     case 'coldEmail':
//   //       return '#662970';
//   //     default:
//   //       return '#ff0072';
//   //   }
//   // }

//   return (
//     <Box display="flex" height="100vh" width="100vw">
//       <Sidebar onSelectWorkflow={handleSelectWorkflow} />
//       <Box flex="1" display="flex" flexDirection="column" border="2px solid black" p="2" bg={"#fff"}  >
//         <Flex justifyContent="space-between" alignItems="center" mb="4"  >
//           <Flex gap="4">
//             <Button colorScheme="purple" onClick={() => setLeadSourceModalOpen(true)}>Add Lead Source</Button>
//             <Button colorScheme="purple" onClick={() => setWaitDelayModalOpen(true)}>Add Wait/Delay</Button>
//             <Button colorScheme="purple" onClick={() => setColdEmailModalOpen(true)}>Add Cold Email</Button>
//           </Flex>
//           <Flex gap="4">
//             <Button colorScheme="blue" onClick={() => setSaveModalOpen(true)}>Save Flowchart</Button>
//             <Button colorScheme="green" onClick={runFlowchart}>Run Flowchart</Button>
//           </Flex>
//         </Flex>
// <Box className='h-[92%] '>
//         <ReactFlow

//           nodes={nodes.map(node => ({ ...node, data: { ...node.data, onDelete: deleteNode } }))}
//           edges={edges}
//           onNodesChange={onNodesChange}
//           onEdgesChange={onEdgesChange}
//           onConnect={onConnect}
//           nodeTypes={nodeTypes}
//           edgeTypes={edgeTypes}
//           fitView
//           style={{

//             height: '100%', 
//             border: '2px dotted black', // Optional: adds a border to help visualize the area
//             padding: '20px',
//           }}
//           bg={"red"} 

//         >
//           <Background color="#000000" variant={BackgroundVariant.Dots} />
//           <Controls />
//           <MiniMap pannable zoomable  nodeComponent={MiniMapNode} className='border-2 border-black rounded-lg'/>
//         </ReactFlow>
//         </Box>


//         <ColdEmailModal
//           isOpen={isColdEmailModalOpen}
//           onClose={() => setColdEmailModalOpen(false)}
//           onSave={handleSaveColdEmail}
//         />
//         <WaitDelayModal
//           isOpen={isWaitDelayModalOpen}
//           onClose={() => setWaitDelayModalOpen(false)}
//           onSave={handleSaveWaitDelay}
//         />
//         <LeadSourceModal
//           isOpen={isLeadSourceModalOpen}
//           onClose={() => setLeadSourceModalOpen(false)}
//           onSave={handleSaveLeadSource}
//         />
//         <Modal isOpen={isSaveModalOpen} onClose={() => setSaveModalOpen(false)}>
//           <ModalOverlay />
//           <ModalContent>
//             <ModalHeader>Save Flowchart</ModalHeader>
//             <ModalBody>
//               <Input
//                 placeholder="Enter flowchart name"
//                 value={flowchartName}
//                 onChange={(e) => setFlowchartName(e.target.value)}
//               />
//             </ModalBody>
//             <ModalFooter>
//               <Button colorScheme="blue" mr={3} onClick={saveFlowchart}>
//                 Save
//               </Button>
//               <Button variant="ghost" onClick={() => setSaveModalOpen(false)}>Cancel</Button>
//             </ModalFooter>
//           </ModalContent>
//         </Modal>
//       </Box>
//     </Box>
//   );
// };

// export default Workflow;


import React, { useState, useEffect } from 'react';
import ReactFlow, { addEdge, Background,BackgroundVariant, Controls, useEdgesState, useNodesState, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import { Box, Button, Flex, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@chakra-ui/react';
import axios from 'axios';
import ColdEmail from './ColdEmail';
import WaitDelay from './WaitDelay';
import LeadSource from './LeadSource';
import ColdEmailModal from './ColdEmailModal';
import WaitDelayModal from './WaitDelayModal';
import LeadSourceModal from './LeadSourceModal';
import CustomEdge from "../../CustomEdge";
import Sidebar from './Sidebar';

const nodeTypes = {
  coldEmail: ColdEmail,
  waitDelay: WaitDelay,
  leadSource: LeadSource,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

const Workflow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isColdEmailModalOpen, setColdEmailModalOpen] = useState(false);
  const [isWaitDelayModalOpen, setWaitDelayModalOpen] = useState(false);
  const [isLeadSourceModalOpen, setLeadSourceModalOpen] = useState(false);
  const [isSaveModalOpen, setSaveModalOpen] = useState(false);
  const [flowchartName, setFlowchartName] = useState('');
  const [selectedWorkflowId, setSelectedWorkflowId] = useState(null);

  const token = localStorage.getItem('token');

  const onConnect = (connection) => {
    const edge = {
      ...connection,
      animated: true,
      id: `${edges.length + 1}`,
      type: "customEdge",
    };

    setEdges((prevEdges) => addEdge(edge, prevEdges));
  };

  const addNode = (type, data) => {
    const newNode = {
      id: `${nodes.length + 1}`,
      type,
      data: { ...data, onDelete: deleteNode },
      position: { x: Math.random() * 300, y: Math.random() * 300 },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const handleSaveColdEmail = (data) => {
    addNode('coldEmail', data);
  };

  const handleSaveWaitDelay = (data) => {
    addNode('waitDelay', data);
  };

  const handleSaveLeadSource = (data) => {
    addNode('leadSource', data);
  };

  const deleteNode = (id) => {
    setNodes((nds) => nds.filter(node => node.id !== id));
    setEdges((eds) => eds.filter(edge => edge.source !== id && edge.target !== id));
  };

  const saveFlowchart = async () => {
    if (!flowchartName) {
      alert('Please enter a name for the flowchart.');
      return;
    }

    const flowchartData = { name: flowchartName, nodes, edges };

    console.log('Flowchart saved:', flowchartData);

    try {
      const response = await axios.post('http://localhost:3000/api/workflow', flowchartData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Flowchart saved to backend:', response.data);
      localStorage.setItem('workflowId', response.data._id);
      setSelectedWorkflowId(response.data._id); // Update the selected workflow ID
      setSaveModalOpen(false);
    } catch (error) {
      console.error('Error saving flowchart:', error);
    }
  };

  const handleSelectWorkflow = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/workflow/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const { nodes, edges } = response.data;
      setNodes(nodes);
      setEdges(edges);
      setSelectedWorkflowId(id); // Set the selected workflow ID
    } catch (error) {
      console.error('Error fetching workflow:', error);
    }
  };

  const runFlowchart = async () => {
    if (!selectedWorkflowId) {
      alert('Please save the flowchart first.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3000/api/workflow/${selectedWorkflowId}/run`);
      console.log('Flowchart execution response:', response.data);
    } catch (error) {
      console.error('Error running flowchart:', error);
    }
  };

  function MiniMapNode({ x, y }) {
    return <circle cx={x} cy={y} r="25" />;
  }

  return (
    <Box display="flex" height="100vh" width="100vw">
      <Sidebar onSelectWorkflow={handleSelectWorkflow} />
      <Box flex="1" display="flex" flexDirection="column" border="2px solid black" p="2" bg="#fff">
        <Flex justifyContent="space-between" alignItems="center" mb="4">
          <Flex gap="4">
            <Button colorScheme="purple" onClick={() => setLeadSourceModalOpen(true)}>Add Lead Source</Button>
            <Button colorScheme="purple" onClick={() => setWaitDelayModalOpen(true)}>Add Wait/Delay</Button>
            <Button colorScheme="purple" onClick={() => setColdEmailModalOpen(true)}>Add Cold Email</Button>
          </Flex>
          <Flex gap="4">
            <Button colorScheme="blue" onClick={() => setSaveModalOpen(true)}>Save Flowchart</Button>
            <Button colorScheme="green" onClick={runFlowchart}>Run Flowchart</Button>
          </Flex>
        </Flex>
        <Box className='h-[92%] '>
          <ReactFlow
            nodes={nodes.map(node => ({ ...node, data: { ...node.data, onDelete: deleteNode } }))}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            fitView
            style={{
              height: '100%',
              border: '2px dotted black',
              padding: '20px',
            }}
          >
            <Background color="#000000" variant={BackgroundVariant.Dots} />
            <Controls />
            <MiniMap pannable zoomable nodeComponent={MiniMapNode} className='border-2 border-black rounded-lg' />
          </ReactFlow>
        </Box>

        <ColdEmailModal
          isOpen={isColdEmailModalOpen}
          onClose={() => setColdEmailModalOpen(false)}
          onSave={handleSaveColdEmail}
        />
        <WaitDelayModal
          isOpen={isWaitDelayModalOpen}
          onClose={() => setWaitDelayModalOpen(false)}
          onSave={handleSaveWaitDelay}
        />
        <LeadSourceModal
          isOpen={isLeadSourceModalOpen}
          onClose={() => setLeadSourceModalOpen(false)}
          onSave={handleSaveLeadSource}
        />
        <Modal isOpen={isSaveModalOpen} onClose={() => setSaveModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Save Flowchart</ModalHeader>
            <ModalBody>
              <Input
                placeholder="Enter flowchart name"
                value={flowchartName}
                onChange={(e) => setFlowchartName(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={saveFlowchart}>
                Save
              </Button>
              <Button variant="ghost" onClick={() => setSaveModalOpen(false)}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default Workflow;

