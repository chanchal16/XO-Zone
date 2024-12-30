export const findRandomMove = (board: string[][]): [number, number] | null => {
  const emptyCells: [number, number][] = [];
  board.forEach((row, rowIndex) =>
    row.forEach((cell, colIndex) => {
      if (cell === "") emptyCells.push([rowIndex, colIndex]);
    })
  );

  if (emptyCells.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex];
};