import { checkDraw, checkWin } from "@/helpers/check-win";
import { DIFFICULTY, SinglePlayerMode } from "@/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: SinglePlayerMode = {
  board: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  playerSymbol: "",
  aiSymbol: "",
  score: {
    player: 0,
    AI: 0,
  },
  winner: null,
  isDraw: false,
  difficulty: DIFFICULTY.EASY,
  winningCells: null,
};

const singleModeSlice = createSlice({
  name: "singleMode",
  initialState,
  reducers: {
    selectSymbol: (state, action: PayloadAction<string>) => {
      state.playerSymbol = action.payload;
      state.aiSymbol = action.payload === "X" ? "O" : "X";
    },
    selectDifficulty: (state, action: PayloadAction<DIFFICULTY>) => {
      state.difficulty = action.payload;
    },
    makeMove: (
      state,
      action: PayloadAction<{ row: number; col: number; symbol: string }>
    ) => {
      const { row, col, symbol } = action.payload;
      if (state.board[row][col] === "" && !state.winner) {
        state.board[row][col] = symbol;
        // Check for a winner
        const result = checkWin(state.board);
        if (result) {
          const { winner, winningCells } = result;
          state.winner = winner;
          state.winningCells = winningCells;
          if (winner === state.playerSymbol) {
            state.score.player += 1;
          } else {
            state.score.AI += 1;
          }
        } else if (checkDraw(state.board)) {
          state.isDraw = true;
        }
      }
    },
    restartGame: (state) => {
      state.board = initialState.board;
      state.winner = initialState.winner;
      state.isDraw = initialState.isDraw;
      state.winningCells = initialState.winningCells;
    },
    resetGame: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  selectSymbol,
  makeMove,
  resetGame,
  restartGame,
  selectDifficulty,
} = singleModeSlice.actions;
export default singleModeSlice.reducer;