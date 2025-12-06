import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-components',
  imports: [],
  templateUrl: './components.html',
  styleUrl: './components.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Components {}
