import React from "react";
import GridCell from "./GridCell";
import GridLine from "./GridLine";
import { getCellDisplay, colorMap } from "../../helpers/displayHelpers";

const Board = ({
  cells,
  onCellClick,
  handleMouseMove,
  updateCursorVisibility
}) => {
  // render
  const renderDividers = () => {
    const dividers = [];
    for (let i = 0; i <= 3; i++) {
      let offset = (i * 100) / 3;
      dividers.push(<GridLine offset={offset} direction="horizontal" />);
      dividers.push(<GridLine offset={offset} direction="vertical" />);
    }
    return dividers;
  };

  const renderCells = () => {
    return cells.map(cell => {
      let display = getCellDisplay(cell.row, cell.col);
      return (
        <GridCell
          key={`${cell.row}${cell.col}`}
          color={colorMap[cell.value]}
          backgroundColor="transparent"
          onCellClick={() => onCellClick(cell)}
          display={display}
        />
      );
    });
  };

  return (
    <div
      style={{ cursor: "none", width: "60%" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => updateCursorVisibility(true)}
      onMouseLeave={() => updateCursorVisibility(false)}
    >
      <svg
        viewBox="0 0 100 100"
        overflow="visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        {renderCells()}
        {renderDividers()}
      </svg>
    </div>
  );
};

export default Board;
