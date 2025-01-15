import { MultiPlayerState } from "@/types/type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: MultiPlayerState = {
  roomId: "",
  board: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  playerX: "",
  playerO: "",
  score: {
    player_X: 0,
    player_O: 0,
  },
  winner: null,
  isDraw: false,
  winningCells: null,
  currentPlayer: "X",
  playerXAvatar: null,
  playerOAvatar: null,
};

const multiModeSlice = createSlice({
  name: "multiMode",
  initialState,
  reducers: {
    setPlayerXName: (state, action: PayloadAction<string>) => {
      state.playerX = action.payload;
    },
    setPlayerOName: (state, action: PayloadAction<string>) => {
      state.playerO = action.payload;
    },
  },
});

export const { setPlayerXName, setPlayerOName } = multiModeSlice.actions;
export default multiModeSlice.reducer;