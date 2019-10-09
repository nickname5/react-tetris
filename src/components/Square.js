import React from 'react';
import '../styles/Square.css';

function Square({filled = false}) {
  return (
    <div className={ `${filled ? 'filled' : 'empty'} square` }/>
  );
}

export default Square;