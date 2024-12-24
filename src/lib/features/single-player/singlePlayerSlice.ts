import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SingleMode {
  board: string[][];
  playerSymbol: string | null;
  aiSymbol: string;
  winner: string | null;
  score: {
    player: number;
    AI: number;
  };
}

const initialState: SingleMode = {
  board: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  playerSymbol: null,
  aiSymbol: "",
  score: {
    player: 0,
    AI: 0,
  },
  winner: null,
};

const singleModeSlice = createSlice({
  name: "singleMode",
  initialState,
  reducers: {
    selectSymbol: (state, action: PayloadAction<string>) => {
      state.playerSymbol = action.payload;
      state.aiSymbol = action.payload === "X" ? "O" : "X";
    },
    makeMove: (
      state,
      action: PayloadAction<{ row: number; col: number; symbol: string }>
    ) => {
      const { row, col, symbol } = action.payload;
      if (state.board[row][col] === "" && !state.winner) {
        state.board[row][col] = symbol;
      }
    },
  },
});

export const { selectSymbol, makeMove } = singleModeSlice.actions;
export default singleModeSlice.reducer;