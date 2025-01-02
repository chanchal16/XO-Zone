export enum DIFFICULTY {
  "EASY" = "easy",
  "MEDIUM" = "medium",
  "HARD" = "hard",
}

export interface SinglePlayerMode {
  board: string[][];
  playerSymbol: string;
  aiSymbol: string;
  winner: string | null;
  score: {
    player: number;
    AI: number;
  };
  isDraw: boolean;
  difficulty: DIFFICULTY;
  winningCells: [number, number][] | null;
}

export type IPlayer = {
  player: SinglePlayerMode["playerSymbol"];
  bot: SinglePlayerMode["aiSymbol"];
  avatar?: string;
};

export type MinMax = {
  board: string[][];
  isMaximizing: boolean;
  aiSymbol: string;
  playerSymbol: string;
  depth: number;
};