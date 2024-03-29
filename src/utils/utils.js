import {figures} from "./figures";
import {HORIZONTAL, VERTICAL} from "./constants";

// tetris

export const addFiguteToField = (figure, field) => {
  const handledField = [...field.map((row) => [...row])];

  const { x, y } = figure.coordinates;

  figure.matrix.map((row, i) => {
    row.map((square, j) => {
      if (square) {
        handledField[y + i][x + j] = square;
      }
    })
  });

  return handledField;
};

export const checkFilledRows = (field) => {
  return field.map((row) => {
    return row.reduce((acc, el) => acc + el, 0) === HORIZONTAL;
  })
};

export const removeFilledRows = (field, filledRows) => {
  const notFilledRows = field.filter((row, i) => {
    return !filledRows[i];
  });

  while (notFilledRows.length < field.length) {
    const newRow = new Array(HORIZONTAL);
    newRow.fill(0);
    notFilledRows.unshift(newRow);
  }

  return notFilledRows;
};


export const newFigure = (type) => {
  let figure;

  if (!type) {
    figure = figures[Math.floor(Math.random() * 7)];
  } else {
    do {
      figure = figures[Math.floor(Math.random() * 7)];
    } while(figure.type === type);
  }

  figure.coordinates = {
    x: 4,
    y: 0,
  };

  return figure;
};

export const createEmptyField = (hor = HORIZONTAL, ver = VERTICAL) => {
  const row = new Array(hor);
  row.fill(0);
  const initialField = new Array(ver);
  initialField.fill(row);
  return initialField;
};

export const checkGameOver = (field) => {
  return field[0].some(el => !!el);
};

// snake

export const addSnakeToField = (field, snake) => {
  const handledField = [...field.map((row) => [...row])];

  snake.forEach((cell) => {
    const [y, x] = cell;
    handledField[y][x] = 1;
  });

  return handledField;
};

export const makeAppleCoordinates = (snake, hor, ver) => {
  const twoRandomCoord = () => [
    Math.floor(Math.random() * hor),
    Math.floor(Math.random() * ver),
  ];

  const check = (X, Y) => {
    let isInSnake = false;

    snake.forEach((cell) => {
      const [y, x] = cell;
      if (y === Y && x === X) {
        isInSnake = true;
      }
    });

    return isInSnake
  };

  let [X, Y] = twoRandomCoord();

  let appleInSnake = check(X, Y);

  while (appleInSnake) {
    [X, Y] = twoRandomCoord();
    appleInSnake = check(X, Y);
  }

  return [Y, X];
};

