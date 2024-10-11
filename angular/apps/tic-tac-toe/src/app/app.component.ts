import { Component } from '@angular/core';
import { PlayerComponent } from '../components/player.component';
import { PLAYERS } from '../helper/game.constants';
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
}
