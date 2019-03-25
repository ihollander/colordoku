import React from "react";

const colorMap = {
  0: "#fff",
  1: "#EB3323", // red
  2: "#F0904C", // orange
  3: "#F9D749", // yellow
  4: "#85F94C", // green
  5: "#1e6830", // dark green
  6: "#73FAFC", // light blue
  7: "#0033F4", // blue
  8: "#cf81d6", // violet
  9: "#4c1b74" // purple
};

const ColorPicker = ({ cells, onCellClick }) => {
  const getCellDisplay = (row, column) => {
    const cellWidth = 100 / 9;
    const xOffset = cellWidth * column;
    const yOffset = cellWidth * row;
    return {
      x: xOffset,
      y: yOffset,
      width: cellWidth,
      height: cellWidth
    };
  };

  const renderCells = () => {
    const rects = [];
    for (let i = 0; i < 10; i++) {
      let display = getCellDisplay(i, 0);
      rects.push(
        <g key={i} onClick={() => console.log(i)}>
          <circle
            cx={display.x + display.width / 2}
            cy={display.y + display.width / 2}
            r={display.width / 2 - 0.75}
            fill={colorMap[i]}
          />
          <rect
            x={display.x}
            y={display.y}
            width={display.width}
            height={display.height}
            fill="transparent"
            stroke="black"
            strokeWidth="0.5"
          />
        </g>
      );
    }
    return rects;
  };

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: "pointer" }}
    >
      {renderCells()}
    </svg>
  );
};

export default ColorPicker;
