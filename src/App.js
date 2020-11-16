import React, { useState } from 'react';
import Board from './components/Board';
import History from './components/History';
import { calculateWinner } from './components/helper';
import StatusMessage from './components/StatusMessage';
import './styles/root.scss';

export default () => {
  const NEW_GAME = [{ board: Array(9).fill(null), isXNext: true }];
  const [history, setHistory] = useState(NEW_GAME);
  const [currentMove, setCurrentMove] = useState(0);
  const current = history[currentMove];
  const { winner, winningSquares } = calculateWinner(current.board);
  const handleSquareClick = position => {
    if (current.board[position] || winner) {
      return;
    }
    setHistory(prev => {
      const last = prev[prev.length - 1];
      const newBoard = last.board.map((value, pos) => {
        if (pos === position) {
          return last.isXNext ? 'X' : 'O';
        }
        return value;
      });
      return prev.concat({ board: newBoard, isXNext: !last.isXNext });
    });
    setCurrentMove(prev => prev + 1);
  };
  const moveTo = move => {
    setCurrentMove(move);
  };
  const onNewGame = () => {
    setHistory(NEW_GAME);
    setCurrentMove(0);
  };

  return (
    <div className="app">
      <h1>
        TIC <span className="text-green">TAC</span> TOE
      </h1>
      <StatusMessage winner={winner} current={current}></StatusMessage>
      <Board
        board={current.board}
        handleSquareClick={handleSquareClick}
        winningSquares={winningSquares}
      />
      <button
        type="button"
        onClick={onNewGame}
        className={`btn-reset ${winner ? 'active' : ''}`}
      >
        NEW GAME
      </button>
      <h2 style={{ fontWeight: 'normal' }}>Current Game History</h2>
      <History
        history={history}
        moveTo={moveTo}
        currentMove={currentMove}
      ></History>
      <div className="bg-balls"></div>
    </div>
  );
};
