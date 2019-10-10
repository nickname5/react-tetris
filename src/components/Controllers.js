import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Button from './Button';
import { tick, left, right, rotate, speedUp, speedDown } from '../redux/actions'

class Controllers extends React.Component {

  keyPressHandler = (e) => {
    console.log(e);
    // todo
  }

  // todo: add debounce/throttling to user actions

  render() {
    const { start, pause, left, right, rotate, tick, speed, score, speedUp, speedDown } = this.props;

    return (
      <>
        <div onKeyPress={ this.keyPressHandler }>
          <Button text="start" action={ start }/>
          <Button text="pause" action={ pause }/>
          <Button text="left" action={ left } />
          <Button text="right" action={ right }/>
          <Button text="down" action={ tick } />
          <Button text="rotate" action={ rotate }/>
          <Button text="speed up" action={ speedUp }/>
          <Button text="speed down" action={ speedDown }/>
        </div>
        <div>
          <div>speed: { speed }</div>
          <div>score: { score }</div>
        </div>
      </>
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
};

const mapStateToProps = (state) => ({
  speed: state.speed,
  score: state.score,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  left,
  right,
  rotate,
  tick, speedUp, speedDown,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Controllers);