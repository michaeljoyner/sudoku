import { getRelatedPositions } from "./sudokuBoardPositions";

function makeBoard(board) {
  return board
    .split("")
    .map(v => parseInt(v))
    .map(v => (v ? v : 0));
}

function positionTaken(board, position) {
  return board[position] !== 0;
}

function getPossibleValues(board, position) {
  if (positionTaken(board, position)) {
    return [];
  }

  const used = getRelatedPositions(position)
    .map(p => board[p])
    .filter(v => v !== 0);

  return [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(v => {
    return !used.includes(v);
  });
}

function addValue(board, value, position) {
  const new_board = board.map(i => i);
  new_board[position] = value;
  return new_board;
}

function clearPosition(board, position) {
  const new_board = board.map(i => i);
  new_board[position] = 0;
  return new_board;
}

function isValidMove(board, value, position) {
  const related_positions = getRelatedPositions(position);
  const used = related_positions.map(p => board[p]);
  return ![...new Set(used)].includes(value);
}

function isFull(board) {
  return board.length === 81 && !board.some(c => c === 0);
}

function isComplete(board) {
  if (!isFull(board)) {
    return false;
  }

  const rows = getRows(board);

  if (rows.some(row => !containsAllDigits(row))) {
    return false;
  }

  const cols = getColumns(board);

  if (cols.some(col => !containsAllDigits(col))) {
    return false;
  }

  const squares = getInnerSquares(board);
  if (squares.some(square => !containsAllDigits(square))) {
    return false;
  }

  return true;
}

function containsAllDigits(slice) {
  const all_digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  if (slice.length !== 9) {
    return false;
  }

  return !all_digits.some(digit => !slice.includes(digit));
}

function getRows(board) {
  const rows = [];
  let row = 0;

  while (row < 9) {
    rows.push(board.slice(row * 9, row * 9 + 9));
    row++;
  }

  return rows;
}

function getColumns(board) {
  const columns = [[], [], [], [], [], [], [], [], []];
  board.forEach((c, index) => {
    columns[index % 9].push(c);
  });

  return columns;
}

function getInnerSquares(board) {
  const square_positions = [
    [0, 1, 2, 9, 10, 11, 18, 19, 20],
    [3, 4, 5, 12, 13, 14, 21, 22, 23],
    [6, 7, 8, 15, 16, 17, 24, 25, 26],
    [27, 28, 29, 36, 37, 38, 45, 46, 47],
    [30, 31, 32, 39, 40, 41, 48, 49, 50],
    [33, 34, 35, 42, 43, 44, 51, 52, 53],
    [54, 55, 56, 63, 64, 65, 72, 73, 74],
    [57, 58, 59, 66, 67, 68, 75, 76, 77],
    [60, 61, 62, 69, 70, 71, 78, 79, 80]
  ];

  return square_positions.map(sq => {
    return sq.map(c => board[c]);
  });
}

function asDotNotation(board) {
  return board.map(c => (c === 0 ? "." : c)).join("");
}

export {
  getPossibleValues,
  makeBoard,
  addValue,
  clearPosition,
  isValidMove,
  isFull,
  isComplete,
  asDotNotation
};
