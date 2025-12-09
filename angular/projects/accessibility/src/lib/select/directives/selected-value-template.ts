import {Directive, input} from '@angular/core';
import {SelectSelectedValuesTemplateContext, SelectSelectedValueTemplateContext} from '../select.types';

@Directive({
  selector: 'ng-template[sbaSelectedValueTemplate]',
})
export class SelectedValueTemplate<T extends object> {
  sbaSelectedValueTemplate = input.required<T[]>();

  static ngTemplateContextGuard<TContextItem extends object>(
    dir: SelectedValueTemplate<TContextItem>,
    ctx: unknown,
  ): ctx is SelectSelectedValueTemplateContext<TContextItem> {
    return true;
  }
}

@Directive({
  selector: 'ng-template[sbaSelectedValuesTemplate]',
})
export class SelectedValuesTemplate<T extends object> {
  sbaSelectedValuesTemplate = input.required<T[]>();

  static ngTemplateContextGuard<TContextItem extends object>(
    dir: SelectedValuesTemplate<TContextItem>,
    ctx: unknown,
  ): ctx is SelectSelectedValuesTemplateContext<TContextItem> {
    return true;
  }
}
