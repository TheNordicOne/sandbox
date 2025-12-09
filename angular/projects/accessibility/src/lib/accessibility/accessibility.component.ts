import {Component} from '@angular/core'
import {CommonModule} from '@angular/common'
import {TabsComponent} from '../tabs/tabs.component'
import {TabPanelComponent} from '../tabs/tab-panel.component'
import {Select} from '../select/select';

@Component({
  selector: 'sba-accessibility',
  imports: [CommonModule, TabsComponent, TabPanelComponent, Select],
  templateUrl: './accessibility.component.html',
  styleUrl: './accessibility.component.scss',
})
export class AccessibilityComponent {
  items = [
    { value: 'important', label: 'Important' },
    { value: 'starred', label: 'Starred' },
    { value: 'work', label: 'Work' },
    { value: 'personal', label: 'Personal' },
    { value: 'todo', label: 'To Do' },
    { value: 'later', label: 'Later' },
    { value: 'read', label: 'Read' },
    { value: 'travel', label: 'Travel' },
  ];
}
