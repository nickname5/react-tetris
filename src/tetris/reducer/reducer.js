import {
  addFiguteToField,
  newFigure,
  checkFilledRows,
  removeFilledRows,
  createEmptyField,
  checkGameOver
} from "../../utils/utils";
import {
  VERTICAL, HORIZONTAL,
  TICK, LEFT, DECREASE_SPEED, INCREASE_SPEED, NEW_GAME, RIGHT, ROTATE, SAVE
} from "../constants/constants";

// TODO: state to localStorage
const savedState = localStorage.getItem('tetris');

const initialField = createEmptyField();
const defaultState = {
  field: JSON.parse(JSON.stringify(initialField)),
  animating: false,
  speed: 1000,
  figure: null,
  score: 0,
  nextFigure: null, // todo: when migrate to immutable?
  gameOver: false,
};

const initialState = savedState ? JSON.parse(savedState) : defaultState;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TICK: {
      console.log('tick');
      if (!!state.animating) {
        // animate disappearing row
        const newField = removeFilledRows(state.field, state.animating);
        const toScore = state.animating.reduce((acc, el) => acc + el, 0);

        return Object.assign({}, state, {
          field: newField,
          animating: false,
          figure: {...state.nextFigure},
          nextFigure: newFigure(state.nextFigure.type),
          score: state.score + toScore
        });
      }

      if (state.figure) {
        const current = {...state.figure};

        let forwardCellIsNotEmpty = false;

        if (current.coordinates.y + current.matrix.length < VERTICAL) {
          // check below cells
          const bottomEdge = current.matrix[0].map((el, x) => {
            let bottomFilledIndex;
            for (let y = current.matrix.length - 1; y >= 0; y--) {
              if (!!current.matrix[y][x]) {
                bottomFilledIndex = y;
                break;
              }
            }
            return bottomFilledIndex;
          });

          forwardCellIsNotEmpty = bottomEdge.some((y, x) => {
            return state.field[y + current.coordinates.y + 1][x + current.coordinates.x] !== 0;
          });
        }

        if (current.coordinates.y + current.matrix.length === VERTICAL || forwardCellIsNotEmpty) {
          // add figure to field if bottom or cell's conflict

          const newField = addFiguteToField(current, state.field);
          const gameOver = checkGameOver(newField);

          if (gameOver) {
            return Object.assign({}, state, { gameOver: true });
          }

          const filledRows = checkFilledRows(newField);

          if (filledRows.some((filled) => filled)) {
            return Object.assign({}, state, { field: newField, animating: filledRows, figure: null });
          } else {
            return Object.assign({}, state, { field: newField, figure: { ...state.nextFigure }, nextFigure: newFigure(state.nextFigure.type) });
          }

        }

        // just move to bottom
        current.coordinates.y++;
        return Object.assign({}, state, { figure: current });

      } else {
        // create new figure
        const newFig = newFigure();
        return Object.assign({}, state, { figure: newFig, nextFigure: newFigure(newFig.type) });
      }
    }

    case LEFT: {
      if (state.figure) {
        if (state.figure.coordinates.x === 0) {
          console.log('try to move over board');
          return state;
        }

        const leftEdge = state.figure.matrix.map((row) => {
          let firstFilledIndex;
          for (let j = 0; j < row.length; j++) {
            if (!!row[j]) {
              firstFilledIndex = j;
              break;
            }
          }
          return firstFilledIndex + state.figure.coordinates.x;
        });

        if (leftEdge.some((x, i) => state.field[state.figure.coordinates.y + i][x - 1])) {
          console.log('prevent because left cells are not empty');
          return state;
        }

        const current = {...state.figure};
        current.coordinates.x--;
        return Object.assign({}, state, { figure: current });

      }
      return Object.assign({}, state);
    }

    case RIGHT: {
      if (state.figure) {
        if (state.figure.coordinates.x + state.figure.matrix[0].length === HORIZONTAL) {
          console.log('try to move over board');
          return state;
        }

        const rightEdge = state.figure.matrix.map((row) => {
          let lastFilledIndex;
          for (let j = row.length; j >= 0; j--) {
            if (!!row[j]) {
              lastFilledIndex = j;
              break;
            }
          }
          return lastFilledIndex + state.figure.coordinates.x;
        });

        if (rightEdge.some((x, i) => state.field[state.figure.coordinates.y + i][x + 1])) {
          console.log('prevent because right cells are not empty');
          return state;
        }
        const current = {...state.figure};
        current.coordinates.x++;
        return Object.assign({}, state, { figure: current });

      }
      return Object.assign({}, state);
    }

    case ROTATE: {
      if (state.figure && state.figure.type !== 'Q') {
        // todo: rotating "I" around the center
        const current = {...state.figure};
        const rotated = [];
        for (let i = 0; i < current.matrix[0].length; i++) {
          const row = [];
          for (let j = current.matrix.length - 1; j >= 0; j--) {
            row.push(current.matrix[j][i]);
          }
          rotated.push(row);
        }
        if (rotated[0].length + current.coordinates.x > HORIZONTAL) {
          return state;
        }
        // check if rotated figure doesn't conflict with filled field cells
        const conflictMatrix = rotated.map((row, y) => {
          return row.map((rotCell, x) => {
            return state.field[y + current.coordinates.y][x + current.coordinates.x] + rotCell === 2;
          });
        });

        if (conflictMatrix.flat().some(el => el)) {
          console.log('conflict, conflict matrix: ', conflictMatrix);
          return state;
        }

        current.matrix = rotated;
        return Object.assign({}, state, { figure: current });

      }
      return state;
    }

    case INCREASE_SPEED: {
      if (state.speed - 100 > 0) {
        return Object.assign({}, state, { speed: state.speed - 100 });
      }
      return state;
    }

    case DECREASE_SPEED: {
      return Object.assign({}, state, { speed: state.speed + 100 });
    }

    case SAVE: {
      localStorage.setItem('tetris', JSON.stringify(state));
      return state;
    }

    case NEW_GAME: {
      return Object.assign({}, defaultState);
    }

    default:
      return state;
  }
}