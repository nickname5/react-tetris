import React from 'react';
import '../styles/Square.css';

function Button({text, action}) {
  return (
    <button className="button" onClick={ action }>
      { text }
    </button>
  );
}

export default Button;