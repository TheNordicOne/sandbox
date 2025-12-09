import {Directive, input} from '@angular/core';
import {SelectOptionTemplateContext} from '../select.types';

@Directive({
  selector: 'ng-template[sbaOptionTemplate]',
})
export class OptionTemplate<T extends object> {
  sbaOptionTemplate = input.required<T[]>();

  static ngTemplateContextGuard<TContextItem extends object>(
    dir: OptionTemplate<TContextItem>,
    ctx: unknown,
  ): ctx is SelectOptionTemplateContext<TContextItem> {
    return true;
  }
}
