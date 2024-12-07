import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { DynamicForm } from './dynamic-form.type'
import { DynamicFormGroupComponent } from './components/dynamic-form-group/dynamic-form-group.component'
import { DynamicFormService } from './dynamic-form.service'

@Component({
  selector: 'sbf-dynamic-form',
  imports: [CommonModule, ReactiveFormsModule, DynamicFormGroupComponent],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DynamicFormService]
})
export class DynamicFormComponent {
  private dynamicFormService = inject(DynamicFormService)

  // Note: this config could potentially also come from a service instead of being passed as an input
  public dynamicFormConfig = input.required<DynamicForm | null>()
  public dynamicForm = this.dynamicFormService.dynamicForm

  public groups = computed(() => {
    const dynamicForm = this.dynamicFormConfig()
    if (!dynamicForm) {
      return []
    }
    return dynamicForm.groups
  })

  logToConsole() {
    console.log(this.dynamicForm.value)
  }
}
