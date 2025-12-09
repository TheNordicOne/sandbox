import {Combobox, ComboboxInput, ComboboxPopupContainer,} from '@angular/aria/combobox';
import {Listbox, Option} from '@angular/aria/listbox';
import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  effect,
  ElementRef,
  forwardRef,
  input,
  output,
  Signal,
  signal,
  TemplateRef,
  viewChild,
  viewChildren,
} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';
import {OverlayModule} from '@angular/cdk/overlay';
import {OptionTemplate} from './directives/option-template';
import {SelectedValuesTemplate, SelectedValueTemplate,} from './directives/selected-value-template';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR,} from '@angular/forms';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {debounceTime} from 'rxjs'; // Utility function

// Utility function
function debounceSignal<T>(source: Signal<T>, timeMsec = 500): Signal<T> {
  const debounced$ = toObservable(source).pipe(debounceTime(timeMsec));
  return toSignal(debounced$, {
    initialValue: source(),
  });
}

// Implementation based on Angular Aria patterns
@Component({
  selector: 'sba-select',
  imports: [Combobox, ComboboxInput, ComboboxPopupContainer, Listbox, Option, OverlayModule, NgTemplateOutlet, FormsModule],
  templateUrl: './select.html',
  styleUrl: './select.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Select),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Select<T extends object> implements ControlValueAccessor {
  private onChange?: (value: T) => void;
  private onTouched?: () => void;

  items = input<T[]>([]);
  placeholder = input<string>('Select an option');
  dataKey = input.required<keyof T>();
  labelKey = input.required<keyof T>();
  multi = input(false);

  virtual = input(false);
  itemSize = input<number>(40);
  isLoading = input(false);
  hasMore = input(false);
  searchable = input(true);
  searchPlaceholder = input('Search...');

  loadMore = output<void>();
  query = output<string>();

  optionTemplate = contentChild(OptionTemplate, { read: TemplateRef });
  selectedValueTemplate = contentChild(SelectedValueTemplate, {
    read: TemplateRef,
  });
  selectedValuesTemplate = contentChild(SelectedValuesTemplate, {
    read: TemplateRef,
  });

  listbox = viewChild<Listbox<T>>(Listbox);
  options = viewChildren<Option<T>>(Option);
  combobox = viewChild<Combobox<T>>(Combobox);
  viewport = viewChild(CdkVirtualScrollViewport);
  searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  values = signal<T[]>([]);
  disabled = signal(false);
  searchTerm = signal('');
  debouncedSearchTerm = debounceSignal(this.searchTerm);

  filteredLabels = computed(() => {
    const items = this.items();
    const isVirtual = this.virtual();

    if (isVirtual) {
      return items;
    }

    const term = this.debouncedSearchTerm().toLowerCase();
    if (!term) {
      return items;
    }

    const labelKey = this.labelKey();
    return items.filter((item) => {
      const val = String(item[labelKey]).toLowerCase();
      return val.includes(term);
    });
  });

  selectedValue = computed(() => {
    const values = this.values();
    const isMulti = this.multi();

    if (!values) {
      return;
    }

    if (values.length === 0 && !isMulti) {
      return;
    }

    if (isMulti) {
      return values;
    }

    return values[0];
  });

  displayValue = computed(() => {
    const labelKey = this.labelKey();
    const selectedOption = this.selectedValue();

    if (!selectedOption) {
      return this.placeholder();
    }

    if (!Array.isArray(selectedOption)) {
      return selectedOption[labelKey];
    }

    if (selectedOption.length === 0) {
      return this.placeholder();
    }

    return selectedOption.map((o) => o[labelKey]).join(', ');
  });

  constructor() {
    effect(() => {
      const value = this.debouncedSearchTerm();
      if (this.virtual()) {
        this.query.emit(value);
      }
    });

    // 1. SCROLL SYNC
    afterRenderEffect(() => {
      const activeOption = this.options().find((opt) => opt.active());
      if (activeOption) {
        activeOption.element.scrollIntoView({ block: 'nearest' });
      }
    });

    // 2. OPEN/CLOSE STATE MANAGEMENT
    afterRenderEffect(() => {
      const expanded = this.combobox()?.expanded();
      if (!expanded) {
        // CLOSED: Reset scrolls and search term
        setTimeout(() => {
          this.listbox()?.element.scrollTo(0, 0);
          this.viewport()?.scrollToIndex(0);

          this.searchTerm.set('');
          if (this.virtual()) {
            this.query.emit('');
          }
        }, 150);

        return;
      }
      // OPENED: Focus Search Input
      if (this.searchable()) {
        setTimeout(() => {
          this.searchInput()?.nativeElement.focus();
        });
      }
    });
  }

  isSelected(option: T): boolean {
    const dataKey = this.dataKey();
    const selectedValue = this.selectedValue();

    if (!selectedValue) {
      return false;
    }

    if (!Array.isArray(selectedValue)) {
      return selectedValue[dataKey] === option[dataKey];
    }

    return selectedValue.some((v) => v[dataKey] === option[dataKey]);
  }

  getLabel(option: T) {
    return option[this.labelKey()] as string;
  }

  onValuesChange(items: T[]) {
    this.values.set(items);
  }

  onSearchKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.listbox()?.element.focus();
    }
  }

  onScrolledIndexChange() {
    if (!this.virtual() || this.isLoading() || !this.hasMore()) {
      return;
    }

    const viewport = this.viewport();
    if (!viewport) {
      return;
    }

    const end = viewport.getRenderedRange().end;
    const total = this.items().length;

    if (end >= total - 5) {
      this.loadMore.emit();
    }
  }

  trackByKey = (index: number, item: T) => item[this.dataKey()];

  writeValue(obj: T | T[] | undefined | null): void {
    if (obj === undefined || obj === null) {
      this.values.set([]);
      return;
    }

    if (Array.isArray(obj)) {
      this.values.set(obj);
      return;
    }
    this.values.set([obj]);
  }
  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
