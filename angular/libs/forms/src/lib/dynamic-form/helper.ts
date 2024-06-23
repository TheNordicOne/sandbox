import { ControlContainer } from '@angular/forms';
import { inject } from '@angular/core';
import { COMPARER, Comparer, Condition } from './dynamic-form.type';
import { asserUnreachable } from '@sandbox/utils';

export const viewProviders = [
  {
    provide: ControlContainer,
    useFactory: () => inject(ControlContainer, { skipSelf: true })
  }
];

export function shouldBeShown(showIf: Condition | undefined, value: unknown): boolean {
  if (!showIf) {
    return false;
  }
  const { controlId, compareValue, comparer } = showIf;
  // @ts-expect-error: Which values are available is only known at runtime
  const isValue = value[controlId];
  const mainConditionMet = compareValues(compareValue, isValue, comparer);
  const andConditionMet = showIf.and ? shouldBeShown(showIf.and, value) : true;
  const orConditionMet = showIf.or ? shouldBeShown(showIf.or, value) : false;

  return (mainConditionMet && andConditionMet) || orConditionMet;
}

export function compareValues(compareValue: unknown, is: unknown, comparer: Comparer): boolean {
  switch (comparer) {
    case COMPARER.EQUALS:
      return compareValue === is;
    case COMPARER.EQUAL_OR_EMPTY:
      return isEqualOrEmpty(compareValue, is);
    case COMPARER.LARGER:
      return isLarger(compareValue, is);
    case COMPARER.SMALLER:
      return isSmaller(compareValue, is);
    case COMPARER.EMPTY:
      return isEmpty(is);
    case COMPARER.NOT_EMPTY:
      return !isEmpty(is);
    default:
      asserUnreachable(comparer);
      return false;
  }
}

function isLarger(compareValue: unknown, is: unknown): boolean {

  if (typeof compareValue !== typeof is) {
    return false;
  }
  switch (typeof compareValue) {
    case 'bigint':
      return (compareValue as bigint) < (is as bigint);
    case 'number':
      return (compareValue as number) < (is as number);
    case 'undefined':
    case 'object':
    case 'boolean':
    case 'string':
    case 'function':
    case 'symbol':
    default:
      return false;
  }
}

function isSmaller(compareValue: unknown, is: unknown): boolean {

  if (typeof compareValue !== typeof is) {
    return false;
  }
  switch (typeof compareValue) {
    case 'bigint':
      return (compareValue as bigint) > (is as bigint);
    case 'number':
      return (compareValue as number) > (is as number);
    case 'undefined':
    case 'object':
    case 'boolean':
    case 'string':
    case 'function':
    case 'symbol':
    default:
      return false;
  }
}

function isEmpty(is: unknown): boolean {
  if (typeof is === 'string') {
    return is.length === 0;
  }
  return is === null || is === undefined;
}

function isEqualOrEmpty(compareValue: unknown, is: unknown): boolean {
  return isEmpty(is) || compareValue === is;
}
