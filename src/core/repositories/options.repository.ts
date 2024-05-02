import { allOptionsConfigInstance } from "@/core/mains/options/index.js";
import { defineItem } from "@/core/infrastructures/storage/index.js";

/**
 * Define Items
 * @description Extension Meta Options
 */
export const debugMode = defineItem(
	allOptionsConfigInstance.DebugModeOptionConfig,
);
export const forceDisable = defineItem(
	allOptionsConfigInstance.ForceDisableOptionConfig,
);

/**
 * Define Items
 * @description User Options
 */
export const defaultViewBehaviorOption = defineItem(
	allOptionsConfigInstance.DefaultViewBehaviorOptionConfig,
);
export const theaterModeBehaviorOption = defineItem(
	allOptionsConfigInstance.TheaterModeBehaviorOptionConfig,
);
export const fullscreenBehaviorOption = defineItem(
	allOptionsConfigInstance.FullscreenBehaviorOptionConfig,
);
export const showOpenSettingsIconOption = defineItem(
	allOptionsConfigInstance.ShowOpenSettingsIconOptionConfig,
);
