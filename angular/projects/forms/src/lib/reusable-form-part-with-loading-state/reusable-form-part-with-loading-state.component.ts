import {Component, computed, inject, input, OnDestroy, OnInit,} from '@angular/core';
import {ControlContainer, FormControl, FormGroup, ReactiveFormsModule,} from '@angular/forms';
import {viewProviders} from '../dynamic-form/helper';
import {rxResource} from '@angular/core/rxjs-interop';
import {HttpClient} from '@angular/common/http';
import {UserSearchResponse} from './types';
import {map} from 'rxjs';
import {LoadingService} from './loading.service';

@Component({
  selector: 'sbf-reusable-form-part-with-loading-state',
  imports: [ReactiveFormsModule],
  templateUrl: './reusable-form-part-with-loading-state.component.html',
  styleUrl: './reusable-form-part-with-loading-state.component.scss',
  viewProviders,
})
export class ReusableFormPartWithLoadingStateComponent implements OnInit, OnDestroy {
  private parentContainer = inject(ControlContainer);
  private httpClient = inject(HttpClient);
  private loadingService = inject(LoadingService);

  private dummyJsonApi = 'https://dummyjson.com';
  private userEndpoint = `${this.dummyJsonApi}/users`;

  filter = input.required<string>();
  label = input.required<string>();
  key = input.required<string>();
  delayInSeconds = input<number>(0);
  isLoading = computed(() => this.users.isLoading());

  // Delay request for demo
  users = rxResource({
    request: () => ({ q: this.filter(), delay: this.delayInSeconds() * 1000 }),
    loader: ({ request }) =>
      this.httpClient.get<UserSearchResponse>(`${this.userEndpoint}/search?q=${request.q}&delay=${request.delay}`).pipe(map((response) => response.users)),
  });

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  onRefresh() {
    this.users.reload();
  }

  ngOnInit(): void {
    this.parentFormGroup.addControl(this.key(), new FormControl(''));
    this.loadingService.registerLoadingState(this.isLoading, this.key());
  }

  ngOnDestroy(): void {
    this.parentFormGroup.removeControl(this.key());
    this.loadingService.removeLoadingState(this.key());
  }
}
