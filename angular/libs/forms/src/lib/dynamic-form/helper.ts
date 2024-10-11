import { ControlContainer } from '@angular/forms'
import { inject } from '@angular/core'
import { COMPARER, Comparer, Condition } from './dynamic-form.type'
import { asserUnreachable } from '@sandbox/utils'

export const viewProviders = [
  {
    provide: ControlContainer,
    useFactory: () => inject(ControlContainer, { skipSelf: true }),
  },
]

export function shouldBeShown(
  showIf: Condition | undefined,
  value: unknown,
): boolean {
  if (!showIf) {
    return false
  }
  const { controlId, compareValue, comparer } = showIf
  const isValue = getValueObject(value, controlId)
  const mainConditionMet = compareValues(compareValue, isValue, comparer)
  const andConditionMet = showIf.and ? shouldBeShown(showIf.and, value) : true
  const orConditionMet = showIf.or ? shouldBeShown(showIf.or, value) : false

  return (mainConditionMet && andConditionMet) || orConditionMet
}

export function compareValues(
  compareValue: unknown,
  is: unknown,
  comparer: Comparer,
): boolean {
  switch (comparer) {
    case COMPARER.EQUALS:
      return compareValue === is
    case COMPARER.EQUAL_OR_EMPTY:
      return isEqualOrEmpty(compareValue, is)
    case COMPARER.LARGER:
      return isLarger(compareValue, is)
    case COMPARER.SMALLER:
      return isSmaller(compareValue, is)
    case COMPARER.EMPTY:
      return isEmpty(is)
    case COMPARER.NOT_EMPTY:
      return !isEmpty(is)
    default:
      asserUnreachable(comparer)
      return false
  }
}

export function deepEqual(obj1: unknown, obj2: unknown): boolean {
  if (obj1 === obj2) {
    return true
  }

  if (
    typeof obj1 !== 'object' ||
    obj1 === null ||
    typeof obj2 !== 'object' ||
    obj2 === null
  ) {
    return false
  }

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    // @ts-expect-error: Which values are available is only known at runtime
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false
    }
  }

  return true
}

function getValueObject(value: unknown, path: string | string[]): unknown {
  if ((typeof path === 'string' && path.includes('.')) || Array.isArray(path)) {
    return accessNestedObject(value, path)
  }
  return findNestedValue(value, path)
}

function accessNestedObject(value: unknown, path: string | string[]): unknown {
  if (typeof path === 'string') {
    path = path.split('.')
  }

  // @ts-expect-error: Which values are available is only known at runtime
  return path.reduce(
    (acc, key) => (acc && acc[key] !== 'undefined' ? acc[key] : undefined),
    value,
  )
}

function findNestedValue(value: unknown, key: string): unknown {
  if (value && typeof value === 'object' && key in value) {
    // @ts-expect-error: Which values are available is only known at runtime
    return value[key]
  }
  if (value && typeof value === 'object') {
    for (const prop in value) {
      if (prop in value) {
        // @ts-expect-error: Which values are available is only known at runtime
        const nestedValue = findNestedValue(value[prop], key)
        if (nestedValue !== undefined) {
          return nestedValue
        }
      }
    }
  }

  return undefined
}

function isLarger(compareValue: unknown, is: unknown): boolean {
  if (typeof compareValue !== typeof is) {
    return false
  }
  switch (typeof compareValue) {
    case 'bigint':
      return (compareValue as bigint) < (is as bigint)
    case 'number':
      return (compareValue as number) < (is as number)
    case 'undefined':
    case 'object':
    case 'boolean':
    case 'string':
    case 'function':
    case 'symbol':
    default:
      return false
  }
}

function isSmaller(compareValue: unknown, is: unknown): boolean {
  if (typeof compareValue !== typeof is) {
    return false
  }
  switch (typeof compareValue) {
    case 'bigint':
      return (compareValue as bigint) > (is as bigint)
    case 'number':
      return (compareValue as number) > (is as number)
    case 'undefined':
    case 'object':
    case 'boolean':
    case 'string':
    case 'function':
    case 'symbol':
    default:
      return false
  }
}

function isEmpty(is: unknown): boolean {
  if (typeof is === 'string') {
    return is.length === 0
  }
  return is === null || is === undefined
}

function isEqualOrEmpty(compareValue: unknown, is: unknown): boolean {
  return isEmpty(is) || compareValue === is
}
