import { Component, computed, inject, input } from '@angular/core';
import { TabButtonIdPipe } from './pipes/tab-button-id.pipe';
import { TabService } from './services/tab.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'sba-tab-panel',
  imports: [TabButtonIdPipe, NgClass],
  template: `
    <div
      [id]="key()"
      [ngClass]="{ hidden: !isActive() }"
      role="tabpanel"
      tabindex="0"
      [attr.aria-labelledby]="key() | tabButtonId"
    >
      <ng-content />
    </div>
  `,
  styles: `.hidden {
      display: none
  }`
})
export class TabPanelComponent {
  private tabService = inject(TabService)

  header = input.required<string>()
  key = input.required<string>()
  isActive = computed(() => this.tabService.activeTabKey() === this.key())
}
