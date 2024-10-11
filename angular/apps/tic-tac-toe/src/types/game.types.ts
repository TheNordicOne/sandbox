export type GameTurn = {
  square: Square;
  player: string;
};

export type Square = {
  row: number;
  col: number;
};

export type GameBoard = [
  [string | null, string | null, string | null],
  [string | null, string | null, string | null],
  [string | null, string | null, string | null],
];
