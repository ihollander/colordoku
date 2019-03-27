import React from "react";

const GridCell = ({
  display,
  color,
  backgroundColor,
  onCellClick,
  children
}) => {
  return (
    <g onClick={onCellClick}>
      <rect
        x={display.x}
        y={display.y}
        width={display.width}
        height={display.height}
        fill={backgroundColor}
        stroke="black"
        strokeWidth="0.5"
      />
      <circle
        cx={display.x + display.width / 2}
        cy={display.y + display.width / 2}
        r={display.width / 2 - 0.75}
        fill={color}
      />
      {children || null}
    </g>
  );
};

export default GridCell;
