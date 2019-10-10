// import { figures } from '../utils/figures';
import { addFiguteToField, newFigure, checkFilledRows, removeFilledRows, createEmptyField } from "../utils/utils";
import { VERTICAL, HORIZONTAL} from "../utils/constants";
// todo: to constants;

// TODO: disable actions on pause
// TODO: state: isTicking
// TODO: speed -> animation
// TODO: score
// TODO: state to localStorage

const initialField = createEmptyField();

const initialState = {
  field: JSON.parse(JSON.stringify(initialField)),
  animating: false,
  speed: 1000,
  figure: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'TICK': {
      console.log('tick');
      if (!!state.animating) {
        // animate disappearing row
        const newField = removeFilledRows(state.field, state.animating);

        return Object.assign({}, state, { field: newField, animating: false, figure: newFigure() });
      }

      if (state.figure) {

        // just move to bottom
        const current = {...state.figure};

        let forwardCellIsNotEmpty = false;

        if (current.coordinates.y + current.matrix.length < VERTICAL) {
          // check line below
          const lineBellow = [...state.field[current.coordinates.y + current.matrix.length]];
          const figureBottomCells = current.matrix[current.matrix.length - 1];
          const pairs = figureBottomCells.map((el, i) => {
            return [
              el,
              lineBellow[i + current.coordinates.x]
            ];
          });
          if (pairs.some((pair) => pair[0] + pair[1] === 2)) {
            console.log('pairs', pairs);
            forwardCellIsNotEmpty = true;
          }
        }

        if (current.coordinates.y + current.matrix.length === VERTICAL || forwardCellIsNotEmpty) {
          // add figure to field if bottom or cell's conflict

          const newField = addFiguteToField(current, state.field);
          const filledRows = checkFilledRows(newField);

          if (filledRows.some((filled) => filled)) {
            return Object.assign({}, state, { field: newField, animating: filledRows, figure: null });
          } else {
            return Object.assign({}, state, { field: newField, figure: newFigure() });
          }

        }

        current.coordinates.y++;
        return Object.assign({}, state, { figure: current });

      } else {
        // create new figure
        return Object.assign({}, state, { figure: newFigure() });
      }
    }

    case 'LEFT': {
      if (state.figure) {
        if (state.figure.coordinates.x === 0) {
          console.log('try to move over board');
          return state;
        }
        const current = {...state.figure};
        // check if possible
        current.coordinates.x--;
        return Object.assign({}, state, { figure: current });

      }
      return Object.assign({}, state);
    }

    case 'RIGHT': {
      if (state.figure) {
        if (state.figure.coordinates.x + state.figure.matrix[0].length === HORIZONTAL) {
          // TODO: matrix can have empty cells
          console.log('try to move over board');
          return state;
        }
        const current = {...state.figure};
        current.coordinates.x++;
        return Object.assign({}, state, { figure: current });

      }
      return Object.assign({}, state);
    }

    case 'ROTATE': {
      if (state.figure && state.figure.type !== 'Q') {
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
        current.matrix = rotated;
        return Object.assign({}, state, { figure: current });

      }
      return state;
    }

    case 'INCREASE_SPEED': {
      if (state.speed - 100 > 0) {
        return Object.assign({}, state, { speed: state.speed - 100 });
      }
      return state;
    }

    case 'DECREASE_SPEED': {
      return Object.assign({}, state, { speed: state.speed + 100 });
    }

    default:
      return state;
  }
}