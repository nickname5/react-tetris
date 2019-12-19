import yallist from 'yallist';

import {
  createEmptyField,
  makeAppleCoordinates,
} from "../utils/utils";
import {
  VERTICAL, HORIZONTAL,
  TICK, LEFT, UP, DOWN, NEW_GAME, RIGHT, SAVE,
  DECREASE_SPEED, INCREASE_SPEED
} from "./constants";

const savedState = localStorage.getItem('snake');
const defaultSnake = yallist.create([[9, 8], [9, 9], [9, 10]]);

const initialField = createEmptyField(HORIZONTAL, VERTICAL);
const defaultState = {
  field: JSON.parse(JSON.stringify(initialField)),
  direction: 'right',
  // directionQueue: [],
  snake: defaultSnake,
  apple: makeAppleCoordinates(defaultSnake, HORIZONTAL, VERTICAL),
  speed: 180,
  score: 0,
  gameOver: false,
};

const initialState = savedState ? JSON.parse(savedState) : defaultState;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TICK: {

      // move
      const snakeArr = [...state.snake.toArray().map(el => [...el])];
      const newSnake = yallist.create(snakeArr);
      const movedCell = [...newSnake.tail.value];

      // todo: check if movedCell in snake

      // let direction = state.directionStack.length !== 0 ?
      //   state.directionStack[state.directionStack.length - 1] :
      //   state.direction;

      switch (state.direction) {
        case 'right': {
          movedCell[1]++;
          if (movedCell[1] === HORIZONTAL) {
            return Object.assign({}, state, { gameOver: true, });
          }
          break;
        }
        case 'left': {
          movedCell[1]--;
          if (movedCell[1] === -1) {
            return Object.assign({}, state, { gameOver: true });
          }
          break;
        }
        case 'down': {
          movedCell[0]++;
          console.log(movedCell);
          if (movedCell[0] === VERTICAL) {
            return Object.assign({}, state, { gameOver: true });
          }
          break;
        }
        case 'up': {
          movedCell[0]--;
          if (movedCell[0] === -1) {
            return Object.assign({}, state, { gameOver: true });
          }
          break;
        }
      }

      if (snakeArr.some((cell) => {
        const [y, x] = cell;
        console.log(y, x, movedCell[0], movedCell[1]);
        return movedCell[0] === y && movedCell[1] === x;
      })) {
        return Object.assign({}, state, { gameOver: true });
      }

      if (movedCell[0] === state.apple[0] && movedCell[1] === state.apple[1]) {
        newSnake.push(movedCell);
        return Object.assign({}, state, {
          snake: newSnake,
          apple: makeAppleCoordinates(newSnake, HORIZONTAL, VERTICAL),
          score: state.score + 1,
          // directionStack: [],
          // direction: direction,
        });
      }

      newSnake.shift();
      newSnake.push(movedCell);
      return Object.assign({}, state, {
        snake: newSnake,
        // directionStack: [],
        // direction: direction,
      });

      // return Object.assign({}, state);
    }

    case UP: {
      if (state.direction === 'down' || state.direction === 'up') {
        return state
      }
      const newDirStack = [...state.directionStack];
      newDirStack.push('up');
      return Object.assign({}, state, { direction: 'up' });
      // return Object.assign({}, state, { directionStack: newDirStack });
    }

    case DOWN: {
      if (state.direction === 'up' || state.direction === 'down') {
        return state
      }
      const newDirStack = [...state.directionStack];
      newDirStack.push('down');
      return Object.assign({}, state, { direction: 'down' });
      // return Object.assign({}, state, { directionStack: newDirStack });
    }

    case LEFT: {
      if (state.direction === 'right' || state.direction === 'left') {
        return state
      }
      const newDirStack = [...state.directionStack];
      newDirStack.push('left');
      return Object.assign({}, state, { direction: 'left' });
      // return Object.assign({}, state, { directionStack: newDirStack });
    }

    case RIGHT: {
      if (state.direction === 'left' || state.direction === 'right') {
        return state
      }
      const newDirStack = [...state.directionStack];
      newDirStack.push('right');
      return Object.assign({}, state, { direction: 'right' });
      // return Object.assign({}, state, { directionStack: newDirStack });
    }

    case SAVE: {
      localStorage.setItem('snake', JSON.stringify(state));
      return state;
    }

    case NEW_GAME: {
      return Object.assign({}, defaultState);
    }

    case INCREASE_SPEED: {
      if (state.speed - 20 > 0) {
        return Object.assign({}, state, { speed: state.speed - 20 });
      }
      return state;
    }

    case DECREASE_SPEED: {
      return Object.assign({}, state, { speed: state.speed + 20 });
    }

    default:
      return state;
  }
}