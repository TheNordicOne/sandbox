import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlContainer, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'sbf-reusable-form-parts',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reusable-form-parts.component.html',
  styleUrl: './reusable-form-parts.component.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true })
    }
  ]
})
export class ReusableFormPartsComponent implements OnInit, OnDestroy {
  @Input() usernameControlKey = 'username';
  @Input() passwordControlKey = 'password';

  constructor(private parentContainer: ControlContainer) {
  }

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  ngOnInit(): void {
    this.parentFormGroup.addControl(
      this.usernameControlKey, new FormControl('')
    );
    this.parentFormGroup.addControl(
      this.passwordControlKey, new FormControl('')
    );
  }

  ngOnDestroy(): void {
    this.parentFormGroup.removeControl(this.usernameControlKey);
    this.parentFormGroup.removeControl(this.passwordControlKey);
  }
}
