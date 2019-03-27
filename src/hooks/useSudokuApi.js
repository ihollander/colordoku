import { useState, useEffect } from "react";

export const useSudokuApi = () => {
  const [difficulty, setDifficulty] = useState("random");
  const [isLoading, setIsLoading] = useState(true);
  const [cells, setCells] = useState([]);

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

  // effect hooks
  useEffect(() => {
    setIsLoading(true);
    const fetchData = () => {
      fetch(`https://sugoku2.herokuapp.com/board?difficulty=${difficulty}`)
        .then(r => r.json())
        .then(r => {
          const cells = arrayToCells(r.board);
          setCells(cells);
          setIsLoading(false);
        })
        .catch(console.error);
    };

    fetchData();
  }, [difficulty]);

  return { cells, setCells, setDifficulty, isLoading };
};
