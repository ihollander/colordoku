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

const ColorPicker = ({ onCellClick, counter }) => {
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
      let display = getCellDisplay(Math.floor(i / 2), i % 2);
      rects.push(
        <g key={i} onClick={() => onCellClick(i)}>
          <rect
            x={display.x}
            y={display.y}
            width={display.width}
            height={display.height}
            fill="black"
            stroke="black"
            strokeWidth="0.5"
          />
          <circle
            cx={display.x + display.width / 2}
            cy={display.y + display.width / 2}
            r={display.width / 2 - 0.75}
            fill={colorMap[i]}
          />
          {i > 0 && (
            <text
              fontSize="4"
              alignmentBaseline="hanging"
              x={display.x + 4}
              y={display.y + 4}
            >
              {counter[i]}
            </text>
          )}
        </g>
      );
    }
    return rects;
  };

  return (
    <div style={{ cursor: "pointer", width: "20%" }}>
      <svg
        viewBox="0 0 30 100"
        overflow="visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        {renderCells()}
      </svg>
    </div>
  );
};

export default ColorPicker;
