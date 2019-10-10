import {figures} from "./figures";
import {HORIZONTAL, VERTICAL} from "./constants";

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

// export const deleteFilledRows = (field) => {
//   const notFilledRows = field.filter((row) => {
//     return row.reduce((acc, el) => acc + el, 0) !== HORIZONTAL;
//   });
//
//   while (notFilledRows.length < field.length) {
//     const newRow = new Array(HORIZONTAL);
//     newRow.fill(0);
//     notFilledRows.unshift(newRow);
//   }
//
//   return notFilledRows;
// };

export const newFigure = () => {
  const current = figures[Math.floor(Math.random() * 7)];
  current.coordinates = {
    x: 4,
    y: 0,
  };
  return current;
};

export const createEmptyField = () => {
  const row = new Array(HORIZONTAL);
  row.fill(0);
  const initialField = new Array(VERTICAL);
  initialField.fill(row);
  return initialField;
};

