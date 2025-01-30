import { Component, computed, inject, input, model, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameService } from '../services/game.service';
import { Player } from '../types/game.types';

@Component({
  selector: '[app-player]',
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
    '[class.active]': 'isActive()'
  }
})
export class PlayerComponent implements OnInit {
  private gameService = inject(GameService)

  player = input.required<Player>()

  symbol = computed(() => this.player().symbol)
  isActive = computed(
    () => this.gameService.state.activePlayer().symbol === this.symbol(),
  )

  isEditing = signal(false)
  playerName = model('')

  ngOnInit() {
    this.playerName.set(this.player().name)
  }

  onEditSaveClick() {
    this.isEditing.update((editing) => !editing)

    if (!this.isEditing()) {
      this.onPlayerChangeName()
    }
  }

  onPlayerChangeName() {
    this.gameService.state.changePlayerName({
      symbol: this.symbol(),
      newName: this.playerName(),
    })
  }
}
