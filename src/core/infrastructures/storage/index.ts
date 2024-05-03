import {
	type StorageItemOptions,
	centralStorage,
} from "@/core/infrastructures/storage/centralStorage.js";
import type {
	StorageItemConfigInstance,
	StorageItemConfigRaw,
} from "./storage.types.js";

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
	// FIXME: PATCH for bug... https://github.com/wxt-dev/wxt/issues/645
	defined.setValue(stoOpts.defaultValue);
	return defined;
};

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
