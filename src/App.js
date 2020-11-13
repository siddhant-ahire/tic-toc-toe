import React,{useState} from 'react';
import Board from './components/Board';
import History from './components/History';
import { calculateWinner } from './components/helper';
import StatusMessage from './components/StatusMessage';
import './styles/root.scss';

export default () => {
  const NEW_GAME = [{board: Array(9).fill(null),isXNext: true}];
  const [history,setHistory] = useState(NEW_GAME);
  const [currentMove, setCurrentMove] = useState(0);
  console.log(currentMove)
  const current = history[currentMove];
  console.log('history',history)
    const {winner, winningSquares} = calculateWinner(current.board);
    console.log(winner);
    const handleSquareClick = (position) => {
        if(current.board[position] || winner){
            return;
        }
        setHistory(prev =>{
          const last = prev[prev.length - 1];
            const newBoard = last.board.map((value,pos)=>{
                console.log(pos,value);
                if(pos === position){
                    return last.isXNext?'X':'O';
                }
                return value;
            });
          return prev.concat({board:newBoard,isXNext:!last.isXNext});

        });
        setCurrentMove(prev => prev + 1);
    }
    const moveTo = (move) =>{
      setCurrentMove(move);
    }
    const onNewGame = () =>{
      setHistory(NEW_GAME);
      setCurrentMove(0);
    }

  return (<div className="app">
    <h1>TicTocToe</h1>
    <StatusMessage winner={winner} current={current}></StatusMessage>
    <Board board={current.board} handleSquareClick={handleSquareClick} winningSquares={winningSquares}/>
    <button type="button" onClick={onNewGame}>NEW GAME</button>    
    <History history={history} moveTo={moveTo} currentMove={currentMove}></History>
  </div>
  );
};
