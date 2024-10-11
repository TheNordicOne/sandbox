import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameBoard } from '../types/game.types';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule],
  template: ` <ol id="game-board">
    @for (row of board(); track row; let rowIndex = $index) {
      <li>
        <ol>
          @for (
            playerSymbol of row;
            track playerSymbol;
            let colIndex = $index
          ) {
            <li>
              <button
                (click)="selectSquare.emit({ rowIndex, colIndex })"
                [disabled]="playerSymbol !== null"
              >
                {{ playerSymbol }}
              </button>
            </li>
          }
        </ol>
      </li>
    }
  </ol>`,
})
export class GameBoardComponent {
  board = input.required<GameBoard>();
  selectSquare = output<{ rowIndex: number; colIndex: number }>();
}
