import { ChangeDetectionStrategy, Component, input, OnInit, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { viewProviders } from '../../helper';
import { CheckboxControlComponent } from './dynamic-checkbox-control.component';
import { DynamicControl, DynamicFormGroup } from '../../dynamic-form.type';
import { DynamicFormGroupComponent } from '../dynamic-form-group/dynamic-form-group.component';
import { NumericControlComponent } from './dynamic-numeric-control.component';
import { RadioControlComponent } from './dynamic-radio-control.component';
import { DropdownControlComponent } from './dynamic-dropdown-control.component';
import { TextControlCompositeComponent } from './dynamic-text-control-composite.component';

@Component({
  selector: 'sbf-content-host',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <ng-container [ngComponentOutlet]="component"
                  [ngComponentOutletInputs]="componentInputs" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders
})
export class ContentHostComponent implements OnInit {
  content = input.required<DynamicControl | DynamicFormGroup>();

  component: Type<unknown> | null = null;
  componentInputs: Record<string, unknown> | undefined;

  ngOnInit(): void {
    this.loadControls()
  }

  private loadControls() {
    this.component = null

    switch (this.content().type) {
      case 'flat-group':
      case 'nested-group':
        this.component = DynamicFormGroupComponent
        this.componentInputs = { group: this.content() };
        return
      case 'text':
        this.component = TextControlCompositeComponent;
        break
      case 'numeric':
        this.component = NumericControlComponent
        break
      case 'radio':
        this.component = RadioControlComponent
        break
      case 'dropdown':
        this.component = DropdownControlComponent
        break
      case 'checkbox':
        this.component = CheckboxControlComponent
        break
    }
    if (!this.component) {
      return
    }

    this.componentInputs = { control: this.content() };
  }
}
