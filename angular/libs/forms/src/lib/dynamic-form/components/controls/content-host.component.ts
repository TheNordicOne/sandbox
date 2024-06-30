import { AfterViewInit, ChangeDetectionStrategy, Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { viewProviders } from '../../helper';
import { CheckboxControlComponent } from './dynamic-checkbox-control.component';
import { DynamicControl, DynamicFormGroup } from '../../dynamic-form.type';
import { DynamicFormGroupComponent } from '../dynamic-form-group/dynamic-form-group.component';
import { TextControlComponent } from './dynamic-text-control.component';
import { NumericControlComponent } from './dynamic-numeric-control.component';
import { RadioControlComponent } from './dynamic-radio-control.component';
import { DropdownControlComponent } from './dynamic-dropdown-control.component';

@Component({
  selector: 'sbf-content-host',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  template: `
    <ng-template #contentHost />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders
})
export class ContentHostComponent implements AfterViewInit {
  @ViewChild('contentHost', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;
  @Input({ required: true }) content!: (DynamicControl | DynamicFormGroup);

  ngAfterViewInit(): void {
    this.loadControls();
  }

  private loadControls() {
    this.container.clear();
    let componentRef;
    switch (this.content.type) {
      case 'flat-group':
      case 'nested-group':
        componentRef = this.container.createComponent(DynamicFormGroupComponent);
        componentRef.setInput('group', this.content);
        return;
      case 'text':
        componentRef = this.container.createComponent(TextControlComponent);
        break;
      case 'numeric':
        componentRef = this.container.createComponent(NumericControlComponent);
        break;
      case 'radio':
        componentRef = this.container.createComponent(RadioControlComponent);
        break;
      case 'dropdown':
        componentRef = this.container.createComponent(DropdownControlComponent);
        break;
      case 'checkbox':
        componentRef = this.container.createComponent(CheckboxControlComponent);
        break;
    }
    if (!componentRef) {
      return;
    }

    // Note: since setInput is not type safe anyway, we are reducing the boilerplate for now
    componentRef.setInput('control', this.content);
  }
}
