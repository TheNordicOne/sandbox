import { Component, input, model, OnInit, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  initialName = input.required<string>();
  symbol = input.required<string>();
  isActive = input.required<boolean>();
  changeName = output<{ symbol: string; newName: string }>();

  isEditing = signal(false);
  playerName = model('');

  ngOnInit() {
    this.playerName.set(this.initialName());
  }

  onEditSaveClick() {
    this.isEditing.update((editing) => !editing);

    if (!this.isEditing()) {
      this.changeName.emit({
        symbol: this.symbol(),
        newName: this.playerName(),
      });
    }
  }
}
