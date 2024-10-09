import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { FocusableOption } from '@angular/cdk/a11y';
import { TabButtonIdPipe } from './pipes/tab-button-id.pipe';
import { TabIndexPipe } from './pipes/tab-index.pipe';
import { TabPanelComponent } from './tab-panel.component';
import { TabService } from './services/tab.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'sba-tab',
  standalone: true,
  imports: [TabButtonIdPipe, TabIndexPipe, NgClass],
  template: ` <button
    #tab
    [id]="tabKey() | tabButtonId"
    type="button"
    role="tab"
    [attr.tabindex]="isActive() | tabIndex"
    [attr.aria-controls]="tabKey()"
    [attr.aria-selected]="isActive()"
    (click)="onChangeTab()"
    [ngClass]="{ active: isActive() }"
  >
    <span>{{ header() }}</span>
  </button>`,
  styles: `
    .active {
        color: midnightblue;
        font-weight: 600;
    }
  `,
})
export class TabComponent implements FocusableOption {
  private tabService = inject(TabService);
  private element = viewChild<ElementRef>('tab');

  tab = input.required<TabPanelComponent>();
  tabKey = computed(() => this.tab().key());
  isActive = computed(() => this.tab().isActive());
  header = computed(() => this.tab().header());

  focus(): void {
    this.tabService.onChangeTab(this.tab().key());
    this.element()?.nativeElement?.focus();
  }

  getLabel?(): string {
    return this.header();
  }

  onChangeTab() {
    this.tabService.onChangeTab(this.tab().key());
  }
}
