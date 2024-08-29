import React from "react";
import { AiFillDelete } from "react-icons/ai";
import {
  BezierEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
} from "reactflow";

export default function CustomEdge(props) {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  } = props;

  const { setEdges } = useReactFlow();

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <>
      <BezierEdge {...props} path={edgePath} />
      <EdgeLabelRenderer>
        <button
          aria-label="Delete Edge"
          className="absolute text-red-500"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
            fontSize: "10px", // Adjust this to match your desired size
            padding: "2px",   // Adjust padding as needed
          }}
          onClick={() =>
            setEdges((prevEdges) => prevEdges.filter((edge) => edge.id !== id))
          }
        >
          <AiFillDelete />
        </button>
      </EdgeLabelRenderer>
    </>
  );
}
