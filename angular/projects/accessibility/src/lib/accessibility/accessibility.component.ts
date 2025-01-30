import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TabsComponent } from '../tabs/tabs.component'
import { TabPanelComponent } from '../tabs/tab-panel.component'

@Component({
    selector: 'sba-accessibility',
    imports: [CommonModule, TabsComponent, TabPanelComponent],
    templateUrl: './accessibility.component.html',
    styleUrl: './accessibility.component.scss'
})
export class AccessibilityComponent {}
