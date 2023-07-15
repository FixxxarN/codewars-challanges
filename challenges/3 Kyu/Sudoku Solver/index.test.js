/*

Write a function that will solve a 9x9 Sudoku puzzle. The function will take one argument consisting of the 2D puzzle array, with the value 0 representing an unknown square.

The Sudokus tested against your function will be "easy" (i.e. determinable; there will be no need to assume and test possibilities on unknowns) and can be solved with a brute-force approach.

For Sudoku rules, see the Wikipedia article.

var puzzle = [
            [5,3,0,0,7,0,0,0,0],
            [6,0,0,1,9,5,0,0,0],
            [0,9,8,0,0,0,0,6,0],
            [8,0,0,0,6,0,0,0,3],
            [4,0,0,8,0,3,0,0,1],
            [7,0,0,0,2,0,0,0,6],
            [0,6,0,0,0,0,2,8,0],
            [0,0,0,4,1,9,0,0,5],
            [0,0,0,0,8,0,0,7,9]];

sudoku(puzzle);
/* Should return
[[5,3,4,6,7,8,9,1,2],
[6,7,2,1,9,5,3,4,8],
[1,9,8,3,4,2,5,6,7],
[8,5,9,7,6,1,4,2,3],
[4,2,6,8,5,3,7,9,1],
[7,1,3,9,2,4,8,5,6],
[9,6,1,5,3,7,2,8,4],
[2,8,7,4,1,9,6,3,5],
[3,4,5,2,8,6,1,7,9]] 

*/

const POSSIBLE_NUMBERS = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9
}

const checkForPossibleNumbersInARow = (row, puzzle) => {
  const possibleNumbers = { ...POSSIBLE_NUMBERS };
  for (let i = 0; i < puzzle[row].length; i++) {
    if (possibleNumbers[puzzle[row][i]]) delete possibleNumbers[puzzle[row][i]];
  }
  return Object.values(possibleNumbers);
}

const checkForPossibleNumbersInAColumn = (column, puzzle) => {
  const possibleNumbers = { ...POSSIBLE_NUMBERS };
  for (let i = 0; i < puzzle.length; i++) {
    if (possibleNumbers[puzzle[i][column]]) delete possibleNumbers[puzzle[i][column]];
  }
  return Object.values(possibleNumbers);
}

const checkForPossibleNumbersInASquare = (row, column, puzzle) => {
  const possibleNumbers = { ...POSSIBLE_NUMBERS };

  const minRow = Math.floor(row / 3) * 3;
  const minColumn = Math.floor(column / 3) * 3;

  const maxRow = minRow + 3;
  const maxColumn = minColumn + 3;

  for (let i = minRow; i < maxRow; i++) {
    for (let j = minColumn; j < maxColumn; j++) {
      if (possibleNumbers[puzzle[i][j]]) delete possibleNumbers[puzzle[i][j]];
    }
  }

  return Object.values(possibleNumbers);
}

const sudoku = (puzzle) => {
  const mapOfUnknownPlaces = {};

  for (let y = 0; y < puzzle.length; y++) {
    for (let x = 0; x < puzzle[y].length; x++) {
      if (!puzzle[y][x]) {
        mapOfUnknownPlaces[`${y},${x}`] = { y, x }
      }
    }
  }

  const arrOfUnknownPlaces = Object.values(mapOfUnknownPlaces);

  for (let i = 0; i < arrOfUnknownPlaces.length; i) {
    const possibleRow = checkForPossibleNumbersInARow(arrOfUnknownPlaces[i].y, puzzle);
    const possibleColumn = checkForPossibleNumbersInAColumn(arrOfUnknownPlaces[i].x, puzzle);
    const possibleSquare = checkForPossibleNumbersInASquare(arrOfUnknownPlaces[i].y, arrOfUnknownPlaces[i].x, puzzle);

    const mapOfPossible = {};
    const allPossibleNumbers = [...possibleRow, ...possibleColumn, ...possibleSquare];

    allPossibleNumbers.forEach((number) => {
      mapOfPossible[number] = mapOfPossible[number] + 1 || 1;
    });

    Object.entries(mapOfPossible).forEach(([key, value]) => {
      if (value < 3) delete mapOfPossible[key];
    });

    if (Object.keys(mapOfPossible).length === 1) {
      puzzle[arrOfUnknownPlaces[i].y][arrOfUnknownPlaces[i].x] = Number(Object.keys(mapOfPossible)[0]);
      delete mapOfUnknownPlaces[`${arrOfUnknownPlaces[i].y},${arrOfUnknownPlaces[i].x}`];

      i = 0;
    }
    else {
      i++;
    }
  }

  return puzzle;
}

describe('Soduku Solver', () => {
  it('should run', () => {
    const puzzle = [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9]];

    const solution = [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9]];

    const result = sudoku(puzzle);
    expect(result).toEqual(solution);
  });
});