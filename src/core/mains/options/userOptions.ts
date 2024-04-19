import type { ExtensionBehavior } from "../extensionFeatures.js";
import type { Option } from "./options.types.js";

const CONST_KEY = "option:USER";

export interface UserOptions<CK extends string = typeof CONST_KEY> {
	defaultViewBehaviorV1: Option<CK, ExtensionBehavior>;
	theaterModeBehaviorV1: Option<CK, ExtensionBehavior>;
	fullscreenBehaviorV1: Option<CK, ExtensionBehavior>;
}

export const DefaultViewBehaviorOptionConfig = {
	storageArea: "sync",
	storageKey: `${CONST_KEY}:defaultViewBehavior`,
	version: 1,
	defaultValue: {
		alwaysDisplayPlayerBar: true,
		positionPlayerBar: "outside",
	},
	defaultMeta: {},
} as const satisfies UserOptions["defaultViewBehaviorV1"]["config"];

export const TheaterModeBehaviorOptionConfig = {
	storageArea: "sync",
	storageKey: `${CONST_KEY}:theaterModeBehavior`,
	version: 1,
	defaultValue: {
		alwaysDisplayPlayerBar: true,
		positionPlayerBar: "outside",
	},
	defaultMeta: {},
} as const satisfies UserOptions["theaterModeBehaviorV1"]["config"];

export const FullscreenBehaviorOptionConfig = {
	storageArea: "sync",
	storageKey: `${CONST_KEY}:fullscreenBehavior`,
	version: 1,
	defaultValue: {
		alwaysDisplayPlayerBar: false,
		positionPlayerBar: "inside",
	},
	defaultMeta: {},
} as const satisfies UserOptions["fullscreenBehaviorV1"]["config"];
