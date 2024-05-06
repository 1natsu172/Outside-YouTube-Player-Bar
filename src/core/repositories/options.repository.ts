import {
	allOptionsConfigInstance,
	type AllOptionsValues,
} from "@/core/mains/options/index.js";
import { defineItem } from "@/core/infrastructures/storage/index.js";

/**
 * Define Items
 * @description Extension Meta Options
 */
export const debugMode = defineItem<AllOptionsValues["debugModeV1"]>(
	allOptionsConfigInstance.DebugModeOptionConfig,
);
export const forceDisable = defineItem<AllOptionsValues["forceDisableV1"]>(
	allOptionsConfigInstance.ForceDisableOptionConfig,
);

/**
 * Define Items
 * @description User Options
 */
export const defaultViewBehaviorOption = defineItem<
	AllOptionsValues["defaultViewBehaviorV1"]
>(allOptionsConfigInstance.DefaultViewBehaviorOptionConfig);
export const theaterModeBehaviorOption = defineItem<
	AllOptionsValues["theaterModeBehaviorV1"]
>(allOptionsConfigInstance.TheaterModeBehaviorOptionConfig);
export const fullscreenBehaviorOption = defineItem<
	AllOptionsValues["fullscreenBehaviorV1"]
>(allOptionsConfigInstance.FullscreenBehaviorOptionConfig);
export const showOpenSettingsIconOption = defineItem<
	AllOptionsValues["showOpenSettingsIconV1"]
>(allOptionsConfigInstance.ShowOpenSettingsIconOptionConfig);
