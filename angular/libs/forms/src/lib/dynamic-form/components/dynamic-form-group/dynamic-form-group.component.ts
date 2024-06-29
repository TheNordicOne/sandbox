import { AfterViewChecked, Component, computed, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlContainer, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CheckboxControlComponent } from '../controls/dynamic-checkbox-control.component';
import { DropdownControlComponent } from '../controls/dynamic-dropdown-control.component';
import { RadioControlComponent } from '../controls/dynamic-radio-control.component';
import { NumericControlComponent } from '../controls/dynamic-numeric-control.component';
import { TextControlComponent } from '../controls/dynamic-text-control.component';
import { DynamicFormGroup } from '../../dynamic-form.type';
import { shouldBeShown } from '../../helper';
import { ContentHostComponent } from '../controls/content-host.component';
import { DynamicFormService } from '../../dynamic-form.service';

@Component({
  selector: 'sbf-dynamic-form-group',
  standalone: true,
  imports: [CommonModule,
    TextControlComponent,
    NumericControlComponent,
    RadioControlComponent,
    DropdownControlComponent,
    CheckboxControlComponent,
    ReactiveFormsModule, ContentHostComponent],
  templateUrl: './dynamic-form-group.component.html',
  styleUrl: './dynamic-form-group.component.scss'
})
export class DynamicFormGroupComponent implements AfterViewChecked {
  @Input({ required: true }) group!: DynamicFormGroup;

  private parentContainer = inject(ControlContainer);
  private dynamicFormService = inject(DynamicFormService);

  public isVisible = computed(() => {
    const value = this.dynamicFormService.formValue();
    if (!this.group.showIf || value === null) {
      return this.group.visible === undefined || this.group.visible;
    }
    return shouldBeShown(this.group.showIf, value);
  });

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  ngAfterViewChecked() {
    this.parentFormGroup.updateValueAndValidity({ emitEvent: true });
  }
}
