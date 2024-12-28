import { checkDraw, checkWin } from "@/helpers/check-win";
import { updateScores } from "@/lib/api";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SingleMode {
  board: string[][];
  playerSymbol: string;
  aiSymbol: string;
  winner: string | null;
  score: {
    player: number;
    AI: number;
  };
  isDraw: boolean;
}

const initialState: SingleMode = {
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
};

const singleModeSlice = createSlice({
  name: "singleMode",
  initialState,
  reducers: {
    selectSymbol: (state, action: PayloadAction<string>) => {
      state.playerSymbol = action.payload;
      state.aiSymbol = action.payload === "X" ? "O" : "X";
    },
    setInitialScores: (state, action: PayloadAction<any>) => {
      const { player_symbol, player_score, ai_score } = action.payload;
      state.playerSymbol = player_symbol;
      state.score.player = player_score;
      state.score.AI = ai_score;
    },

    makeMove: (
      state,
      action: PayloadAction<{ row: number; col: number; symbol: string }>
    ) => {
      const { row, col, symbol } = action.payload;
      if (state.board[row][col] === "" && !state.winner) {
        state.board[row][col] = symbol;
        // Check for a winner
        const winner = checkWin(state.board);
        if (winner) {
          state.winner = winner;
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
    },
    resetGame: (state) => {
      const sessionId = localStorage.getItem("session_id") ?? "";
      if (state.winner && sessionId) {
        updateScores(sessionId, state.playerSymbol, state.winner);
      }
      Object.assign(state, initialState);
    },
  },
});

export const {
  selectSymbol,
  makeMove,
  resetGame,
  restartGame,
  setInitialScores,
} = singleModeSlice.actions;
export default singleModeSlice.reducer;