import React from "react";

const GameTools = ({ onCheckGameClick, onResetClick }) => {
  return (
    <div>
      <button onClick={onCheckGameClick}>Check Game</button>
      <button onClick={onResetClick}>Reset Game</button>
    </div>
  );
};

export default GameTools;
