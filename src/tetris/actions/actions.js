import {
  TICK, LEFT, DECREASE_SPEED, INCREASE_SPEED, NEW_GAME, RIGHT, ROTATE, SAVE
} from "../constants/constants";

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

export const rotate = () => (dispatch) => {
  dispatch({ type: ROTATE });
};

export const speedUp = () => (dispatch) => {
  dispatch({ type: INCREASE_SPEED });
};

export const speedDown = () => (dispatch) => {
  dispatch({ type: DECREASE_SPEED });
};

export const save = () => (dispatch) => {
  dispatch({ type: SAVE });
};

export const newGame = () => (dispatch) => {
  dispatch({ type: NEW_GAME });
};