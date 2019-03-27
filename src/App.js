import React, { useState } from "react";
import Board from "./components/board/Board";
import ColorPicker from "./components/picker/ColorPicker";
import Cursor from "./components/board/Cursor";
import NewGame from "./components/tools/NewGame";
import { colorsRemaining, gameWon } from "./helpers/gameLogicHelpers";

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
  // helper
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

  // event handlers
  const handleCellClick = clickedCell => {
    const newCells = cells.map(cell =>
      cell === clickedCell && !cell.locked
        ? { ...clickedCell, value: cursor.color }
        : cell
    );
    setCells(newCells);
  };

  const handleReset = () => {
    const newCells = cells.map(cell =>
      cell.locked ? cell : { ...cell, value: 0 }
    );
    setCells(newCells);
  };

  const handleCursorVisibility = visible => setCursor({ ...cursor, visible });

  const handleMouseMove = ({ pageX: x, pageY: y }) =>
    setCursor({ ...cursor, x, y });

  const handlePickerClick = color => setCursor({ ...cursor, color });

  const handleNewGameClick = difficulty => {
    fetch(`https://sugoku2.herokuapp.com/board?difficulty=${difficulty}`)
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
          onCellClick={handleCellClick}
          handleMouseMove={handleMouseMove}
          updateCursorVisibility={handleCursorVisibility}
        />
        <ColorPicker
          onCellClick={handlePickerClick}
          counter={colorsRemaining(cells)}
        />
        <Cursor
          x={cursor.x}
          y={cursor.y}
          color={cursor.color}
          visible={cursor.visible}
        />
      </div>
      <NewGame onNewGameClick={handleNewGameClick} />
      <button
        onClick={() =>
          gameWon(cells) ? alert("You won yay") : alert("Hm nope.")
        }
      >
        Check Game
      </button>
      <button onClick={handleReset}>Reset Game</button>
    </div>
  );
};

export default App;
