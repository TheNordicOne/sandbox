import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReusableFormPartsComponent } from '../reusable-form-parts/reusable-form-parts.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'sbf-forms',
  standalone: true,
  imports: [CommonModule, ReusableFormPartsComponent, ReactiveFormsModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent {
  private fb = inject(FormBuilder);
  form = this.fb.group({});

  logToConsole() {
    console.debug(this.form.value);
  }
}
