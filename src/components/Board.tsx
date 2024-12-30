import { handleAIMove } from "@/lib/features/single-player/aiMiddleware";
import { makeMove } from "@/lib/features/single-player/singlePlayerSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import React from "react";

const Board = () => {
  const singlePlayerState = useAppSelector((state) => state.singleMode);
  const { playerSymbol, board, winner } = singlePlayerState;
  const dispatch = useAppDispatch();

  const handleMove = (row: number, col: number) => {
    if (board[row][col] === "" && playerSymbol && !winner) {
      dispatch(makeMove({ row, col, symbol: playerSymbol }));
      dispatch(handleAIMove());
    }
  };

  return (
    <>
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <button
            key={`${rowIndex}-${colIndex}`}
            onClick={() => handleMove(rowIndex, colIndex)}
            className="w-20 h-20 text-xl border border-gray-400 flex items-center justify-center"
          >
            {cell}
          </button>
        ))
      )}
    </>
  );
};

export default Board;