import { handleAIMove } from "@/lib/features/single-player/aiMiddleware";
import { makeMove } from "@/lib/features/single-player/singlePlayerSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import Image from "next/image";
import React from "react";

const Board = () => {
  const singlePlayerState = useAppSelector((state) => state.singleMode);
  const { playerSymbol, board, winner, winningCells } = singlePlayerState;
  const dispatch = useAppDispatch();

  const handleMove = (row: number, col: number) => {
    if (board[row][col] === "" && playerSymbol && !winner) {
      dispatch(makeMove({ row, col, symbol: playerSymbol }));
      dispatch(handleAIMove());
    }
  };

  const isWinningCell = (row: number, col: number) => {
    return winningCells?.some(([r, c]) => r === row && c === col) ?? false;
  };

  return (
    <>
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isWinner = isWinningCell(rowIndex, colIndex);
          const isLastRow = rowIndex === board.length - 1; // Check if it's the last row
          const isLastCol = colIndex === row.length - 1;
          return (
            <button
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleMove(rowIndex, colIndex)}
              className={`h-20 text-2xl font-extrabold  flex items-center justify-center            
              ${isWinner ? "bg-minimal-gridLines/60 animate-pulse" : ""}
              ${!isLastRow ? "border-b-2 border-minimal-gridLines" : ""}
              ${!isLastCol ? "border-r-2 border-minimal-gridLines" : ""}
              `}
            >
              {cell === "X" && (
                <Image src="/x-mark.png" alt="X" width={28} height={28} />
              )}
              {cell === "O" && (
                <Image src="/blue-o.png" alt="O" width={28} height={28} />
              )}
            </button>
          );
        })
      )}
    </>
  );
};

export default Board;