import React, { useState } from "react";
import Board from "./components/board/Board";
import ColorPicker from "./components/picker/ColorPicker";

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

const App = () => {
  const setInitalBoardState = board => {
    const cells = [];
    for (let x = 0, xs = board.length; x < xs; x++) {
      for (let y = 0, ys = board[x].length; y < ys; y++) {
        cells.push({
          value: board[x][y],
          row: x,
          col: y,
          locked: board[x][y] !== 0
        });
      }
    }
    return cells;
  };

  const onCellClick = clickedCell => {
    const newValue = (clickedCell.value + 1) % 10;
    const newCells = cells.map(cell =>
      cell === clickedCell && !cell.locked
        ? { ...clickedCell, value: newValue }
        : cell
    );
    setCells(newCells);
  };

  const validGroup = cells => {
    const valid = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    cells = cells.map(c => c.value).sort();
    if (
      cells.length !== valid.length ||
      cells.every((value, index) => value !== valid[index])
    ) {
      return false;
    }
    return true;
  };

  const gameWon = () => {
    for (let i = 0; i < 9; i++) {
      // all x values for the same y value are a unique set of 1-9
      let row = cells.filter(c => c.row === i);
      if (!validGroup(row)) return false;

      // all y values for the same x value are a unique set of 1-9
      let col = cells.filter(c => c.col === i);
      if (!validGroup(col)) return false;

      // all groups of 9 are a unique set of 1-9
      let rowGroup = (i % 3) * 3;
      let colGroup = Math.floor(i / 3) * 3;
      let group = cells.filter(
        c =>
          c.row >= rowGroup &&
          c.row < rowGroup + 3 &&
          c.col >= colGroup &&
          c.col < colGroup + 3
      );

      if (!validGroup(group)) return false;
    }

    return true;
  };

  const [cells, setCells] = useState(setInitalBoardState(board));

  return (
    <div style={{ minWidth: "600px", margin: "10px auto" }}>
      <div style={{ display: "flex", margin: "0 20px" }}>
        <Board cells={cells} onCellClick={onCellClick} />
        <ColorPicker />
      </div>
      <button
        onClick={() => (gameWon() ? alert("You won yay") : alert("Hm nope."))}
      >
        Check Game
      </button>
    </div>
  );
};

export default App;
