import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { viewProviders } from '../../helper';
import { BaseControlDirective } from './base-control.directive';
import { TextControl } from '../../dynamic-form.type';

@Component({
    selector: 'sbf-dynamic-text-control-with-directive',
    imports: [CommonModule, ReactiveFormsModule],
    template: `
      @if (isVisible()) {
        <div class="form-row">
          <label [htmlFor]="control().id">{{ control().label }} (Directive)</label>
          <input [attr.e2e-id]="e2eId()" type="text" [formControlName]="control().id">
        </div>
      }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    viewProviders,
    hostDirectives: [
      {
        directive: BaseControlDirective,
        inputs: ['control']
      }
    ]
  }
)
export class TextControlWithDirectiveComponent {
  private readonly baseControl = inject(BaseControlDirective<TextControl>);

  isVisible = this.baseControl.isVisible;
  control = this.baseControl.control;
  e2eId = this.baseControl.e2eId;
}
