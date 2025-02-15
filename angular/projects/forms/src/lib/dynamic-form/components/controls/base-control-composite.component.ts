import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { viewProviders } from '../../helper';
import { BaseControlDirective } from './base-control.directive';
import { DynamicControl } from '../../dynamic-form.type';

@Component({
  selector: 'sbf-base-control',
  imports: [],
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders,
  hostDirectives: [
    {
      directive: BaseControlDirective,
      inputs: ['control']
    }
  ]
})
export class BaseControlCompositeComponent<T extends DynamicControl> {
  private readonly baseControl = inject(BaseControlDirective<T>);

  isVisible = this.baseControl.isVisible;
  control = this.baseControl.control;
  e2eId = this.baseControl.e2eId;
}
