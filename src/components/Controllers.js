import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Button from './Button';

class Controllers extends React.Component {

  keyPressHandler = (e) => {
    console.log(e);
  }

  // todo: add debounce/trottling to user actions

  render() {
    const { start, pause, left, right, rotate } = this.props;

    return (
      <div onKeyPress={ this.keyPressHandler }>
        <Button text="start" action={ start } />
        <Button text="pause" action={ pause } />
        <Button text="left" action={ left } />
        <Button text="right" action={ right } />
        <Button text="rotate" action={ rotate } />
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
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Controllers);