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
          return (
            <button
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleMove(rowIndex, colIndex)}
              className={`w-20 h-20 text-2xl font-extrabold border border-minimal-gridLines flex items-center justify-center
              ${
                cell === "X"
                  ? "text-minimal-playerX-200"
                  : "text-minimal-playerO-200"
              }
              ${isWinner ? "bg-[#d6d0bf]/65 animate-pulse" : ""}
              `}
            >
              {cell === "X" && (
                <Image src="/close.png" alt="X" width={28} height={28} />
              )}
              {cell === "O" && (
                <Image src="/O-letter.png" alt="O" width={28} height={28} />
              )}
            </button>
          );
        })
      )}
    </>
  );
};

export default Board;