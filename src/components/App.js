import React from 'react';
import '../styles/App.css';
import Tetris from '../tetris/components/Tetris';
import Games from './Games.js';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Games}/>
          <Route path="/tetris" exact component={Tetris}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
