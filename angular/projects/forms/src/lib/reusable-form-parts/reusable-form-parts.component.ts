import {Component, inject, input, OnDestroy, OnInit} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ControlContainer, FormControl, FormGroup, ReactiveFormsModule,} from '@angular/forms'

@Component({
  selector: 'sbf-reusable-form-parts',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reusable-form-parts.component.html',
  styleUrl: './reusable-form-parts.component.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
})
export class ReusableFormPartsComponent implements OnInit, OnDestroy {
  // WARNING: THIS COMPONENT DOES NOT HANDLE THE CASE WHERE THE KEYS CHANGE
  // It should have an effect that removes the control from the form if the key changes

  private parentContainer = inject(ControlContainer)

  readonly usernameControlKey = input('username')
  readonly passwordControlKey = input('password')

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup
  }

  ngOnInit(): void {
    this.parentFormGroup.addControl(
      this.usernameControlKey(),
      new FormControl(''),
    )
    this.parentFormGroup.addControl(
      this.passwordControlKey(),
      new FormControl(''),
    )
  }

  ngOnDestroy(): void {
    this.parentFormGroup.removeControl(this.usernameControlKey())
    this.parentFormGroup.removeControl(this.passwordControlKey())
  }
}
