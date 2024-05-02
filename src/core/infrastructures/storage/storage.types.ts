import type { StorageArea } from "@/core/infrastructures/storage/constants.js";

export type StorageItemConfigRaw<
	CONST_KEY extends string = string,
	V = unknown,
	M extends Record<string, unknown> = Record<string, unknown>,
> = {
	storageArea: StorageArea;
	itemKey: `${CONST_KEY}:${string}`;
	version: number;
	defaultValue: V;
	defaultMeta: M;
};

//TODO: 型テスト書く
export type StorageItemConfigInstance<ConfigRaw extends StorageItemConfigRaw> =
	ConfigRaw & {
		get storageKey(): `${ConfigRaw["storageArea"]}:${ConfigRaw["itemKey"]}`;
		__savedRaw: ConfigRaw;
	};

export type StorageItem<
	CONST_KEY extends string,
	V,
	M extends Record<string, unknown> = Record<string, unknown>,
> = {
	config: StorageItemConfigRaw<CONST_KEY, V, M>;
	entity: {
		value: V;
		meta: M;
	};
};
