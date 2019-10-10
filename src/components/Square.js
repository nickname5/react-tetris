import React from 'react';
import '../styles/Square.css';

function Square({filled = false, animating = false, speed}) {
  return (
    <div
      className={ `${filled ? 'filled' : 'empty'} square ${animating ? 'animation' : ''}` }
      style={ { animationDuration: `${+(speed / 1000).toFixed(2)}s` } }
    >
      { filled &&
        <div
          className={ `inner  ${animating ? 'inner-animation' : ''}` }
          style={ { animationDuration: `${+(speed / 1000).toFixed(2)}s` } }
        />
      }
    </div>
  );
}

export default Square;