export type ValueOf<T> = T[keyof T];
export type NestedValueOf<T> = T extends object
	? { [K in keyof T]: NestedValueOf<T[K]> }[keyof T]
	: T;

export type NonUndefined<T> = T extends undefined ? never : T;

export type IterableElement<TargetIterable> = TargetIterable extends Iterable<
	infer ElementType
>
	? ElementType
	: TargetIterable extends AsyncIterable<infer ElementType>
		? ElementType
		: never;
