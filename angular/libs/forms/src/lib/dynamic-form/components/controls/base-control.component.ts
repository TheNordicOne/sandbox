import { DynamicControl } from '../../dynamic-form.type'
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  Input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core'
import {
  ControlContainer,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms'
import { shouldBeShown, viewProviders } from '../../helper'
import { DynamicFormService } from '../../dynamic-form.service'

@Component({
  selector: 'sbf-base-control',
  standalone: true,
  imports: [],
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders,
})
export class BaseControlComponent<T extends DynamicControl>
  implements OnInit, OnDestroy
{
  @Input({ required: true }) control!: T

  private parentContainer = inject(ControlContainer)
  private dynamicFormService = inject(DynamicFormService)

  public e2eId = signal('')
  public isVisible = computed(() => {
    const value = this.dynamicFormService.formValue()
    if (!this.control.showIf || value === null) {
      return true
    }
    return shouldBeShown(this.control.showIf, value)
  })

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup
  }

  constructor() {
    effect(() => {
      const isVisible = this.isVisible()
      const formControl = this.parentFormGroup?.get(this.control.id)
      if (!formControl) {
        return
      }
      if (isVisible || this.control.keepAttachedIfHidden) {
        if (this.control.resetValueIfHidden) {
          formControl.reset()
        }
        formControl.enable({ emitEvent: false })
        return
      }
      formControl.disable({ emitEvent: false })
      if (this.control.resetValueIfHidden) {
        formControl.reset()
      }
    })
  }

  ngOnInit(): void {
    const initialValue = this.getInitialValue()
    const formControl = new FormControl(initialValue)
    if (this.control.required) {
      formControl.addValidators(Validators.required)
    }

    this.parentFormGroup.addControl(this.control.id, formControl, {
      emitEvent: false,
    })
    this.e2eId.set(`dynamic-form-${this.control.id}-input`)
  }

  ngOnDestroy(): void {
    this.parentFormGroup?.removeControl(this.control.id)
  }

  private getInitialValue() {
    switch (this.control.type) {
      // Handle different value types here
      default:
        return this.control.value ?? this.control.default
    }
  }
}
