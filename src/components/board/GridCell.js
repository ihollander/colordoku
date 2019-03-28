import React from "react";
import { colorMap } from "../../helpers/displayHelpers";

const GridCell = ({
  display,
  color,
  backgroundColor,
  onCellClick,
  children,
  fade,
  pencilMarks
}) => {
  const renderPencilMarks = () => {
    return pencilMarks.map(m => {
      let offsetX = ((m - 1) % 3) * (display.width / 3);
      let offsetY = Math.floor((m - 1) / 3) * (display.height / 3);
      return (
        <rect
          key={m}
          x={display.x + offsetX}
          y={display.y + offsetY}
          width={display.width / 3}
          height={display.height / 3}
          fill={colorMap[m]}
          stroke="black"
          strokeWidth="0"
        />
      );
    });
  };

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
      {pencilMarks && pencilMarks.length ? (
        renderPencilMarks()
      ) : (
        <circle
          cx={display.x + display.width / 2}
          cy={display.y + display.width / 2}
          r={display.width / 2 - 0.75}
          fill={color}
          opacity={fade ? "0.6" : "1"}
        />
      )}
      {children || null}
    </g>
  );
};

export default GridCell;
