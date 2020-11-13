import React, { Children } from 'react';

const Square = ({value,onClick,isWinningSquare}) => {
    return (
    <button type="button" 
        className="square" 
        onClick={onClick} 
        style={{
            fontWeight:isWinningSquare? `bold`:  `normal`,
            color:isWinningSquare?'red': 'black'
        }}
    >{value}</button>
    )
}

export default Square;
