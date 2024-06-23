import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { viewProviders } from '../../helper';
import { BaseControlComponent } from './base-control.component';
import { DropdownControl, Option } from '../../dynamic-form.type';

@Component({
  selector: 'sbf-dynamic-dropdown-control',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  template: `
    @if (isVisible()) {
      <div>
        <label>{{ control.label }}</label>
        <select [attr.e2e-id]="e2eId()" [formControlName]="control.id">
          @for (option of data(); track option) {
            <option [id]="option.id" [value]="option.value">{{ option.label }}</option>
          }
        </select>
      </div>
    }`,
  viewProviders
})
export class DropdownControlComponent extends BaseControlComponent<DropdownControl> implements OnInit {
  public data: WritableSignal<Option[]> = signal([]);

  override ngOnInit() {
    super.ngOnInit();
    this.data.set(this.control.options);
  }
}
