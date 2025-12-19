import {ChangeDetectionStrategy, Component, ElementRef, input, viewChild,} from '@angular/core';
import {Menu, MenuContent, MenuItem, MenuTrigger} from '@angular/aria/menu';
import {OverlayModule} from '@angular/cdk/overlay';
import {Severity, Variant} from './types';
import {PopupMenuItem} from './popup-menu-item';

@Component({
  selector: 'sbc-popup-menu',
  imports: [
    OverlayModule,
    MenuItem,
    Menu,
    MenuContent,
    MenuTrigger,
  ],
  templateUrl: './popup-menu.html',
  styleUrl: './popup-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupMenu<T> {
  menu = viewChild<Menu<string>>('menu');
  origin = viewChild.required('triggerButton', { read: ElementRef });
  items = input.required<PopupMenuItem<T>[]>();

  data = input<T>();
  severity = input<Severity>('primary');
  variant = input<Variant>('full');
  iconLeft = input<string>();
  iconRight = input<string>();
  iconSizeFactor = input<number>(1);
  iconColor = input<string>('none');
  ariaLabel = input<string>();
  title = input<string>();
}
