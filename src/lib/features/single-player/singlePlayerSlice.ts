import { checkDraw, checkWin } from "@/helpers/check-win";
import { DIFFICULTY, SinglePlayerMode } from "@/types/type";
import { createSlice, Middleware, PayloadAction } from "@reduxjs/toolkit";

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
  isPlayerTurn: true,
  playerAvatar: null,
  botAvatar: null,
};

export const hydrateStateMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);
    if (typeof window !== "undefined") {
      const state = store.getState().singleMode;
      sessionStorage.setItem("singlePlayerState", JSON.stringify(state));
    }
    return result;
  };

const singleModeSlice = createSlice({
  name: "singleMode",
  initialState,
  reducers: {
    hydrateState: (state, action) => {
      return { ...state, ...action.payload };
    },
    selectSymbol: (state, action: PayloadAction<string>) => {
      state.playerSymbol = action.payload;
      state.aiSymbol = action.payload === "X" ? "O" : "X";
    },
    selectDifficulty: (state, action: PayloadAction<DIFFICULTY>) => {
      state.difficulty = action.payload;
    },
    setPlayerAvatar(state, action: PayloadAction<string>) {
      state.playerAvatar = action.payload;
    },
    setBotAvatar(state, action: PayloadAction<string>) {
      state.botAvatar = action.payload;
    },
    makeMove: (
      state,
      action: PayloadAction<{ row: number; col: number; symbol: string }>
    ) => {
      const { row, col, symbol } = action.payload;
      if (
        state.board[row][col] === "" &&
        !state.winner &&
        ((symbol === state.playerSymbol && state.isPlayerTurn) ||
          (symbol === state.aiSymbol && !state.isPlayerTurn))
      ) {
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
        // Toggle turn after move
        state.isPlayerTurn = !state.isPlayerTurn;
      }
    },
    restartGame: (state) => {
      state.board = initialState.board;
      state.winner = initialState.winner;
      state.isDraw = initialState.isDraw;
      state.winningCells = initialState.winningCells;
      state.isPlayerTurn = initialState.isPlayerTurn;
    },
    resetGame: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  hydrateState,
  selectSymbol,
  makeMove,
  resetGame,
  restartGame,
  selectDifficulty,
  setPlayerAvatar,
  setBotAvatar,
} = singleModeSlice.actions;
export default singleModeSlice.reducer;