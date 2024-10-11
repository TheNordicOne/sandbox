import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { viewProviders } from '../../helper'
import { BaseControlComponent } from './base-control.component'
import { Option, RadioControl } from '../../dynamic-form.type'

@Component({
  selector: 'sbf-dynamic-radio-control',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    @if (isVisible()) {
      <div class="form-row">
        <label [htmlFor]="control.id">{{ control.label }}</label>
        <div>
          @for (option of options(); track option) {
            <input [attr.e2e-id]="e2eId() + '-' + option.id" type="radio" [id]="option.id" [value]="option.value"
                   [name]="control.id" />
            <label [htmlFor]="option.id">{{ option.label }}</label>
          }
        </div>
      </div>
    }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders,
})
export class RadioControlComponent
  extends BaseControlComponent<RadioControl>
  implements OnInit
{
  public options: WritableSignal<Option[]> = signal([])

  override ngOnInit() {
    super.ngOnInit()
    this.options.set(this.control.options)
  }
}
