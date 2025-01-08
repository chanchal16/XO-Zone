import { createAsyncThunk } from "@reduxjs/toolkit";
import { findBestMove } from "@/helpers/find-best-move";
import { makeMove } from "./singlePlayerSlice";
import { findRandomMove } from "@/helpers/random-move";

export const handleAIMove = createAsyncThunk(
  "singleMode/handleAIMove",
  async (_, { getState, dispatch }) => {
    const state = getState() as any; // Replace 'any' with proper typing if necessary
    const { board, aiSymbol, playerSymbol, winner, difficulty, isPlayerTurn } =
      state.singleMode;

    if (!winner && !isPlayerTurn) {
      const delay = 500; // Delay for UX purposes
      await new Promise((resolve) => setTimeout(resolve, delay));

      let bestMove;
      if (difficulty === "easy") {
        bestMove = findRandomMove(board); // Assume this function exists
      } else if (difficulty === "medium") {
        bestMove = findBestMove(board, aiSymbol, playerSymbol, 2); // Depth limit
      } else {
        bestMove = findBestMove(board, aiSymbol, playerSymbol); // Full minimax
      }

      if (bestMove) {
        const [row, col] = bestMove;
        dispatch(makeMove({ row, col, symbol: aiSymbol }));
      }
    }
  }
);