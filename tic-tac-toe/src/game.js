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
    <div>
      <h1>Tic-Tac-Toe Game</h1>
      <Board squares={current} onClick={handleClick} />
      <div>
        {winner ? (
          <h2>Winner: {winner}</h2>
        ) : (
          <h2>Next player: {xIsNext ? "X" : "O"}</h2>
        )}
      </div>
      <div>
        <h2>Game History</h2>
        <ol>
          {history.map((step, move) => (
            <li key={move}>
              <button onClick={() => jumpTo(move)}>
                {move ? `Go to move #${move}` : "Go to game start"}
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
