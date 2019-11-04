import {
  getPossibleValues,
  makeBoard,
  addValue,
  clearPosition,
  isValidMove,
  isFull,
  isComplete,
  asDotNotation
} from "../lib/sudokuBoard";

import easy from "../puzzles/sudoku-easy.json";
import medium from "../puzzles/sudoku-medium.json";
import hard from "../puzzles/sudoku-hard.json";

export default {
  state: {
    games_pool: [...easy, ...medium, ...hard],
    difficulty: 1,
    current: {
      board: Array(81),
      moves: 0,
      difficulty: 1,
      status: "fresh"
    }
  },

  getters: {
    current_board: state => state.current.board.map(c => (c === 0 ? "" : c)),

    possible_values: state => position => {
      if (position === null) {
        return [];
      }
      return getPossibleValues(state.current.board, position);
    },

    position_taken: state => position => {
      if (position === null) {
        return false;
      }

      return !!state.current.board[position];
    },

    level: state => state.current.difficulty
  },

  mutations: {
    startGame(state) {
      const pool = state.games_pool.filter(
        p => p.difficulty === state.difficulty
      );

      const game = pool[Math.floor(Math.random() * pool.length)];
      state.current = {
        board: makeBoard(game.board),
        moves: 0,
        complete: false,
        difficulty: game.difficulty,
        status: "ongoing"
      };
    },

    makeMove(state, { position, value }) {
      if (isValidMove(state.current.board, value, position)) {
        state.current.board = addValue(state.current.board, value, position);
        state.current.moves++;
      }

      if (isFull(state.current.board)) {
        if (isComplete(state.current.board)) {
          state.current.status = "complete";
        }
      }
    },

    clearPosition(state, position) {
      state.current.board = clearPosition(state.current.board, position);
      state.current.moves++;
      state.current.status = "ongoing";
    },

    setDifficulty(state, level) {
      state.difficulty = level;
    },

    setBoard(state, new_state) {
      state.current = new_state;
    }
  },

  actions: {
    putInStorage({ state }) {
      window.localStorage.setItem(
        "current_board",
        asDotNotation(state.current.board)
      );
      window.localStorage.setItem("current_status", state.current.status);
      window.localStorage.setItem(
        "current_difficulty",
        state.current.difficulty
      );
      window.localStorage.setItem("current_moves", state.current.moves);
    },

    readFromStorage({ commit }) {
      let board = window.localStorage.getItem("current_board");
      if (board) {
        board = makeBoard(board);
      }
      const status = window.localStorage.getItem("current_status");
      const difficulty = window.localStorage.getItem("current_difficulty");
      const moves = window.localStorage.getItem("current_moves");

      if (board) {
        commit("setBoard", { board, status, difficulty, moves });
      }
    }
  }
};
