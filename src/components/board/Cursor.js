import React from "react";
import { colorMap } from "../../helpers/displayHelpers";

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
