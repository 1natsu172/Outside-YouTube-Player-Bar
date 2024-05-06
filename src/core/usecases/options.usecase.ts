import * as repo from "@/core/repositories/options.repository.js";
import type {
	AllOptionsValues,
	AllOptionsMeta,
} from "@/core/mains/options/index.js";

//// extensionMetaOptions
export const setDebugModeOption = async (
	option?: AllOptionsValues["debugModeV1"],
	meta?: AllOptionsMeta["debugModeV1"],
) => {
	if (option) {
		await repo.debugMode.setValue(option);
	}
	if (meta) {
		await repo.debugMode.setMeta(meta);
	}
};
export const setForceDisableOption = async (
	option?: AllOptionsValues["forceDisableV1"],
	meta?: AllOptionsMeta["forceDisableV1"],
) => {
	if (option) {
		await repo.forceDisable.setValue(option);
	}
	if (meta) {
		await repo.forceDisable.setMeta(meta);
	}
};

//// UserOptions
export const setDefaultViewBehaviorOption = async (
	option?: AllOptionsValues["defaultViewBehaviorV1"],
	meta?: AllOptionsMeta["defaultViewBehaviorV1"],
) => {
	if (option) {
		await repo.defaultViewBehaviorOption.setValue(option);
	}
	if (meta) {
		await repo.defaultViewBehaviorOption.setMeta(meta);
	}
};
export const setTheaterModeBehaviorOption = async (
	option?: AllOptionsValues["theaterModeBehaviorV1"],
	meta?: AllOptionsMeta["theaterModeBehaviorV1"],
) => {
	if (option) {
		await repo.theaterModeBehaviorOption.setValue(option);
	}
	if (meta) {
		await repo.theaterModeBehaviorOption.setMeta(meta);
	}
};
export const setFullscreenBehaviorOption = async (
	option?: AllOptionsValues["fullscreenBehaviorV1"],
	meta?: AllOptionsMeta["fullscreenBehaviorV1"],
) => {
	if (option) {
		await repo.fullscreenBehaviorOption.setValue(option);
	}
	if (meta) {
		await repo.fullscreenBehaviorOption.setMeta(meta);
	}
};
export const setShowOpenSettingsIconOption = async (
	option?: AllOptionsValues["showOpenSettingsIconV1"],
	meta?: AllOptionsMeta["showOpenSettingsIconV1"],
) => {
	if (option) {
		await repo.showOpenSettingsIconOption.setValue(option);
	}
	if (meta) {
		await repo.showOpenSettingsIconOption.setMeta(meta);
	}
};
