export type ValueOf<T> = T[keyof T]
export type NestedValueOf<T> = T extends object
  ? { [K in keyof T]: NestedValueOf<T[K]> }[keyof T]
  : T
