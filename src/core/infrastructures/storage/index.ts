import {
	type StorageItemOptions,
	centralStorage,
} from "@/core/infrastructures/storage/centralStorage.js";
import type {
	StorageItemConfigInstance,
	StorageItemConfigRaw,
} from "./storage.types.js";
import type { WxtStorageItem } from "wxt/storage";

// util hands that think about migrations
export const defineItem = <
	Config extends StorageItemConfigInstance<StorageItemConfigRaw>,
>(
	config: Config,
	storageItemOptions?: Partial<StorageItemOptions<Config["defaultValue"]>>,
) => {
	const stoOpts: StorageItemOptions<Config["defaultValue"]> = {
		defaultValue: config.defaultValue,
		version: config.version,
		...storageItemOptions,
	};

	const defined = centralStorage.defineItem<Config["defaultValue"]>(
		config.storageKey,
		stoOpts,
	);
	return defined;
};

export type DefinedItem<
	TValue,
	// biome-ignore lint/complexity/noBannedTypes: <explanation>
	TMetadata extends Record<string, unknown> = {},
> = WxtStorageItem<TValue, TMetadata>;

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
