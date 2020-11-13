import React,{useState} from 'react';
import Board from './components/Board';
import History from './components/History';
import { calculateWinner } from './components/helper';
import StatusMessage from './components/StatusMessage';
import './styles/root.scss';

export default () => {
  const [history,setHistory] = useState([{board: Array(9).fill(null),isXNext: true}]);
  const [currentMove, setCurrentMove] = useState(0);
  console.log(currentMove)
  const current = history[currentMove];
  console.log('history',history)
    const winner = calculateWinner(current.board);
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

  return (<div className="app">
    <h1>TicTocToe</h1>
    <StatusMessage winner={winner} current={current}></StatusMessage>    
    <Board board={current.board} handleSquareClick={handleSquareClick} />
    <History history={history} moveTo={moveTo} currentMove={currentMove}></History>
  </div>
  );
};
