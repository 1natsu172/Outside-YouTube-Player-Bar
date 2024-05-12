import {
	type StorageItemOptions,
	type StorageItem,
	centralStorage,
} from "@/core/infrastructures/storage/centralStorage.js";
import type {
	StorageItemConfigInstance,
	StorageItemConfigRaw,
} from "./storage.types.js";

// util hands that think about migrations
export const defineItem = <
	TValue,
	// biome-ignore lint/complexity/noBannedTypes: <explanation>
	TMetadata extends Record<string, unknown> = {},
	Config extends StorageItemConfigInstance<
		StorageItemConfigRaw<string, TValue>
	> = StorageItemConfigInstance<StorageItemConfigRaw<string, TValue>>,
>(
	config: Config,
	storageItemOptions?: Partial<StorageItemOptions<TValue>>,
) => {
	const stoOpts: StorageItemOptions<TValue> = {
		defaultValue: config.defaultValue,
		version: config.version,
		...storageItemOptions,
	};

	const defined = centralStorage.defineItem<TValue, TMetadata>(
		config.storageKey,
		stoOpts,
	);
	return defined;
};

export type DefinedItem<
	TValue,
	// biome-ignore lint/complexity/noBannedTypes: <explanation>
	TMetadata extends Record<string, unknown> = {},
> = StorageItem<TValue, TMetadata>;

export const createStorageConfig = <ConfigRaw extends StorageItemConfigRaw>(
	configRaw: ConfigRaw,
): StorageItemConfigInstance<ConfigRaw> => {
	return {
		...configRaw,
		get storageKey() {
			const { storageArea, itemKey } = configRaw;
			return `${storageArea}:${itemKey}` as `${ConfigRaw["storageArea"]}:${ConfigRaw["itemKey"]}`;
		},
		__savedRaw: configRaw,
	};
};
