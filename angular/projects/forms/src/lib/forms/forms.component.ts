import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReusableFormPartsComponent } from '../reusable-form-parts/reusable-form-parts.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { exampleForm } from '../dynamic-form/example-form';
import {
  FormWithLoadingStateComponent
} from '../reusable-form-part-with-loading-state/form-with-loading-state/form-with-loading-state.component';
import { SignalFormComponent } from '../signal-form/signal-form.component';

@Component({
  selector: 'sbf-forms',
  imports: [CommonModule, ReusableFormPartsComponent, ReactiveFormsModule, DynamicFormComponent, FormWithLoadingStateComponent, SignalFormComponent],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class FormsComponent {
  private fb = inject(FormBuilder);
  form = this.fb.group({});

  logToConsole() {
    console.debug(this.form.value);
  }

  protected readonly exampleForm = exampleForm;
}
