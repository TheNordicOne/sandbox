import { Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DynamicForm } from './dynamic-form.type';
import { DynamicFormGroupComponent } from './components/dynamic-form-group/dynamic-form-group.component';

@Component({
  selector: 'sbf-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DynamicFormGroupComponent],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss'
})
export class DynamicFormComponent {
  private formBuilder = inject(FormBuilder);

  // Note: this config could potentially also from a service instead of being passed as an input
  dynamicFormConfig = input.required<DynamicForm | null>();
  dynamicForm = this.formBuilder.group({});

  groups = computed(() => {
    const dynamicForm = this.dynamicFormConfig();
    if (!dynamicForm) {
      return [];
    }
    return dynamicForm.groups;
  });
}
