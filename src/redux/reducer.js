// import { figures } from '../utils/figures';
import {
  addFiguteToField,
  newFigure,
} from "../utils/utils";

const VERTICAL = 20;
const HORIZONTAL = 11;
const row = new Array(HORIZONTAL);
row.fill(0);
const initialField = new Array(VERTICAL);
initialField.fill(row);


// TODO: disable actions on pause
// TODO: state: isTicking

const initialState = {
  field: JSON.parse(JSON.stringify(initialField)),
  speed: 500,
  figure: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'TICK': {
      console.log('tick');



      if (state.figure) {

        // just move to bottom
        const current = {...state.figure};


        if (current.coordinates.y + current.matrix.length === VERTICAL) {
          console.log('-Днище', current.coordinates.y + current.matrix.length === VERTICAL);
          const newField = addFiguteToField(current, state.field);
          return Object.assign({}, state, { field: newField, figure: newFigure() });
        }

        // TODO: check field bellow
        // const lineBellow = [...state.field[current.coordinates.y + 1 + current.matrix.length]];
        // if (state.field[current.coordinates.y + 1 + current.matrix.length]) {
        //
        // }

        current.coordinates.y++;
        return Object.assign({}, state, { figure: current });

      } else {
        // create new figure
        return Object.assign({}, state, { figure: newFigure() });
      }
      // return Object.assign({}, state);
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

    default:
      return state;
  }
}