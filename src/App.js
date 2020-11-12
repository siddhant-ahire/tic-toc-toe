import React,{useState} from 'react';
import Board from './components/Board';
import { calculateWinner } from './components/helper';
import './styles/root.scss';

export default () => {
  const [board,setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(false);
    console.log(board);
    const winner = calculateWinner(board);
    console.log(winner);
    const message = winner ? `winner is ${winner}`: `next player is ${isXNext?'X':'O'}`;
    const handleSquareClick = (position) => {
        if(board[position] || winner){
            return;
        }
        setBoard(prev =>{
            return prev.map((value,pos)=>{
                console.log(pos,value);
                if(pos === position){
                    return isXNext?'X':'O';
                }
                return value;
            });
        });
        setIsXNext(prev => !prev);
    }
  return (<div className="app">
    <h1>TicTocToe</h1>
    <h3>{message}</h3>
    <Board board={board} handleSquareClick={handleSquareClick} />
  </div>
  );
};
