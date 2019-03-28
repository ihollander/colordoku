import React from "react";
import GridCell from "../board/GridCell";
import { colorMap, getCellDisplay } from "../../helpers/displayHelpers";

const ColorPicker = ({ onCellClick, onPencilMode, counter }) => {
  const renderCells = () => {
    const rects = [];
    for (let i = 0; i < 10; i++) {
      let display = getCellDisplay(Math.floor(i / 2), i % 2);
      rects.push(
        <GridCell
          key={i}
          color={colorMap[i]}
          backgroundColor="black"
          onCellClick={() => onCellClick(i)}
          display={display}
        >
          {i > 0 && (
            <text
              fontSize="4"
              alignmentBaseline="central"
              textAnchor="middle"
              x={display.x + display.width / 2}
              y={display.y + display.height / 2}
            >
              {counter[i]}
            </text>
          )}
        </GridCell>
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
      <button onClick={onPencilMode}>Pencil Mode</button>
    </div>
  );
};

export default ColorPicker;
