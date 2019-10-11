import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Button from './Button';
import { tick, left, right, rotate, speedUp, speedDown, save } from '../redux/actions'

class Controllers extends React.Component {

  keyPressHandler = (event) => {
    // console.log(event.key, !!event.key, event.key === ' ', event.key === '');
    const { left, right, rotate, tick, pause, animating, disabledMoving } = this.props;
    if (disabledMoving) {
      return;
    }
    if (event.key === 'ArrowUp') {
      // console.log('up');
      rotate();
    }
    if (event.key === 'ArrowDown' && !animating) {
      // console.log('down');
      tick();
    }
    if (event.key === 'ArrowLeft') {
      // console.log('left');
      left();
    }
    if (event.key === 'ArrowRight') {
      // console.log('right');
      right();
    }
    if (event.key === ' ') {
      console.log('space bar, pause');
      pause(); // ?????????????? todo
    }
  }

  moveActionWrapper = (action) => () => {
    const { disabledMoving } = this.props;
    if (disabledMoving) {
      return;
    }
    action();
  }

  // todo: add debounce/throttling to user actions

  render() {
    const { start, pause, left, right, rotate, tick, speed, score, speedUp, speedDown, save } = this.props;

    return (
      <div className="controllers">
        <div onKeyDown={ this.keyPressHandler } tabIndex="0">
          <Button text="start" action={ start }/>
          <Button text="pause" action={ pause }/>
          <Button text="left" action={ this.moveActionWrapper(left) } />
          <Button text="right" action={ this.moveActionWrapper(right) }/>
          <Button text="down" action={ this.moveActionWrapper(tick) } />
          <Button text="rotate" action={ this.moveActionWrapper(rotate) }/>
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
  rotate: PropTypes.func,
  tick: PropTypes.func,
  speedUp: PropTypes.func,
  speedDown: PropTypes.func,
  save: PropTypes.func,
  animating: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  speed: PropTypes.number,
  score: PropTypes.number,
  disabledMoving: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  speed: state.speed,
  score: state.score,
  animating: state.animating,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  left,
  right,
  rotate, save,
  tick, speedUp, speedDown,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Controllers);