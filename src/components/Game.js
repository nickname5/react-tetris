import React from 'react';
import Field from './Field.js';
import Controllers from './Controllers.js';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import { tick } from '../redux/actions'

class Game extends React.Component {
  timeout = null;

  start = () => {
    if (!this.timeout) {
      this.timeout = setTimeout(this.next, this.props.speed);
    }
  }

  pause = () => {
    clearTimeout(this.timeout);
    this.timeout = null;
  }

  next = () => {
    const { tick, speed } = this.props;
    tick();
    this.timeout = setTimeout(this.next, speed);
  }

  render() {
    const { left, right, rotate, tick } = this.props;

    return (
      <main>
        <Field/>
        <Controllers
          start={ this.start }
          pause={ this.pause }
        />
      </main>
    );
  }
}

Game.propTypes = {
  tick: PropTypes.func,
  speed: PropTypes.number,
};

const mapStateToProps = (state) => ({
  speed: state.speed,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  tick,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Game);