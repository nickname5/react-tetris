import {
  TICK, LEFT, UP, DOWN, NEW_GAME, RIGHT, SAVE, DECREASE_SPEED, INCREASE_SPEED
} from "./constants";

const tick_ = () => ({
  type: TICK
});

export const tick = () => (dispatch) => {
  dispatch(tick_());
};

export const left = () => (dispatch) => {
  dispatch({ type: LEFT });
};

export const right = () => (dispatch) => {
  dispatch({ type: RIGHT });
};

export const up = () => (dispatch) => {
  dispatch({ type: UP });
};

export const down = () => (dispatch) => {
  dispatch({ type: DOWN });
};

export const save = () => (dispatch) => {
  dispatch({ type: SAVE });
};

export const newGame = () => (dispatch) => {
  dispatch({ type: NEW_GAME });
};

export const speedUp = () => (dispatch) => {
  dispatch({ type: INCREASE_SPEED });
};

export const speedDown = () => (dispatch) => {
  dispatch({ type: DECREASE_SPEED });
};