export const colorsRemaining = cells => {
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

export const gameWon = cells => {
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
