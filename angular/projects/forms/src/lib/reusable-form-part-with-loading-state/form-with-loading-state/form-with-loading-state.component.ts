import {Component, inject, input} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {ReusableFormPartWithLoadingStateComponent} from '../reusable-form-part-with-loading-state.component';
import {LoadingService} from '../loading.service';

@Component({
  selector: 'sbf-form-with-loading-state',
  imports: [ReactiveFormsModule, ReusableFormPartWithLoadingStateComponent],
  templateUrl: './form-with-loading-state.component.html',
  styleUrl: './form-with-loading-state.component.scss',
  providers: [LoadingService],
})
export class FormWithLoadingStateComponent {
  private fb = inject(FormBuilder);
  private loadingService = inject(LoadingService);
  form = this.fb.group({});
  formTitle = input.required<string>();
  firstRequestDelay = input<number>(1);
  secondRequestDelay = input(3);

  somethingIsLoading = this.loadingService.isLoading;
}
