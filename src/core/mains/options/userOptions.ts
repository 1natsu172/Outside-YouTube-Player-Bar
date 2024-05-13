import { createStorageConfig } from "@/core/infrastructures/storage/index.js";
import type { StorageItem } from "@/core/infrastructures/storage/storage.types.js";
import type { ExtensionBehavior } from "@/core/mains/extensionFeatures.js";

const CONST_KEY = "option:USER";

export interface UserOptions<CK extends string = typeof CONST_KEY> {
	defaultViewBehaviorV1: StorageItem<CK, ExtensionBehavior>;
	theaterModeBehaviorV1: StorageItem<CK, ExtensionBehavior>;
	fullscreenBehaviorV1: StorageItem<CK, ExtensionBehavior>;
	showOpenSettingsIconV1: StorageItem<CK, boolean>;
}

export const DefaultViewBehaviorOptionConfig = createStorageConfig({
	storageArea: "sync",
	itemKey: `${CONST_KEY}:defaultViewBehavior`,
	version: 1,
	defaultValue: {
		alwaysDisplayPlayerBar: true,
		inheritPositionPlayerBarBeforeSwitching: true,
		positionPlayerBar: "outside",
	},
	defaultMeta: {},
} as const satisfies UserOptions["defaultViewBehaviorV1"]["config"]);

export const TheaterModeBehaviorOptionConfig = createStorageConfig({
	storageArea: "sync",
	itemKey: `${CONST_KEY}:theaterModeBehavior`,
	version: 1,
	defaultValue: {
		alwaysDisplayPlayerBar: true,
		inheritPositionPlayerBarBeforeSwitching: true,
		positionPlayerBar: "outside",
	},
	defaultMeta: {},
} as const satisfies UserOptions["theaterModeBehaviorV1"]["config"]);

export const FullscreenBehaviorOptionConfig = createStorageConfig({
	storageArea: "sync",
	itemKey: `${CONST_KEY}:fullscreenBehavior`,
	version: 1,
	defaultValue: {
		alwaysDisplayPlayerBar: false,
		inheritPositionPlayerBarBeforeSwitching: false,
		positionPlayerBar: "inside",
	},
	defaultMeta: {},
} as const satisfies UserOptions["fullscreenBehaviorV1"]["config"]);

export const ShowOpenSettingsIconOptionConfig = createStorageConfig({
	storageArea: "sync",
	itemKey: `${CONST_KEY}:showOpenSettingsIcon`,
	version: 1,
	defaultValue: true,
	defaultMeta: {},
} as const satisfies UserOptions["showOpenSettingsIconV1"]["config"]);
