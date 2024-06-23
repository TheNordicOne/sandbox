import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { viewProviders } from '../../helper';
import { BaseControlComponent } from './base-control.component';
import { NumericControl } from '../../dynamic-form.type';

@Component({
  selector: 'sbf-dynamic-numeric-control',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  template: `
    <div>
      <label [htmlFor]="control.id">{{ control.label }}</label>
      <input [attr.e2e-id]="e2eId()" type="number" [formControlName]="control.id">
    </div>
  `,
  viewProviders
})
export class NumericControlComponent extends BaseControlComponent<NumericControl> {
}
