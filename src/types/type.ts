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
  playerAvatar: string | null;
  botAvatar: string | null;
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

export interface AvatarProp {
  playerSymbol: SinglePlayerMode["playerSymbol"] | SinglePlayerMode["aiSymbol"];
  avatarWidth?: number;
  avatarHeight?: number;
  type: "player" | "bot";
}

export interface MultiPlayerState {
  roomId: string;
  board: string[][];
  playerX: string;
  playerO: string;
  winner: string | null;
  score: {
    player_X: number;
    player_O: number;
  };
  isDraw: boolean;
  winningCells: [number, number][] | null;
  currentPlayer: "X" | "O" | null;
  playerXAvatar: string | null;
  playerOAvatar: string | null;
}