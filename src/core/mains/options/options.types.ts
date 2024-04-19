import type { StorageArea } from "@/core/infrastructures/storage/constants.js";

export type OptionConfig<
	CONST_KEY extends string,
	V,
	M extends Record<string, unknown> = Record<string, never>,
> = {
	storageArea: StorageArea;
	storageKey: `${CONST_KEY}:${string}`;
	version: number;
	defaultValue: V;
	defaultMeta: M;
};
export type Option<
	CONST_KEY extends string,
	V,
	M extends Record<string, unknown> = Record<string, never>,
> = {
	config: OptionConfig<CONST_KEY, V, M>;
	entity: {
		value: V;
		meta: M;
	};
};
