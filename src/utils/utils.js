import {figures} from "./figures";

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

export const newFigure = () => {
  const current = figures[Math.floor(Math.random() * 7)];
  current.coordinates = {
    x: 4,
    y: 0,
  };
  return current;
}

