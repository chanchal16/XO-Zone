export const checkWin = (board: string[][]): string | null => {
  const winPatterns = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    const symbol = board[a[0]][a[1]];
    if (
      symbol &&
      symbol === board[b[0]][b[1]] &&
      symbol === board[c[0]][c[1]]
    ) {
      return symbol;
    }
  }

  return null;
};

export const checkDraw = (board: string[][]): boolean => {
  return board.flat().every((cell) => cell !== "");
};
