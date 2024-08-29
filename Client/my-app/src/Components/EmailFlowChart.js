// import ReactFlow, {
//   addEdge,
//   Background,
//   Connection,
//   Controls,
//   MiniMap,
//   useEdgesState,
//   useNodesState,
// } from "reactflow";
// import "reactflow/dist/style.css";
// import { Box } from "@chakra-ui/react";
// import { useCallback } from "react";
// import { initialEdges, initialNodes } from "./Workflow.constants";
// import PaymentInit from "./PaymentInit";
// import PaymentCountry from "./PaymentCountry";
// import PaymentProvider from "./PaymentProvider";
// import PaymentProviderSelect from "./PaymentProviderSelect";
// import CustomEdge from "./CustomEdge";
// import ColdEmail from "./ColdEmail";
// import WaitDelay from "./WaitDelay";
// import LeadSource from "./LeadSource";

// const nodeTypes = {
//   paymentInit: PaymentInit,
//   paymentCountry: PaymentCountry,
//   paymentProvider: PaymentProvider,
//   paymentProviderSelect: PaymentProviderSelect,
//   coldEmail: ColdEmail,
//   waitDelay: WaitDelay,
//   leadSource: LeadSource,
// };

// const edgeTypes = {
//   customEdge: CustomEdge,
// };

// export const Workflow = () => {
//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

//   const onConnect = useCallback(
//     (connection: Connection) => {
//       const edge = {
//         ...connection,
//         animated: true,
//         id: `${edges.length} + 1`,
//         type: "customEdge",
//       };
//       setEdges((prevEdges) => addEdge(edge, prevEdges));
//     },
//     [edges]
//   );

//   const addNode = (type, data) => {
//     const newNode = {
//       id: `${nodes.length + 1}`,
//       type,
//       data,
//       position: { x: Math.random() * 500, y: Math.random() * 500 },
//     };
//     setNodes((nds) => nds.concat(newNode));
//   };

//   const saveFlowchart = () => {
//     const flowchartData = { nodes, edges };
//     console.log('Flowchart saved:', flowchartData);

//     // Logic to schedule emails based on nodes and their data
//     nodes.forEach(node => {
//       if (node.type === 'coldEmail') {
//         // Schedule cold email
//         console.log(`Scheduling email with subject: ${node.data.subject} and body: ${node.data.body}`);
//       } else if (node.type === 'waitDelay') {
//         // Handle wait/delay
//         console.log(`Wait for ${node.data.duration} minutes`);
//       } else if (node.type === 'leadSource') {
//         // Handle lead source
//         console.log(`Lead source: ${node.data.source}`);
//       }
//     });
//   };

//   return (
//     <Box height={"500px"} width="500px" border="1px solid black">
//       <button onClick={() => addNode("coldEmail", { subject: "Hello", body: "This is a cold email." })}>Add Cold Email</button>
//       <button onClick={() => addNode("waitDelay", { duration: 30 })}>Add Wait/Delay</button>
//       <button onClick={() => addNode("leadSource", { source: "Google Ads" })}>Add Lead Source</button>
//       <button onClick={saveFlowchart}>Save Flowchart</button>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         nodeTypes={nodeTypes}
//         edgeTypes={edgeTypes}
//         fitView
//       >
//         <Background />
//         <Controls />
//       </ReactFlow>
//     </Box>
//   );
// };


// import React, { useState, useCallback } from 'react';
// import ReactFlow, {
//   addEdge,
//   applyNodeChanges,
//   applyEdgeChanges,
//   Background,
//   Controls,
// } from 'reactflow';
// import 'reactflow/dist/style.css';

// const initialNodes = [
//   {
//     id: '1',
//     type: 'input',
//     data: { label: 'Lead Source' },
//     position: { x: 250, y: 5 },
//   },
// ];

// const nodeTypes = {
//   coldEmail: ({ data }) => <div>{data.label}</div>,
//   waitDelay: ({ data }) => <div>{data.label}</div>,
//   leadSource: ({ data }) => <div>{data.label}</div>,
// };

// const EmailFlowChart = () => {
//   const [nodes, setNodes] = useState(initialNodes);
//   const [edges, setEdges] = useState([]);
  
//   const onNodesChange = useCallback(
//     (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
//     []
//   );
  
//   const onEdgesChange = useCallback(
//     (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
//     []
//   );
  
//   const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

//   const onAddNode = (type) => {
//     const newNode = {
//       id: `${nodes.length + 1}`,
//       type: type,
//       data: { label: `${type.charAt(0).toUpperCase() + type.slice(1)}` },
//       position: { x: Math.random() * 250, y: Math.random() * 250 },
//     };
//     setNodes((nds) => nds.concat(newNode));
//   };

//   const saveFlowchart = () => {
//     // Save the flowchart and schedule emails
//     console.log('Flowchart saved', nodes, edges);
//   };

//   return (
//     <div style={{ height: 500 }}>
//       <button onClick={() => onAddNode('coldEmail')}>Add Cold Email</button>
//       <button onClick={() => onAddNode('waitDelay')}>Add Wait/Delay</button>
//       <button onClick={() => onAddNode('leadSource')}>Add Lead Source</button>
//       <button onClick={saveFlowchart}>Save Flowchart</button>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         nodeTypes={nodeTypes}
//         fitView
//       >
//         <Background />
//         <Controls />
//       </ReactFlow>
//     </div>
//   );
// };

// export default EmailFlowChart;
