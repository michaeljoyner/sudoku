import {
  clearPosition,
  addValue,
  getPossibleValues,
  makeBoard,
  isValidMove,
  isFull,
  isComplete,
  asDotNotation
} from "../src/lib/sudokuBoard";

test("it makes a new board from dot notation", () => {
  const dotted =
    "2.............62....1....7...6..8...3...9...7...6..4...4....8....52.............3";
  const expected = dotted
    .split("")
    .map(v => parseInt(v))
    .map(v => (v ? v : 0));

  expect(makeBoard(dotted)).toEqual(expected);
});

test("it shows allowed values for a position", () => {
  const cases = [
    {
      board: makeBoard(
        "2.............62....1....7...6..8...3...9...7...6..4...4....8....52.............3"
      ),
      position: 1,
      expected: [3, 5, 6, 7, 8, 9]
    },
    {
      board: makeBoard(
        "2.............62....1....7...6..8...3...9...7...6..4...4....8....52.............3"
      ),
      position: 14,
      expected: []
    },
    {
      board: makeBoard(
        "2.............62....1....7...6..8...3...9...7...6..4...4....8....52.............3"
      ),
      position: 64,
      expected: [1, 3, 6, 7, 8, 9]
    }
  ];

  cases.forEach(({ board, position, expected }) => {
    expect(getPossibleValues(board, position).sort()).toEqual(expected.sort());
  });
});

test("add a value to the board", () => {
  const board = makeBoard(
    "2.............62....1....7...6..8...3...9...7...6..4...4....8....52.............3"
  );

  const expected = makeBoard(
    "2......5......62....1....7...6..8...3...9...7...6..4...4....8....52.............3"
  );

  expect(addValue(board, 5, 7)).toEqual(expected);
});

test("clear position on a board", () => {
  const board = makeBoard(
    "2......5......62....1....7...6..8...3...9...7...6..4...4....8....52.............3"
  );

  const expected = makeBoard(
    "2.............62....1....7...6..8...3...9...7...6..4...4....8....52.............3"
  );

  expect(clearPosition(board, 7)).toEqual(expected);
});

test("cannot have same number in row", () => {
  const board = makeBoard(
    "2......5......62....1....7...6..8...3...9...7...6..4...4....8....52.............3"
  );

  expect(isValidMove(board, 5, 4)).toBe(false);
});

test("cannot have same number in row", () => {
  const board = makeBoard(
    "2......5......62....1....7...6..8...3...9...7...6..4...4....8....52.............3"
  );

  expect(isValidMove(board, 7, 8)).toBe(false);
});

test("cannot have same number in inner square", () => {
  const board = makeBoard(
    "2......5......62....1....7...6..8...3...9...7...6..4...4....8....52.............3"
  );

  expect(isValidMove(board, 8, 69)).toBe(false);
});

test("valid moves are okay", () => {
  const board = makeBoard(
    "2......5......62....1....7...6..8...3...9...7...6..4...4....8....52.............3"
  );

  const cases = [
    { value: 5, position: 10 },
    { value: 3, position: 3 },
    { value: 4, position: 26 },
    { value: 1, position: 27 }
  ];

  cases.forEach(({ value, position }) => {
    expect(isValidMove(board, value, position)).toBe(true);
  });
});

test("check if board is full", () => {
  const cases = [
    "839641572175392486246875391492187635683954217751236849368729154517463928924518763",
    "675982143298314765431657928724593816916278534853146297562739481189465372347821659",
    "245386971681479532937152684468217395152893746793564128314725869826931457579648213"
  ];

  cases.forEach(c => {
    expect(isFull(makeBoard(c))).toBe(true);
  });
});

test("checks is a board is valid", () => {
  const cases = [
    {
      board: makeBoard(
        "839641572175392486246875391492187635683954217751236849368729154517463928924518763"
      ),
      expected: true
    },
    {
      board: makeBoard(
        "675982143298314765431657928724593816916278534853146297562739481189465372347821659"
      ),
      expected: true
    },
    {
      board: makeBoard(
        "245386971681479532937152684468217395152893746793564128314725869826931457579648213"
      ),
      expected: true
    },
    {
      board: makeBoard(
        "889641572175392486246875391492187635683954217751236849368729154517463928924518763"
      ),
      expected: false
    },
    {
      board: makeBoard(
        "685982143298314765431657928724593816916278534853146297562739481189465372347821659"
      ),
      expected: false
    },
    {
      board: makeBoard(
        "285386971681479532937152684468217395152893746793564128314725869826931457579648213"
      ),
      expected: false
    }
  ];

  cases.forEach(({ board, expected }) => {
    expect(isComplete(board)).toBe(expected);
  });
});

test("converts array back to dot notation", () => {
  const dotted =
    "2......5......62....1....7...6..8...3...9...7...6..4...4....8....52.............3";
  const board = makeBoard(dotted);

  expect(asDotNotation(board)).toEqual(dotted);
});
