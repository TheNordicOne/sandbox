import {
  Component,
  computed,
  inject,
  input,
  model,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameService } from '../services/game.service';

@Component({
  selector: '[app-player]',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: ` <span class="player">
      @if (isEditing()) {
        <input type="text" required [(ngModel)]="playerName" />
      } @else {
        <span class="player-name">{{ playerName() }}</span>
      }
      <span class="player-symbol">{{ symbol() }}</span>
    </span>
    <button (click)="onEditSaveClick()">
      {{ isEditing() ? 'Save' : 'Edit' }}
    </button>`,
  styles: ``,
  host: {
    '[class.active]': 'isActive()',
  },
})
export class PlayerComponent implements OnInit {
  private gameService = inject(GameService);

  initialName = input.required<string>();
  symbol = input.required<string>();

  isActive = computed(() => this.gameService.activePlayer() === this.symbol());

  isEditing = signal(false);
  playerName = model('');

  ngOnInit() {
    this.playerName.set(this.initialName());
  }

  onEditSaveClick() {
    this.isEditing.update((editing) => !editing);

    if (!this.isEditing()) {
      this.onPlayerChangeName();
    }
  }

  onPlayerChangeName() {
    this.gameService.onPlayerChangeName(this.symbol(), this.playerName());
  }
}
