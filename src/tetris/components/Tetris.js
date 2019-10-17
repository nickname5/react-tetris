import React from 'react';
import Field from '../../components/Field.js';
import NextFigure from './NextFigure.js';
import GameOver from '../../components/GameOver.js';
import Game from '../../components/Game.js';
import Controllers from './Controllers.js';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import { tick, newGame } from '../actions/actions';
import { Link } from 'react-router-dom';
import { addFiguteToField } from "../../utils/utils";

class Tetris extends React.Component {

  render() {
    const { tick, speed, newGame, gameOver, animating, field, figure } = this.props;

    let handledField;

    if (figure) {
      handledField = addFiguteToField(figure, field);
    } else {
      handledField = field;
    }

    return (
      <>
        <Link to="/">All games</Link>
        <Game
          tick={ tick }
          speed={ speed }
          newGame={ newGame }
          gameOver={ gameOver }
          render={ ({ start, pause, disabledMoving }) => (
            <main>
              <div className='field-wrapper'>
                <Field
                  field={ handledField }
                  animating={ animating }
                  speed={ speed }
                  classname="tetris-field"
                />
                <NextFigure/>
              </div>
              <Controllers
                start={ start }
                pause={ pause }
                disabledMoving={ disabledMoving }
              />
              <GameOver show={ gameOver } />
            </main>
          ) }
        />
      </>
    );
  }
}

Tetris.propTypes = {
  tick: PropTypes.func,
  speed: PropTypes.number,
  gameOver: PropTypes.bool,
  newGame: PropTypes.func,
  field: PropTypes.array.isRequired,
  figure: PropTypes.object,
  animating: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
};

const mapStateToProps = (state) => ({
  speed: state.tetris.speed,
  gameOver: state.tetris.gameOver,
  field: state.tetris.field,
  figure: state.tetris.figure,
  animating: state.tetris.animating,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  tick, newGame,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Tetris);