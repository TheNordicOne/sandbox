export interface SelectOptionTemplateContext<T = object> {
  $implicit: T;
  selected: boolean;
}

export interface SelectSelectedValueTemplateContext<T = object> {
  $implicit: T;
}

export interface SelectSelectedValuesTemplateContext<T = object> {
  $implicit: T[];
}
