import { Component, computed, signal, untracked } from '@angular/core';
import { PlayerComponent } from '../components/player.component';
import { INITIAL_GAME_BOARD, PLAYERS } from '../helper/game.constants';
import { GameBoard, GameTurn } from '../types/game.types';
import { WINNING_COMBINATIONS } from '../helper/winning-combinations.constants';
import { GameOverComponent } from '../components/game-over.component';
import { LogComponent } from '../components/log.component';
import { GameBoardComponent } from '../components/game-board.component';

@Component({
  standalone: true,
  imports: [
    PlayerComponent,
    GameOverComponent,
    LogComponent,
    GameBoardComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  protected readonly PLAYERS = PLAYERS;

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

  onPlayerChangeName(event: { symbol: string; newName: string }) {
    const { symbol, newName } = event;
    this.players.update((players) => {
      return {
        ...players,
        [symbol]: newName,
      };
    });
  }

  onSelectSquare(event: { rowIndex: number; colIndex: number }) {
    const { rowIndex, colIndex } = event;

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
