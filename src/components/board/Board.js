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

const Board = ({ cells, onCellClick }) => {
  const getCellDisplay = (row, column, rowSize) => {
    const cellWidth = 100 / rowSize;
    const xOffset = cellWidth * column;
    const yOffset = cellWidth * row;
    return {
      x: xOffset,
      y: yOffset,
      width: cellWidth,
      height: cellWidth
    };
  };

  const renderDividers = () => {
    const lines = [];
    for (let x = 0; x < 4; x++) {
      let offset = (x * 100) / 3;
      lines.push(
        <line
          key={`lineX${x}`}
          x1={offset}
          y1={0}
          x2={offset}
          y2={100}
          stroke="black"
          strokeWidth="1"
        />
      );
    }
    for (let y = 0; y < 4; y++) {
      let offset = (y * 100) / 3;
      lines.push(
        <line
          key={`lineY${y}`}
          x1={0}
          y1={offset}
          x2={100}
          y2={offset}
          stroke="black"
          strokeWidth="1"
        />
      );
    }
    return lines;
  };

  const renderCells = () => {
    const rects = [];
    cells.forEach(cell => {
      let display = getCellDisplay(cell.row, cell.col, 9);
      rects.push(
        <rect
          key={`${cell.row}${cell.col}`}
          x={display.x}
          y={display.y}
          width={display.width}
          height={display.height}
          stroke="black"
          strokeWidth="0.5"
          fill={colorMap[cell.value]}
          onClick={() => onCellClick(cell)}
        />
      );
    });
    return rects;
  };

  return (
    <svg
      viewBox="0 0 100 100"
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: "pointer" }}
    >
      {renderCells()}
      {renderDividers()}
    </svg>
  );
};

export default Board;
