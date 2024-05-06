import type { SiteMetaState } from "@/core/mains/contentScriptState.js";
import * as repo from "@/core/repositories/options.repository.js";

export async function resolveBehaviorOption(
	videoPlayerMode: SiteMetaState["videoPlayerState"]["mode"],
) {
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

export const getDebugModeOption = async () => {
	return await repo.debugMode.getValue();
};
export const getForceDisableOption = async () => {
	return await repo.forceDisable.getValue();
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
