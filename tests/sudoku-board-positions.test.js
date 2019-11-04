import {
  getRestOfColumn,
  getRestOfRow,
  getRestOfInnerSquare,
  getRelatedPositions
} from "../src/lib/sudokuBoardPositions";

test("gets rest of column", () => {
  const cases = [
    {
      position: 39,
      expected: [3, 12, 21, 30, 48, 57, 66, 75]
    },
    {
      position: 9,
      expected: [0, 18, 27, 36, 45, 54, 63, 72]
    },
    {
      position: 77,
      expected: [5, 14, 23, 32, 41, 50, 59, 68]
    }
  ];

  cases.forEach(({ position, expected }) => {
    expect(getRestOfColumn(position)).toEqual(expected);
  });
});

test("gets rest of row", () => {
  const cases = [
    {
      position: 18,
      expected: [19, 20, 21, 22, 23, 24, 25, 26]
    },
    {
      position: 49,
      expected: [45, 46, 47, 48, 50, 51, 52, 53]
    },
    {
      position: 62,
      expected: [54, 55, 56, 57, 58, 59, 60, 61]
    }
  ];

  cases.forEach(({ position, expected }) => {
    expect(getRestOfRow(position)).toEqual(expected);
  });
});

test("gets rest of inner square", () => {
  const cases = [
    {
      position: 9,
      expected: [0, 1, 2, 10, 11, 18, 19, 20]
    },
    {
      position: 23,
      expected: [3, 4, 5, 12, 13, 14, 21, 22]
    },
    {
      position: 30,
      expected: [31, 32, 39, 40, 41, 48, 49, 50]
    },
    {
      position: 70,
      expected: [60, 61, 62, 69, 71, 78, 79, 80]
    }
  ];
  cases.forEach(({ position, expected }) => {
    expect(getRestOfInnerSquare(position)).toEqual(expected);
  });
});

test("it gets all related positions", () => {
  const cases = [
    {
      position: 33,
      expected: [
        6,
        15,
        24,
        42,
        51,
        60,
        69,
        78,
        27,
        28,
        29,
        30,
        31,
        32,
        34,
        35,
        43,
        44,
        52,
        53
      ]
    },
    {
      position: 40,
      expected: [
        4,
        13,
        22,
        31,
        49,
        58,
        67,
        76,
        36,
        37,
        38,
        39,
        41,
        42,
        43,
        44,
        30,
        32,
        48,
        50
      ]
    },
    ,
    {
      position: 72,
      expected: [
        0,
        9,
        18,
        27,
        36,
        45,
        54,
        63,
        73,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        55,
        56,
        64,
        65
      ]
    }
  ];

  cases.forEach(({ position, expected }) => {
    expect(getRelatedPositions(position).sort((a, b) => a - b)).toEqual(
      expected.sort((a, b) => a - b)
    );
  });
});
