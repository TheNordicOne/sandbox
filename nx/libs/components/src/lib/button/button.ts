import { Component, input, output } from '@angular/core';

@Component({
  selector: 'lib-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  label = input.required<string>();
  press = output();
}
