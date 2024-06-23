export type ObjectValues<T> = T[keyof T];

export function asserUnreachable(x: never) {
  throw new Error('Unreachable code');
}
