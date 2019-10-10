import React from 'react';
import '../styles/Square.css';

function Square({filled = false, animating = false}) {
  return (
    <div className={ `${filled ? 'filled' : 'empty'} square ${animating ? 'animation' : ''}` }>
      { filled && <div className={ `inner  ${animating ? 'inner-animation' : ''}` }/> }
    </div>
  );
}

export default Square;