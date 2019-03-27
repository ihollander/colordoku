import React from "react";

const GridLine = ({ offset, direction }) => {
  return (
    <line
      x1={direction === "horizontal" ? offset : 0}
      y1={direction === "vertical" ? offset : 0}
      x2={direction === "horizontal" ? offset : 100}
      y2={direction === "vertical" ? offset : 100}
      stroke="black"
      strokeWidth="1"
    />
  );
};

export default GridLine;
