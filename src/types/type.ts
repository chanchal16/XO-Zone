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
  isPlayerTurn: boolean;
}

export type IPlayer = {
  player: SinglePlayerMode["playerSymbol"];
  bot: SinglePlayerMode["aiSymbol"];
  avatar?: string;
  className?: string;
  avatarWidth?: number;
  avatarHeight?: number;
  labelClassName?: string;
};

export type ISymbol = {
  symbol: string;
  width: number;
  height: number;
};

export type MinMax = {
  board: string[][];
  isMaximizing: boolean;
  aiSymbol: string;
  playerSymbol: string;
  depth: number;
};