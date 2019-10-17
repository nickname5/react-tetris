import React from 'react';
import Field from '../../components/Field.js';
import Game from '../../components/Game.js';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import { tick, newGame } from '../actions';
import { Link } from 'react-router-dom';
import {addSnakeToField} from "../../utils/utils";
import Controllers from "./Controllers";
import GameOver from "../../components/GameOver";
// import {HORIZONTAL, VERTICAL} from "../constants";

class Snake extends React.Component {

  render() {
    const { tick, speed, newGame, gameOver, apple, field, snake } = this.props;

    let handledField;

    if (snake) {
      handledField = addSnakeToField(field, snake);
    } else {
      handledField = field;
    }

    if (apple) {
      const [y, x] = apple;
      handledField[y][x] = 1;
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
                  // animating={ animating }
                  speed={ speed }
                />
              </div>
              <Controllers
                start={ start }
                pause={ pause }
                // disabledMoving={ disabledMoving }
              />
              <GameOver show={ gameOver } />
            </main>
          ) }
        />
      </>
    );
  }
}

Snake.propTypes = {
  tick: PropTypes.func,
  // speed: PropTypes.number,
  gameOver: PropTypes.bool,
  newGame: PropTypes.func,
  field: PropTypes.array.isRequired,
  snake: PropTypes.object,
  // animating: PropTypes.oneOfType([
  //   PropTypes.bool,
  //   PropTypes.array,
  // ]),
};

const mapStateToProps = (state) => ({
  field: state.snake.field,
  direction: state.snake.direction,
  snake: state.snake.snake,
  speed: state.snake.speed,
  apple: state.snake.apple,
  gameOver: state.snake.gameOver,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  tick, newGame,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Snake);