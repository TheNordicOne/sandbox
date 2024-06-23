import { DynamicControl } from '../../dynamic-form.type';
import { Component, computed, inject, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { shouldBeShown, viewProviders } from '../../helper';

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

  private formValue = signal(null);
  private formSubscription: Subscription | undefined;

  public e2eId = signal('');

  // Note: This currently only works within one form group and its direct control descendants, but not for its subgroups
  public isVisible = computed(() => {
    const value = this.formValue();
    if (!this.control.showIf || value === null) {
      return this.control.visible === undefined || this.control.visible;
    }
    return shouldBeShown(this.control.showIf, value);
  });

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  ngOnInit(): void {
    let initialValue;

    switch (this.control.type) {
      default:
        initialValue = this.control.value ?? this.control.default;
        break;
    }
    const formControl = new FormControl(initialValue);
    if (this.control.required) {
      formControl.addValidators(Validators.required);
    }
    this.parentFormGroup.addControl(this.control.id, formControl, { emitEvent: false });
    this.e2eId.set(`dynamic-form-${this.control.id}-input`);

    if (!this.control.showIf) {
      return;
    }

    this.formSubscription = this.parentFormGroup.valueChanges.subscribe((value) => {
      this.formValue.set(value);
    });
  }

  ngOnDestroy(): void {
    this.parentFormGroup.removeControl(this.control.id);
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }
}
