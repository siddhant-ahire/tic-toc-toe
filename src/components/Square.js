import React, { Children } from 'react';

const Square = ({value,onClick}) => {
    return (
    <button type="button" className="square" onClick={onClick}>{value}</button>
    )
}

export default Square;