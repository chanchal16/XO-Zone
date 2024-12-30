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
}

export type MinMax = {
  board: string[][];
  isMaximizing: boolean;
  aiSymbol: string;
  playerSymbol: string;
  depth: number;
};