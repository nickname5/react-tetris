import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Button from '../../components/Button';
import { left, right, up, down, save, speedUp, speedDown } from '../actions'

class Controllers extends React.Component {

  keyPressHandler = (event) => {
    // console.log(event.key, !!event.key, event.key === ' ', event.key === '');
    const { left, right, down, up, disabledMoving } = this.props;
    if (disabledMoving) {
      return;
    }
    if (event.key === 'ArrowUp') {
      // console.log('up');
      up();
    }
    if (event.key === 'ArrowDown') {
      // console.log('down');
      down();
    }
    if (event.key === 'ArrowLeft') {
      // console.log('left');
      left();
    }
    if (event.key === 'ArrowRight') {
      // console.log('right');
      right();
    }
    // if (event.key === ' ') {
    //   console.log('space bar, pause');
    //   pause();
    // }
  }

  moveActionWrapper = (action) => () => {
    const { disabledMoving } = this.props;
    if (disabledMoving) {
      return;
    }
    action();
  }

  render() {
    const { start, pause, left, right, up, down, speed, score, save, speedUp, speedDown } = this.props;

    return (
      <div className="controllers">
        <div onKeyDown={ this.keyPressHandler } tabIndex="0">
          <Button text="start" action={ start }/>
          <Button text="pause" action={ pause }/>
          <Button text="left" action={ this.moveActionWrapper(left) } />
          <Button text="right" action={ this.moveActionWrapper(right) }/>
          <Button text="up" action={ this.moveActionWrapper(up) } />
          <Button text="down" action={ this.moveActionWrapper(down) }/>
          <Button text="speed up" action={ speedUp }/>
          <Button text="speed down" action={ speedDown }/>
          <Button text="save" action={ save }/>
        </div>
        <div>
          <div>speed: { speed }</div>
          <div>score: { score }</div>
        </div>
      </div>
    );
  }
}

Controllers.propTypes = {
  start: PropTypes.func,
  pause: PropTypes.func,
  left: PropTypes.func,
  right: PropTypes.func,
  up: PropTypes.func,
  down: PropTypes.func,
  speedUp: PropTypes.func,
  speedDown: PropTypes.func,
  save: PropTypes.func,
  // animating: PropTypes.oneOfType([
  //   PropTypes.bool,
  //   PropTypes.array,
  // ]),
  speed: PropTypes.number,
  score: PropTypes.number,
  // disabledMoving: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  speed: state.snake.speed,
  score: state.snake.score,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  left, right, up, down, save,
  speedUp, speedDown,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Controllers);