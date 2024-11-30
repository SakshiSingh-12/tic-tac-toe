// src/Game.js
import React, { useState } from "react";
import Board from "./Board"; // Import the Board component

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]); // Array to hold the history of moves
  const [stepNumber, setStepNumber] = useState(0); // Keeps track of the current move
  const [xIsNext, setXIsNext] = useState(true); // Boolean to track whose turn it is (X or O)

  const handleClick = (i) => {
    const historyCopy = history.slice(0, stepNumber + 1);
    const current = historyCopy[historyCopy.length - 1];
    const squares = [...current];
    if (squares[i] || calculateWinner(squares)) return;

    squares[i] = xIsNext ? "X" : "O";
    setHistory(historyCopy.concat([squares]));
    setStepNumber(historyCopy.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const current = history[stepNumber];
  const winner = calculateWinner(current);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#add8e6", // Light blue background color
        padding: "20px",
      }}
    >
      <h1 style={{ textAlign: "center", backgroundColor: "#4682b4", color: "#fff", padding: "10px 20px", borderRadius: "5px" }}>
        Tic-Tac-Toe Game
      </h1>
      <Board squares={current} onClick={handleClick} />
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        {winner ? (
          <h2>Winner: {winner}</h2>
        ) : (
          <h2>Next player: {xIsNext ? "X" : "O"}</h2>
        )}
      </div>
      <div>
  <h2 style={{ textAlign: "center" }}>Game History</h2>
  <ol
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)", // 3 columns
      gap: "10px", // Space between items
      listStyleType: "none", // Remove default list styles
      padding: "0",
    }}
  >
    {history.map((step, move) => (
      <li key={move} style={{ textAlign: "center" }}>
        <button
          style={{
            padding: "10px",
            backgroundColor: "#4682b4",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => jumpTo(move)}
        >
          {move ? `Move #${move}` : "Start"}
        </button>
      </li>
    ))}
  </ol>
</div>

    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default Game;
