import { DynamicControl } from '../../dynamic-form.type';
import { Component, computed, inject, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, Validators } from '@angular/forms';
import { shouldBeShown, viewProviders } from '../../helper';
import { DynamicFormService } from '../../dynamic-form.service';

@Component({
  selector: 'sbf-base-control',
  standalone: true,
  imports: [],
  template: `
    <ng-template #contentHost />
  `,
  viewProviders
})
export class BaseControlComponent<T extends DynamicControl> implements OnInit, OnDestroy {
  @Input({ required: true }) control!: T;

  private parentContainer = inject(ControlContainer);
  private dynamicFormService = inject(DynamicFormService);

  public e2eId = signal('');
  public isVisible = computed(() => {
    const value = this.dynamicFormService.formValue();
    if (!this.control.showIf || value === null) {
      return this.control.visible === undefined || this.control.visible;
    }
    return shouldBeShown(this.control.showIf, value);
  });

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  ngOnInit(): void {
    const initialValue = this.getInitialValue();
    const formControl = new FormControl(initialValue);
    if (this.control.required) {
      formControl.addValidators(Validators.required);
    }

    this.parentFormGroup.addControl(this.control.id, formControl, { emitEvent: false });
    this.e2eId.set(`dynamic-form-${this.control.id}-input`);
  }

  ngOnDestroy(): void {
    this.parentFormGroup.removeControl(this.control.id);
  }

  private getInitialValue() {
    switch (this.control.type) {
      // Handle different value types here
      default:
        return this.control.value ?? this.control.default;
    }
  }
}
