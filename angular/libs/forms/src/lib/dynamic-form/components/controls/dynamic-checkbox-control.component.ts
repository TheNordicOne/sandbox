import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { viewProviders } from '../../helper'
import { BaseControlComponent } from './base-control.component'
import { CheckboxControl } from '../../dynamic-form.type'

@Component({
  selector: 'sbf-dynamic-checkbox-control',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    @if (isVisible()) {
      <div class="form-row">
        <label [htmlFor]="control.id">{{ control.label }}</label>
        <input [attr.e2e-id]="e2eId()" type="checkbox" [formControlName]="control.id">
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders,
})
export class CheckboxControlComponent extends BaseControlComponent<CheckboxControl> {}
