import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game-over',
  imports: [CommonModule],
  template: `
    @if (winner() || hasDraw()) {
      <div id="game-over">
        <h2>Game Over!</h2>
        @if (winner()) {
          <p>{{ winner()?.name }} won!</p>
        }
        @if (!winner()) {
          <p>It&apos;s a draw!</p>
        }
        <p>
          <button (click)="onRestart()">Rematch!</button>
        </p>
      </div>
    }
  `
})
export class GameOverComponent {
  private gameService = inject(GameService)
  winner = this.gameService.state.winner
  hasDraw = this.gameService.state.hasDraw

  onRestart() {
    this.gameService.state.restart()
  }
}
