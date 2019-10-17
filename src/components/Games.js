import React from 'react';

import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Link to="/tetris">Tetris</Link>
      <Link to="/snake">Snake</Link>
    </div>
  );
}

export default App;
