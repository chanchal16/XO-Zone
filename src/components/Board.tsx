import { makeMove } from "@/lib/features/single-player/singlePlayerSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import React from "react";

const Board = () => {
  const singlePlayerState = useAppSelector((state) => state.singleMode);
  const {playerSymbol,aiSymbol,board,winner} = singlePlayerState
  const dispatch = useAppDispatch();

  const makeAiMove = () => {
    const availableMoves: [number, number][] = [];
      // Find all empty cells
      board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          if (cell === "") {
            availableMoves.push([rowIndex, colIndex]);
          }
        });
      });
      
      if (availableMoves.length > 0) {
        const [moveRow, moveCol] =
          availableMoves[Math.floor(Math.random() * availableMoves.length)];
        dispatch(makeMove({row:moveRow,col:moveCol,symbol:aiSymbol}))
      }
  };

  const handleMove = (row: number, col: number) => {
    if (board[row][col] === "" && playerSymbol && !winner) {
      dispatch(makeMove({row,col,symbol:playerSymbol}))
      setTimeout(makeAiMove, 500); // Add delay for better UX
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