import { GameBoard } from '../types/game.types';

export const PLAYERS: Record<string, string> = {
  X: 'Player 1',
  O: 'Player 2',
};

export const INITIAL_GAME_BOARD: GameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
