// src/Square.js
import React from "react";

const Square = ({ value, onClick }) => {
  return (
    <button
      style={{
        width: "100px",
        height: "100px",
        fontSize: "2rem",
        textAlign: "center",
        alignItems: "center",
        backgroundColor: "lightgray",
      }}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;
