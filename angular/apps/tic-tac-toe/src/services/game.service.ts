import { computed, Injectable, signal, untracked } from '@angular/core';
import { GameBoard, GameTurn } from '../types/game.types';
import { INITIAL_GAME_BOARD, PLAYERS } from '../helper/game.constants';
import { WINNING_COMBINATIONS } from '../helper/winning-combinations.constants';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  players = signal({ ...PLAYERS });
  gameTurns = signal<GameTurn[]>([]);

  activePlayer = computed(() => {
    let currentPlayer = 'X';
    if (this.gameTurns().length > 0 && this.gameTurns()[0].player === 'X') {
      currentPlayer = 'O';
    }

    return currentPlayer;
  });

  gameBoard = computed(() => {
    let gameBoard: GameBoard = <GameBoard>[
      ...INITIAL_GAME_BOARD.map((array) => [...array]),
    ];

    for (const turn of this.gameTurns()) {
      const { square, player } = turn;
      const { row, col } = square;

      gameBoard[row][col] = player;
    }

    return gameBoard;
  });

  winner = computed(() => {
    let winner;
    const gameBoard = this.gameBoard();

    for (const combination of WINNING_COMBINATIONS) {
      const firstSquareSymbol =
        gameBoard[combination[0].row][combination[0].column];
      const secondSquareSymbol =
        gameBoard[combination[1].row][combination[1].column];
      const thirdSquareSymbol =
        gameBoard[combination[2].row][combination[2].column];

      if (
        firstSquareSymbol &&
        firstSquareSymbol === secondSquareSymbol &&
        firstSquareSymbol === thirdSquareSymbol
      ) {
        untracked(() => {
          const players = this.players();
          winner = players[firstSquareSymbol];
        });
      }
    }

    return winner ?? null;
  });

  hasDraw = computed(() => {
    return this.gameTurns().length === 9 && untracked(() => !this.winner());
  });

  onPlayerChangeName(symbol: string, newName: string) {
    this.players.update((players) => {
      return {
        ...players,
        [symbol]: newName,
      };
    });
  }

  onSelectSquare(rowIndex: number, colIndex: number) {
    this.gameTurns.update((prevTurns) => {
      const currentPlayer = this.activePlayer();

      return [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
    });
  }

  onRestart() {
    this.gameTurns.set([]);
  }
}
