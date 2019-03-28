import React, { useState, useEffect } from "react";
import Board from "./components/board/Board";
import ColorPicker from "./components/picker/ColorPicker";
import Cursor from "./components/board/Cursor";
import NewGame from "./components/tools/NewGame";
import GameTools from "./components/tools/GameTools";
import { colorsRemaining, gameWon } from "./helpers/gameLogicHelpers";

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
          locked: boardArray[x][y] !== 0,
          pencilMarks: []
        });
      }
    }
    return cells;
  };

  // state hooks
  const [isLoading, setIsLoading] = useState(true);
  const [cells, setCells] = useState([]);
  const [pencilMode, setPencilMode] = useState(false);
  const [cursor, setCursor] = useState({
    x: 0,
    y: 0,
    color: 0,
    visible: false
  });

  const fetchData = difficulty => {
    setIsLoading(true);
    fetch(`https://sugoku2.herokuapp.com/board?difficulty=${difficulty}`)
      .then(r => r.json())
      .then(r => {
        const newCells = arrayToCells(r.board);
        setCells(newCells);
        setIsLoading(false);
      })
      .catch(console.error);
  };

  // effect hooks
  useEffect(() => {
    fetchData("random");
  }, []);

  // event handlers
  const handleCellClick = clickedCell => {
    const newCells = cells.map(cell => {
      if (cell !== clickedCell || cell.locked) return cell;

      if (pencilMode) {
        // if the pencil marks array includes the cursor color, remove it
        if (cell.pencilMarks.find(m => m === cursor.color)) {
          return {
            ...cell,
            pencilMarks: cell.pencilMarks.filter(m => m !== cursor.color)
          };
          // else add it
        } else {
          return { ...cell, pencilMarks: [...cell.pencilMarks, cursor.color] };
        }
      } else {
        return { ...cell, value: cursor.color, pencilMarks: [] };
      }
    });
    setCells(newCells);
  };

  const handleReset = () => {
    const newCells = cells.map(cell =>
      cell.locked ? cell : { ...cell, value: 0, pencilMarks: [] }
    );
    setCells(newCells);
  };

  const handleCheckGame = () =>
    gameWon(cells) ? alert("You won yay") : alert("Hm nope.");

  const handleCursorVisibility = visible => setCursor({ ...cursor, visible });

  const handleMouseMove = ({ pageX: x, pageY: y }) =>
    setCursor({ ...cursor, x, y });

  const handlePickerClick = color => setCursor({ ...cursor, color });

  const handleNewGameClick = difficulty => fetchData(difficulty);

  const handlePencilMode = () => setPencilMode(!pencilMode);

  return (
    <div style={{ minWidth: "800px", width: "75%", margin: "10px auto" }}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "flex-start"
          }}
        >
          <Board
            cells={cells}
            cursorColor={cursor.color}
            onCellClick={handleCellClick}
            handleMouseMove={handleMouseMove}
            updateCursorVisibility={handleCursorVisibility}
          />
          <ColorPicker
            onPencilMode={handlePencilMode}
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
      )}
      <NewGame onNewGameClick={handleNewGameClick} />
      <GameTools
        onCheckGameClick={handleCheckGame}
        onResetClick={handleReset}
      />
    </div>
  );
};

export default App;
