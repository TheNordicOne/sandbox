import {Component, inject, ViewEncapsulation} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ReusableFormPartsComponent} from '../reusable-form-parts/reusable-form-parts.component'
import {FormBuilder, ReactiveFormsModule} from '@angular/forms'
import {DynamicFormComponent} from '../dynamic-form/dynamic-form.component'
import {exampleForm} from '../dynamic-form/example-form'
import {
  ReusableFormPartWithLoadingStateComponent
} from '../reusable-form-part-with-loading-state/reusable-form-part-with-loading-state.component'
import {LoadingService} from '../reusable-form-part-with-loading-state/loading.service'

@Component({
  selector: 'sbf-forms',
  imports: [
    CommonModule,
    ReusableFormPartsComponent,
    ReactiveFormsModule,
    DynamicFormComponent,
    ReusableFormPartWithLoadingStateComponent,
  ],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [LoadingService],
})
export class FormsComponent {
  private fb = inject(FormBuilder)
  private loadingService = inject(LoadingService)
  form = this.fb.group({})

  somethingIsLoading = this.loadingService.isLoading

  logToConsole() {
    console.debug(this.form.value)
  }

  protected readonly exampleForm = exampleForm
}
