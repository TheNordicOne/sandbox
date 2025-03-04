import {computed, Injectable, signal, Signal} from '@angular/core';

@Injectable()
export class LoadingService {
  private registrations = signal<Map<string, Signal<boolean>>>(new Map());

  private isLoadingInternal = computed(() => {
    const loadingSignals = [...this.registrations().values()];
    return computed(() => loadingSignals.some((signal) => signal()));
  });

  isLoading = computed(() => this.isLoadingInternal()());

  registerLoadingState(loadingSignal: Signal<boolean>, key: string) {
    this.registrations.update((map) => {
      const newMap = new Map(map);
      newMap.set(key, loadingSignal);
      return newMap;
    });
  }

  removeLoadingState(key: string) {
    this.registrations.update((map) => {
      const newMap = new Map(map);
      newMap.delete(key);
      return newMap;
    });
  }
}
