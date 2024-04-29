import type { SiteMetaState } from "@/core/mains/contentScriptState.js";
import {
	defaultViewBehaviorOption,
	fullscreenBehaviorOption,
	theaterModeBehaviorOption,
} from "@/core/repositories/options.repository.js";

export async function resolveBehaviorOption(
	videoPlayerMode: SiteMetaState["videoPlayerState"]["mode"],
) {
	switch (videoPlayerMode) {
		case "defaultView":
			return await defaultViewBehaviorOption.getValue();
		case "theaterMode":
			return await theaterModeBehaviorOption.getValue();
		case "fullscreen":
			return await fullscreenBehaviorOption.getValue();
		default: {
			const err = ["This log that should never be reached!", videoPlayerMode];
			logger.warn(err);
			throw Error(...err);
		}
	}
}
