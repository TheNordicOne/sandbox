import { GameBoard, PlayerRecord } from '../types/game.types';

export const PLAYERS: PlayerRecord = {
  X: { symbol: 'X', name: 'Player 1' },
  O: { symbol: 'O', name: 'Player 2' },
};

export const INITIAL_GAME_BOARD: GameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
