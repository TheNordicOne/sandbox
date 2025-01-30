import { ObjectValues } from 'shared'

export type DynamicForm = {
  groups: DynamicFormGroup[]
}

export type BaseDynamicFormGroup = {
  id: string
  title?: string
  content?: (DynamicControl | DynamicFormGroup)[]
  showIf?: Condition
}

export type FlatDynamicFormGroup = BaseDynamicFormGroup & {
  type: 'flat-group'
}

export type NestedDynamicFormGroup = BaseDynamicFormGroup & {
  type: 'nested-group'
  keepAttachedIfHidden?: boolean
}

export type DynamicFormGroup = FlatDynamicFormGroup | NestedDynamicFormGroup

export type DynamicControl =
  | TextControl
  | NumericControl
  | RadioControl
  | DropdownControl
  | CheckboxControl

export type BaseControl = {
  id: string
  label: string
  required?: boolean
  resetValueIfHidden?: boolean
  keepAttachedIfHidden?: boolean
  showIf?: Condition
}

export type TextControl = BaseControl & {
  type: 'text'
  value?: string
  default?: string
  minLength?: number
  maxLength?: number
}

export type NumericControl = BaseControl & {
  type: 'numeric'
  value?: number
  default?: number
  min?: number
  max?: number
  allowNegative?: boolean
}

export type RadioControl = BaseControl & {
  type: 'radio'
  value?: string
  options: Option[]
  default?: string
}

export type DropdownControl = BaseControl & {
  type: 'dropdown'
  value?: string
  options: Option[]
  default?: string
}

export type CheckboxControl = BaseControl & {
  type: 'checkbox'
  value?: boolean
  default?: boolean
}

export type Option = {
  id: string
  label: string
  value: string
}

export type Condition = {
  controlId: string | string[]
  comparer: Comparer
  compareValue?: unknown
  default?: unknown
  and?: Condition
  or?: Condition
}

export const COMPARER = {
  EQUALS: 'eq',
  LARGER: 'lt',
  SMALLER: 'st',
  EMPTY: 'empty',
  NOT_EMPTY: 'notEmpty',
  EQUAL_OR_EMPTY: 'eqOrEmpty',
} as const

export type Comparer = ObjectValues<typeof COMPARER>
