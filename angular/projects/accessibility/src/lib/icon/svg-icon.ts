import {ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation,} from '@angular/core';
import {ICONS, Icons} from './icons';

@Component({
  selector: 'sba-icon',
  imports: [],
  templateUrl: './svg-icon.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SvgIcon {
  icon = input.required<Icons>();
  label = input<string>();
  sizeFactor = input(1);
  baseSize = input(16);

  size = computed(() => this.baseSize() * this.sizeFactor());
  svgSprite = computed(() => ICONS[this.icon()].svgSprite);
}
