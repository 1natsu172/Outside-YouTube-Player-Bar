import { createStorageConfig } from "@/core/infrastructures/storage/index.js";
import type { StorageItem } from "@/core/infrastructures/storage/storage.types.js";

const CONST_KEY = "option:EXT_META";

export type ExtensionMetaOptions<CK extends string = typeof CONST_KEY> = {
	debugModeV1: StorageItem<CK, boolean>;
	forceDisableV1: StorageItem<
		CK,
		boolean,
		{
			disabledExtensionVersion?: string;
			continueForceDisableForNow?:
				| {
						isContinue: true;
						continueChoosedExtensionVersion: string;
				  }
				| {
						isContinue: false;
				  };
		}
	>;
};

export const DebugModeOptionConfig = createStorageConfig({
	storageArea: "local",
	itemKey: `${CONST_KEY}:debugMode`,
	version: 1,
	defaultValue: !import.meta.env.PROD,
	defaultMeta: {},
} as const satisfies ExtensionMetaOptions["debugModeV1"]["config"]);

export const ForceDisableOptionConfig = createStorageConfig({
	storageArea: "local",
	itemKey: `${CONST_KEY}:forceDisable`,
	version: 1,
	defaultValue: false,
	defaultMeta: {},
} as const satisfies ExtensionMetaOptions["forceDisableV1"]["config"]);
