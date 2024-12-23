import React from "react";

const Board = ({ board, playerSymbol, aiSymbol, setBoard, winner }: any) => {
  const makeAiMove = () => {
    setBoard((prevBoard) => {
      const availableMoves: [number, number][] = [];
      // Find all empty cells
      prevBoard.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          if (cell === "") {
            availableMoves.push([rowIndex, colIndex]);
          }
        });
      });

      if (availableMoves.length > 0) {
        const [moveRow, moveCol] =
          availableMoves[Math.floor(Math.random() * availableMoves.length)];
        const newBoard = prevBoard.map((row) => [...row]); // Deep copy of the board
        newBoard[moveRow][moveCol] = aiSymbol;
        return newBoard;
      }
      // If no moves are available, return the current board
      return prevBoard;
    });
  };

  const handleMove = (row: number, col: number) => {
    if (board[row][col] === "" && playerSymbol && !winner) {
      setBoard((prevBoard) => {
        const newBoard = prevBoard.map((row) => [...row]); // Deep copy of the board
        newBoard[row][col] = playerSymbol;
        return newBoard;
      });
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