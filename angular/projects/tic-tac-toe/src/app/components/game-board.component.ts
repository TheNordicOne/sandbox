import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game-board',
  imports: [CommonModule],
  template: `
    <ol id="game-board">
    @for (row of board(); track rowIndex; let rowIndex = $index) {
      <li>
        <ol>
          @for (playerSymbol of row; track colIndex; let colIndex = $index) {
            <li>
              <button
                (click)="onSelectSquare(rowIndex, colIndex)"
                [disabled]="playerSymbol !== null"
              >
                {{ playerSymbol }}
              </button>
            </li>
          }
        </ol>
      </li>
    }
    </ol>`
})
export class GameBoardComponent {
  private gameService = inject(GameService)
  board = this.gameService.state.gameBoard
  selectSquare = output<{ rowIndex: number; colIndex: number }>()

  onSelectSquare(rowIndex: number, colIndex: number) {
    this.gameService.state.selectSquare({ rowIndex, colIndex })
  }
}
