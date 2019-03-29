import React from "react";

const GameTools = ({
  onCheckGameClick,
  onResetClick,
  onPencilMode,
  pencilMode
}) => {
  return (
    <div>
      <button onClick={onCheckGameClick}>Check Game</button>
      <button onClick={onResetClick}>Reset Game</button>
      <div>
        <label>Pencil Mode</label>
        <input type="checkbox" checked={pencilMode} onChange={onPencilMode} />
      </div>
    </div>
  );
};

export default GameTools;
