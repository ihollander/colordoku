export const colorMap = {
  0: "#fff",
  1: "#EB3323", // red
  2: "#F0904C", // orange
  3: "#F9D749", // yellow
  4: "#85F94C", // green
  5: "#1e6830", // dark green
  6: "#73FAFC", // light blue
  7: "#0033F4", // blue
  8: "#cf81d6", // violet
  9: "#4c1b74" // purple
};

export const getCellDisplay = (row, column) => {
  const cellWidth = 100 / 9;
  const xOffset = cellWidth * column;
  const yOffset = cellWidth * row;
  return {
    x: xOffset,
    y: yOffset,
    width: cellWidth,
    height: cellWidth
  };
};
