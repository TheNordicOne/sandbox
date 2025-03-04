import { Component, inject, OnDestroy, OnInit, input } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  ControlContainer,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms'

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
