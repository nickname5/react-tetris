import React from 'react';

function GameOver({show = false}) {
  return show ? (
    <div className="game-over">
      GAME OVER
    </div>
  ) : (<></>);
}

export default GameOver;