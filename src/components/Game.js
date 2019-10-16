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