import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [CommonModule],
  template: ` <ol id="log">
    @for (turn of turns(); track turn) {
      <li>
        {{ turn.player.name }} selected {{ turn.square.row }},{{
          turn.square.col
        }}
      </li>
    }
  </ol>`,
})
export class LogComponent {
  private gameService = inject(GameService);
  turns = this.gameService.gameTurns;
}
