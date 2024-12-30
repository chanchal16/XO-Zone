import { MinMax } from "@/types/type";
import { checkWin, checkDraw } from "./check-win";

const minimax = ({
  board,
  isMaximizing,
  aiSymbol,
  playerSymbol,
  depth,
}: MinMax): number => {
  const winner = checkWin(board);
  if (winner === aiSymbol) return 10;
  if (winner === playerSymbol) return -10;
  if (checkDraw(board)) return 0;
  if (depth === 0) return 0; // Stop recursion at depth limit

  const cloneBoard = (board: string[][]): string[][] =>
    board.map((row) => [...row]);

  const scores: number[] = [];
  board.forEach((row, rowIndex) =>
    row.forEach((cell, colIndex) => {
      if (cell === "") {
        const tempBoard = cloneBoard(board);
        tempBoard[rowIndex][colIndex] = isMaximizing ? aiSymbol : playerSymbol;
        const score = minimax({
          board: tempBoard,
          isMaximizing: !isMaximizing,
          aiSymbol,
          playerSymbol,
          depth: depth - 1,
        });
        scores.push(score);
      }
    })
  );

  return isMaximizing ? Math.max(...scores) : Math.min(...scores);
};

export const findBestMove = (
  board: string[][],
  aiSymbol: string,
  playerSymbol: string,
  depth: number = Infinity
): [number, number] | null => {
  let bestScore = -Infinity;
  let bestMove: [number, number] | null = null;

  const cloneBoard = (board: string[][]): string[][] =>
    board.map((row) => [...row]); // Create a deep copy

  board.forEach((row, rowIndex) =>
    row.forEach((cell, colIndex) => {
      if (cell === "") {
        const tempBoard = cloneBoard(board); // Work on a copy
        tempBoard[rowIndex][colIndex] = aiSymbol; // Simulate move
        const score = minimax({
          board: tempBoard,
          isMaximizing: false,
          aiSymbol,
          playerSymbol,
          depth,
        }); // Evaluate move
        if (score > bestScore) {
          bestScore = score;
          bestMove = [rowIndex, colIndex];
        }
      }
    })
  );

  return bestMove;
};