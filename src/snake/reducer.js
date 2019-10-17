import yallist, {Yallist} from 'yallist';

import {
  createEmptyField,
  makeAppleCoordinates,
} from "../utils/utils";
import {
  VERTICAL, HORIZONTAL,
  TICK, LEFT, UP, DOWN, NEW_GAME, RIGHT, SAVE
} from "./constants";

const savedState = localStorage.getItem('snake');
const defaultSnake = yallist.create([[9, 8], [9, 9], [9, 10]]);

const initialField = createEmptyField(HORIZONTAL, VERTICAL);
const defaultState = {
  field: JSON.parse(JSON.stringify(initialField)),
  direction: 'right',
  snake: defaultSnake,
  apple: makeAppleCoordinates(defaultSnake, HORIZONTAL, VERTICAL),
  speed: 1000,
  score: 0,
  gameOver: false,
};

const initialState = savedState ? JSON.parse(savedState) : defaultState;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TICK: {
      console.log('tick');

      // move
      const newSnake = Yallist.create(state.snake.toArray());
      const newHead = [...newSnake.head];
      console.log('new head: ', newHead);
      switch (state.direction) {
        case 'right': {
          newSnake.shift();
          newHead[2]++;
          newSnake.push(newHead);
        }
        case 'left': {

        }
        case 'down': {

        }
        case 'up': {

        }
      }
      return Object.assign({}, state, { snake: newSnake });

      // return Object.assign({}, state);
    }

    case UP: {
      return Object.assign({}, state);
    }

    case DOWN: {
      return Object.assign({}, state);
    }

    case LEFT: {
      return Object.assign({}, state);
    }

    case RIGHT: {
      return Object.assign({}, state);
    }

    case SAVE: {
      localStorage.setItem('snake', JSON.stringify(state));
      return state;
    }

    case NEW_GAME: {
      return Object.assign({}, defaultState);
    }

    default:
      return state;
  }
}