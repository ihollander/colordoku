import React from "react";

const NewGame = ({ onNewGameClick }) => {
  return (
    <div>
      <label>New Game: </label>
      <button onClick={() => onNewGameClick("easy")}>Easy</button>
      <button onClick={() => onNewGameClick("medium")}>Medium</button>
      <button onClick={() => onNewGameClick("hard")}>Hard</button>
      <button onClick={() => onNewGameClick("random")}>Random</button>
    </div>
  );
};

export default NewGame;
