export const setNodes = (nodes) => ({
    type: 'workflow/setNodes',
    payload: nodes,
  });
  
  export const setEdges = (edges) => ({
    type: 'workflow/setEdges',
    payload: edges,
  });
  
  export const addNode = (node) => ({
    type: 'workflow/addNode',
    payload: node,
  });
  
  export const addEdge = (edge) => ({
    type: 'workflow/addEdge',
    payload: edge,
  });
  
  export const deleteNode = (nodeId) => ({
    type: 'workflow/deleteNode',
    payload: nodeId,
  });
  
  export const selectNode = (node) => ({
    type: 'workflow/selectNode',
    payload: node,
  });
  