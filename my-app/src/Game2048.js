import React, { useState, useEffect } from 'react';

const createBoard = () => {
  const board = Array(4).fill(null).map(() => Array(4).fill(0));
  return board;
};

const generateRandom = (board) => {
  const emptyCells = [];
  board.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (cell === 0) emptyCells.push([rowIndex, cellIndex]);
    });
  });

  if (emptyCells.length > 0) {
    const [randomRow, randomCell] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomRow][randomCell] = Math.random() < 0.9 ? 2 : 4;
  }

  return board;
};

const moveLeft = (board, setScore) => {
  let newBoard = board.map(row => {
    let filteredRow = row.filter(cell => cell !== 0); // Remove empty cells
    let newRow = [];
    let score = 0;

    for (let i = 0; i < filteredRow.length; i++) {
      if (filteredRow[i] === filteredRow[i + 1]) {
        newRow.push(filteredRow[i] * 2);
        score += filteredRow[i] * 2;
        i++; // Skip the next cell since it was merged
      } else {
        newRow.push(filteredRow[i]);
      }
    }

    setScore(prev => prev + score);

    while (newRow.length < 4) newRow.push(0); // Fill the remaining cells with 0
    return newRow;
  });

  return newBoard;
};

const moveRight = (board, setScore) => {
  let newBoard = board.map(row => {
    let filteredRow = row.filter(cell => cell !== 0);
    let newRow = [];
    let score = 0;

    for (let i = filteredRow.length - 1; i >= 0; i--) {
      if (filteredRow[i] === filteredRow[i - 1]) {
        newRow.unshift(filteredRow[i] * 2);
        score += filteredRow[i] * 2;
        i--; // Skip the next cell since it was merged
      } else {
        newRow.unshift(filteredRow[i]);
      }
    }

    setScore(prev => prev + score);

    while (newRow.length < 4) newRow.unshift(0); // Fill remaining cells with 0
    return newRow;
  });

  return newBoard;
};

const moveUp = (board, setScore) => {
  let newBoard = [...board];
  let score = 0;

  for (let col = 0; col < 4; col++) {
    let column = [];
    for (let row = 0; row < 4; row++) {
      if (board[row][col] !== 0) column.push(board[row][col]);
    }

    let newColumn = [];
    for (let i = 0; i < column.length; i++) {
      if (column[i] === column[i + 1]) {
        newColumn.push(column[i] * 2);
        score += column[i] * 2;
        i++; // Skip the next cell since it was merged
      } else {
        newColumn.push(column[i]);
      }
    }

    setScore(prev => prev + score);

    while (newColumn.length < 4) newColumn.push(0);

    for (let row = 0; row < 4; row++) {
      newBoard[row][col] = newColumn[row];
    }
  }

  return newBoard;
};

const moveDown = (board, setScore) => {
  let newBoard = [...board];
  let score = 0;

  for (let col = 0; col < 4; col++) {
    let column = [];
    for (let row = 0; row < 4; row++) {
      if (board[row][col] !== 0) column.push(board[row][col]);
    }

    let newColumn = [];
    for (let i = column.length - 1; i >= 0; i--) {
      if (column[i] === column[i - 1]) {
        newColumn.unshift(column[i] * 2);
        score += column[i] * 2;
        i--; // Skip the next cell since it was merged
      } else {
        newColumn.unshift(column[i]);
      }
    }

    setScore(prev => prev + score);

    while (newColumn.length < 4) newColumn.unshift(0);

    for (let row = 0; row < 4; row++) {
      newBoard[row][col] = newColumn[row];
    }
  }

  return newBoard;
};

const Game2048 = () => {
  const [board, setBoard] = useState(generateRandom(createBoard()));
  const [score, setScore] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        const newBoard = moveLeft(board, setScore);
        setBoard(generateRandom(newBoard));
      } else if (e.key === 'ArrowRight') {
        const newBoard = moveRight(board, setScore);
        setBoard(generateRandom(newBoard));
      } else if (e.key === 'ArrowUp') {
        const newBoard = moveUp(board, setScore);
        setBoard(generateRandom(newBoard));
      } else if (e.key === 'ArrowDown') {
        const newBoard = moveDown(board, setScore);
        setBoard(generateRandom(newBoard));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [board]);

  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <div key={rowIndex} className="board-row">
        {row.map((cell, cellIndex) => (
          <div key={cellIndex} className={`board-cell ${cell !== 0 ? `tile-${cell}` : ''}`}>
            {cell !== 0 ? cell : ''}
          </div>
        ))}
      </div>
    ));
  };

  const resetGame = () => {
    setBoard(generateRandom(createBoard()));
    setScore(0);
  };

  return (
    <div className="game2048">
      <h2>Score: {score}</h2>
      <div className="board">
        {renderBoard()}
      </div>
      <button onClick={resetGame}>Restart</button>
    </div>
  );
};

export default Game2048;
