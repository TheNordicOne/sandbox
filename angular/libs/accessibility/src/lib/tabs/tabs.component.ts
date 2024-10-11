import {
  AfterViewInit,
  Component,
  contentChildren,
  viewChildren,
} from '@angular/core'
import { NgClass } from '@angular/common'
import { TabButtonIdPipe } from './pipes/tab-button-id.pipe'
import { TabIndexPipe } from './pipes/tab-index.pipe'
import { TabComponent } from './tab.component'
import { FocusKeyManager } from '@angular/cdk/a11y'
import { TabService } from './services/tab.service'
import { TabPanelComponent } from './tab-panel.component'

@Component({
  selector: 'sba-tabs',
  standalone: true,
  imports: [NgClass, TabButtonIdPipe, TabIndexPipe, TabComponent],
  template: `
    <div role="tablist" (keydown)="onKeydown($event)">
      @for (tab of tabPanels(); track tab; let i = $index) {
      <sba-tab [tab]="tab" />
      }
    </div>

    <div>
      <ng-content />
    </div>
  `,
  providers: [TabService],
})
export class TabsComponent implements AfterViewInit {
  tabs = viewChildren<TabComponent>(TabComponent)

  keyManager: FocusKeyManager<TabComponent> | undefined
  tabPanels = contentChildren<TabPanelComponent>(TabPanelComponent)

  onKeydown(event: KeyboardEvent) {
    const { key } = event
    if (key === 'ArrowUp' || key === 'ArrowDown') {
      return
    }

    this.keyManager?.onKeydown(event)
  }

  ngAfterViewInit() {
    this.keyManager = new FocusKeyManager<TabComponent>(this.tabs())
      .withWrap()
      .withHomeAndEnd()
      .withHorizontalOrientation('ltr')
    this.keyManager?.setFirstItemActive()
  }
}
