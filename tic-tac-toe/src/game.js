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

    if (squares[i] || calculateWinner(squares)) return; // Ignore clicks on filled squares or after a winner

    squares[i] = xIsNext ? "X" : "O";
    setHistory(historyCopy.concat([squares]));
    setStepNumber(historyCopy.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const isBoardFull = (squares) => squares.every((square) => square !== null); // Check if all squares are filled

  const current = history[stepNumber];
  const winner = calculateWinner(current);
  const isDraw = isBoardFull(current) && !winner; // Check for a draw

  const restartGame = () => {
    setHistory([Array(9).fill(null)]);
    setStepNumber(0);
    setXIsNext(true);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", backgroundColor: "#f0f0f0", padding: "10px" }}>
        Tic-Tac-Toe Game
      </h1>
      <Board squares={current} onClick={handleClick} />
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {winner ? (
          <h2>Winner: {winner}</h2>
        ) : isDraw ? (
          <div>
            <h2>Game is a draw!</h2>
            <button onClick={restartGame} style={{ padding: "10px", cursor: "pointer" }}>
              Start Again
            </button>
          </div>
        ) : (
          <h2>Next player: {xIsNext ? "X" : "O"}</h2>
        )}
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h2>Game History</h2>
        <ol style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {history.map((step, move) => (
            <li key={move} style={{ listStyle: "none", margin: "5px" }}>
              <button onClick={() => jumpTo(move)} style={{ padding: "5px" }}>
                {move ? `Go to move #${move}` : "Go to game start"}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

// Helper function to calculate the winner
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
