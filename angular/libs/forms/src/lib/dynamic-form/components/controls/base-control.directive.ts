import { computed, Directive, effect, inject, input, OnDestroy, OnInit, signal } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicFormService } from '../../dynamic-form.service';
import { shouldBeShown } from '../../helper';
import { DynamicControl } from '../../dynamic-form.type';

@Directive({
  selector: '[sbfBaseControl]'
})
export class BaseControlDirective<T extends DynamicControl> implements OnInit, OnDestroy {
  control = input.required<T>();

  private parentContainer = inject(ControlContainer);
  private dynamicFormService = inject(DynamicFormService);

  e2eId = signal('');
  isVisible = computed(() => {
    const value = this.dynamicFormService.formValue();
    if (!this.control().showIf || value === null) {
      return true;
    }
    return shouldBeShown(this.control().showIf, value);
  });

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  constructor() {
    effect(() => {
      const isVisible = this.isVisible();
      const formControl = this.parentFormGroup?.get(this.control().id);
      if (!formControl) {
        return;
      }
      if (isVisible || this.control().keepAttachedIfHidden) {
        if (this.control().resetValueIfHidden) {
          formControl.reset();
        }
        formControl.enable({ emitEvent: false });
        return;
      }
      formControl.disable({ emitEvent: false });
      if (this.control().resetValueIfHidden) {
        formControl.reset();
      }
    });
  }

  ngOnInit(): void {
    const initialValue = this.getInitialValue();
    const formControl = new FormControl(initialValue);
    if (this.control().required) {
      formControl.addValidators(Validators.required);
    }

    this.parentFormGroup.addControl(this.control().id, formControl, {
      emitEvent: false
    });
    this.e2eId.set(`dynamic-form-${this.control().id}-input`);
  }

  ngOnDestroy(): void {
    this.parentFormGroup?.removeControl(this.control().id);
  }

  private getInitialValue() {
    switch (this.control().type) {
      // Handle different value types here
      default:
        return this.control().value ?? this.control().default;
    }
  }
}
