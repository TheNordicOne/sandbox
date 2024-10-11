import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-over',
  standalone: true,
  imports: [CommonModule],
  template: ` <div id="game-over">
    <h2>Game Over!</h2>
    @if (winner()) {
      <p>{{ winner() }} won!</p>
    }
    @if (!winner()) {
      <p>It&apos;s a draw!</p>
    }
    <p>
      <button (click)="restart.emit()">Rematch!</button>
    </p>
  </div>`,
})
export class GameOverComponent {
  winner = input<string | null>(null);
  restart = output();
}
