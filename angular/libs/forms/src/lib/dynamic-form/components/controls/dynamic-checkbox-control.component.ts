import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { viewProviders } from '../../helper';
import { BaseControlComponent } from './base-control.component';
import { CheckboxControl } from '../../dynamic-form.type';

@Component({
  selector: 'sbf-dynamic-checkbox-control',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  template: `
    <div>
      <label [htmlFor]="control.id">{{ control.label }}</label>
      <input [attr.e2e-id]="e2eId()" type="checkbox" [formControlName]="control.id">
    </div>
  `,
  viewProviders
})
export class CheckboxControlComponent extends BaseControlComponent<CheckboxControl> {
}
