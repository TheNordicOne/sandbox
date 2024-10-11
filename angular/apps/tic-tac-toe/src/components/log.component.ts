import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameTurn } from '../types/game.types';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [CommonModule],
  template: ` <ol id="log">
    @for (turn of turns(); track turn) {
      <li>
        {{ turn.player }} selected {{ turn.square.row }},{{ turn.square.col }}
      </li>
    }
  </ol>`,
})
export class LogComponent {
  turns = input<GameTurn[]>([]);
}
