import React from 'react';
import Field from './Field.js';
import NextFigure from './NextFigure.js';
import GameOver from './GameOver.js';
import Controllers from './Controllers.js';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import { tick, newGame } from '../redux/actions'

class Game extends React.Component {

  constructor() {
    super();
    this.state = {
      timeout: null
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.gameOver && this.props.gameOver !== prevProps.gameOver) {
      clearTimeout(this.state.timeout);
      this.setState({
         timeout: null,
      });
    }
  }

  start = () => {
    if (this.props.gameOver) {
      this.props.newGame();
      this.setState({
        timeout: setTimeout(this.next, this.props.speed),
      });
      return;
    }

    if (!this.state.timeout) {
      this.setState({
        timeout: setTimeout(this.next, this.props.speed),
      });
    }
  }

  pause = () => {
    clearTimeout(this.state.timeout);
    this.setState({
      timeout: null,
    });
  }

  next = () => {
    const { tick, speed } = this.props;
    tick();
    this.setState({
      timeout: setTimeout(this.next, speed),
    });
  }

  render() {

    return (
      <main>
        <div className='field-wrapper'>
          <Field/>
          <NextFigure/>
        </div>
        <Controllers
          start={ this.start }
          pause={ this.pause }
          disabledMoving={ !this.state.timeout }
        />
        <GameOver show={this.props.gameOver} />
      </main>
    );
  }
}

Game.propTypes = {
  tick: PropTypes.func,
  speed: PropTypes.number,
  gameOver: PropTypes.bool,
  newGame: PropTypes.func,
};

const mapStateToProps = (state) => ({
  speed: state.speed,
  gameOver: state.gameOver,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  tick, newGame,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Game);