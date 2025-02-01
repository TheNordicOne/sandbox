export type ObjectValues<T> = T[keyof T]

export function assertUnreachable(x: never) {
  throw new Error('Unreachable code')
}
