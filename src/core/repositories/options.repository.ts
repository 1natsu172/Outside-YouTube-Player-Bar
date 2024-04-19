import { allOptionsConfig } from "@/core/mains/options/index.js";
import { defineItem } from "@/core/infrastructures/storage/index.js";

/**
 * Define Items
 * @description Extension Meta Options
 */
export const debugMode = defineItem(allOptionsConfig.DebugModeOptionConfig);
export const forceDisable = defineItem(
	allOptionsConfig.ForceDisableOptionConfig,
);

/**
 * Define Items
 * @description User Options
 */
export const defaultViewBehaviorOption = defineItem(
	allOptionsConfig.DefaultViewBehaviorOptionConfig,
);
export const theaterModeBehaviorOption = defineItem(
	allOptionsConfig.TheaterModeBehaviorOptionConfig,
);
export const fullscreenBehaviorOption = defineItem(
	allOptionsConfig.FullscreenBehaviorOptionConfig,
);
