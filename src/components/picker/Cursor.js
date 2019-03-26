import React from "react";

const colorMap = {
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

const Cursor = props => {
  return (
    <div
      style={{
        display: props.visible ? "block" : "none",
        position: "absolute",
        width: "20px",
        height: "20px",
        border: "1px solid #000",
        borderRadius: "50%",
        backgroundColor: colorMap[props.color],
        top: `${props.y}px`,
        left: `${props.x}px`
      }}
    />
  );
};

export default Cursor;
