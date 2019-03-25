import React, { useState } from "react";

const board = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

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

function Board() {
  const setInitalBoardState = board => {
    const cells = [];
    for (let x = 0, xs = board.length; x < xs; x++) {
      for (let y = 0, ys = board[x].length; y < ys; y++) {
        cells.push({
          value: board[x][y],
          row: x,
          col: y
        });
      }
    }
    return cells;
  };

  const [cells, setCells] = useState(setInitalBoardState(board));

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

  const onCellClick = clickedCell => {
    const newCells = cells.map(cell =>
      cell === clickedCell ? { ...clickedCell, value: 8 } : cell
    );
    setCells(newCells);
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
}

export default Board;
