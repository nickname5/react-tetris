const receiveDepartments = (departments) => ({
  type: 'RECEIVE_DEPARTMENTS',
  payload: departments
});

const tick_ = () => ({
  type: 'TICK'
});

export const tick = () => (dispatch) => {
  dispatch(tick_());
};

export const left = () => (dispatch) => {
  dispatch({ type: 'LEFT' });
};

export const right = () => (dispatch) => {
  dispatch({ type: 'RIGHT' });
};

export const rotate = () => (dispatch) => {
  dispatch({ type: 'ROTATE' });
};