import React from "react";
import { Handle } from "reactflow";

export default function CustomHandle(props) {
  return (
    <Handle
      style={{
        width: 9,
        height: 8,
        background: "purple",
        border: "2px solid black",
      }}
      {...props}
    />
  );
}
