import React, { useState, useEffect } from "react";
import Board from "./components/board/Board";
import ColorPicker from "./components/picker/ColorPicker";
import Cursor from "./components/picker/Cursor";

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
  const arrayToCells = boardArray => {
    const cells = [];
    for (let x = 0, xs = boardArray.length; x < xs; x++) {
      for (let y = 0, ys = boardArray[x].length; y < ys; y++) {
        cells.push({
          value: boardArray[x][y],
          row: x,
          col: y,
          locked: boardArray[x][y] !== 0
        });
      }
    }
    return cells;
  };

  // game logic
  const colorsRemaining = () => {
    let colorObj = {};
    for (let i = 1; i < 10; i++) {
      colorObj[i] = 9;
    }
    cells.forEach(cell => colorObj[cell.value]--);
    return colorObj;
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

  // event handlers
  const onCellClick = clickedCell => {
    // const newValue = (clickedCell.value + 1) % 10;
    const newCells = cells.map(cell =>
      cell === clickedCell && !cell.locked
        ? { ...clickedCell, value: cursor.color }
        : cell
    );
    setCells(newCells);
  };

  const handleCursorVisibility = visible => setCursor({ ...cursor, visible });

  const handleMouseMove = ({ pageX: x, pageY: y }) =>
    setCursor({ ...cursor, x, y });

  const handlePickerClick = color => setCursor({ ...cursor, color });

  const handleNewGameClick = () => {
    fetch("https://sugoku2.herokuapp.com/board?difficulty=random")
      .then(r => r.json())
      .then(r => {
        const newCells = arrayToCells(r.board);
        setCells(newCells);
      })
      .catch(console.error);
  };

  // state things
  const [cells, setCells] = useState(arrayToCells(board));
  const [cursor, setCursor] = useState({
    x: 0,
    y: 0,
    color: 0,
    visible: false
  });

  return (
    <div style={{ width: "75%", margin: "10px auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-start"
        }}
      >
        <Board
          cells={cells}
          onCellClick={onCellClick}
          handleMouseMove={handleMouseMove}
          updateCursorVisibility={handleCursorVisibility}
        />
        <ColorPicker
          onCellClick={handlePickerClick}
          counter={colorsRemaining()}
        />
        <Cursor
          x={cursor.x}
          y={cursor.y}
          color={cursor.color}
          visible={cursor.visible}
        />
      </div>
      <button onClick={handleNewGameClick}>New Game</button>
      <button
        onClick={() => (gameWon() ? alert("You won yay") : alert("Hm nope."))}
      >
        Check Game
      </button>
    </div>
  );
};

export default App;
