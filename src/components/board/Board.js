import React from "react";
import GridCell from "./GridCell";
import GridLine from "./GridLine";
import { getCellDisplay, colorMap } from "../../helpers/displayHelpers";

const Board = ({ cells, cursorColor, onCellClick }) => {
  // render
  const renderDividers = () => {
    const dividers = [];
    for (let i = 0; i <= 3; i++) {
      let offset = (i * 100) / 3;
      dividers.push(
        <GridLine key={`${i}-hor`} offset={offset} direction="horizontal" />
      );
      dividers.push(
        <GridLine key={`${i}-ver`} offset={offset} direction="vertical" />
      );
    }
    return dividers;
  };

  const renderCells = () => {
    return cells.map(cell => {
      let display = getCellDisplay(cell.row, cell.col);
      return (
        <GridCell
          key={`${cell.row}${cell.col}`}
          pencilMarks={cell.pencilMarks}
          color={colorMap[cell.value]}
          backgroundColor="transparent"
          onCellClick={() => onCellClick(cell)}
          display={display}
          fade={cursorColor !== 0 && cell.value !== cursorColor}
        />
      );
    });
  };

  return (
    <svg
      viewBox="0 0 100 100"
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
    >
      {renderCells()}
      {renderDividers()}
    </svg>
  );
};

export default Board;
