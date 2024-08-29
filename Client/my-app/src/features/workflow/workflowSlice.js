import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nodes: [],
  edges: [],
  selectedNode: null,
};

const workflowSlice = createSlice({
  name: 'workflow',
  initialState,
  reducers: {
    setNodes: (state, action) => {
      state.nodes = action.payload;
    },
    setEdges: (state, action) => {
      state.edges = action.payload;
    },
    addNode: (state, action) => {
      state.nodes.push(action.payload);
    },
    addEdge: (state, action) => {
      state.edges.push(action.payload);
    },
    deleteNode: (state, action) => {
      state.nodes = state.nodes.filter(node => node.id !== action.payload);
      state.edges = state.edges.filter(edge => edge.source !== action.payload && edge.target !== action.payload);
    },
    selectNode: (state, action) => {
      state.selectedNode = action.payload;
    },
  },
});

export const { setNodes, setEdges, addNode, addEdge, deleteNode, selectNode } = workflowSlice.actions;

export default workflowSlice.reducer;
