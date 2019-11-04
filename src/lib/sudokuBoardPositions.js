const innerSquares = [
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

function getRestOfColumn(position) {
  return Array(81)
    .fill(0)
    .map((_, index) => index)
    .filter(p => {
      return p % 9 === position % 9;
    })
    .filter(v => v !== position);
}

function getRestOfRow(position) {
  const start = position - (position % 9);

  return Array(9)
    .fill(start)
    .map((v, index) => v + index)
    .filter(v => v !== position);
}

function getRestOfInnerSquare(position) {
  return innerSquares
    .find(sq => sq.includes(position))
    .filter(v => v !== position);
}

function getRelatedPositions(position) {
  const all_positions = [
    ...getRestOfRow(position),
    ...getRestOfColumn(position),
    ...getRestOfInnerSquare(position)
  ];

  return [...new Set(all_positions)];
}

export {
  getRestOfRow,
  getRestOfColumn,
  getRestOfInnerSquare,
  getRelatedPositions
};
