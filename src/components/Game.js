import React from 'react';
import PropTypes from "prop-types";

class Game extends React.Component {

  constructor() {
    super();
    this.state = {
      timeout: null
    }
  }

  componentDidUpdate(prevProps) {
    console.log('game, gameover, prev, cur: ', prevProps.gameOver, this.props.gameOver);
    if (this.props.gameOver && this.props.gameOver !== prevProps.gameOver) {
      console.log('will be paused');
      setTimeout(() => {
        this.pause();
      }, 1);
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
      <>
        { this.props.render( {
            start: this.start,
            pause: this.pause,
            disabledMoving: !this.state.timeout,
        } ) }
      </>
    );
  }
}

Game.propTypes = {
  tick: PropTypes.func,
  speed: PropTypes.number,
  gameOver: PropTypes.bool,
  newGame: PropTypes.func,
  render: PropTypes.func,
};

export default Game;