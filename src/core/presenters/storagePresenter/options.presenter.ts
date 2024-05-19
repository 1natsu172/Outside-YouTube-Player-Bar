import type { VideoPlayerMode } from "@/core/mains/contentScriptState.js";
import type { ExtensionBehavior } from "@/core/mains/extensionFeatures.js";
import * as repo from "@/core/repositories/options.repository.js";

export async function resolveBehaviorOption(videoPlayerMode: VideoPlayerMode) {
	switch (videoPlayerMode) {
		case "defaultView":
			return await repo.defaultViewBehaviorOption.getValue();
		case "theaterMode":
			return await repo.theaterModeBehaviorOption.getValue();
		case "fullscreen":
			return await repo.fullscreenBehaviorOption.getValue();
		default: {
			const err = ["This log that should never be reached!", videoPlayerMode];
			logger.warn(err);
			throw Error(...err);
		}
	}
}

export function resolveInheritPositionPlayerBar({
	inheritPositionSetting,
	fromPosition,
}: {
	inheritPositionSetting: ExtensionBehavior["inheritPositionPlayerBarBeforeSwitching"];
	fromPosition: VideoPlayerMode;
}): boolean {
	if (fromPosition === "none") {
		return false;
	}
	return inheritPositionSetting.includes(fromPosition);
}

export function createInheritablePositionPlayerBarData(
	mode: Exclude<VideoPlayerMode, "none">,
) {
	const DATA_SET = new Set<Exclude<VideoPlayerMode, "none">>([
		"defaultView",
		"theaterMode",
		"fullscreen",
	]);
	DATA_SET.delete(mode);
	return [...DATA_SET];
}

export const getDebugModeOption = async () => {
	return await repo.debugMode.getValue();
};
export const getForceDisableOption = async () => {
	return {
		value: await repo.forceDisable.getValue(),
		meta: await repo.forceDisable.getMeta(),
	};
};
export const getDefaultViewBehaviorOption = async () => {
	return await repo.defaultViewBehaviorOption.getValue();
};
export const getTheaterModeBehaviorOption = async () => {
	return await repo.theaterModeBehaviorOption.getValue();
};
export const getFullscreenBehaviorOption = async () => {
	return await repo.fullscreenBehaviorOption.getValue();
};
export const getShowOpenSettingsIconOption = async () => {
	return await repo.showOpenSettingsIconOption.getValue();
};
