import type { VideoPlayerMode } from "@/core/mains/contentScriptState.js";
import {
	getDefaultViewBehaviorOption,
	getFullscreenBehaviorOption,
	getTheaterModeBehaviorOption,
} from "@/core/presenters/storagePresenter/options.presenter.js";
import {
	setDefaultViewBehaviorOption,
	setFullscreenBehaviorOption,
	setTheaterModeBehaviorOption,
} from "@/core/usecases/options.usecase.js";

export { setShowOpenSettingsIconOption } from "@/core/usecases/options.usecase.js";

export function resolveBehaviorOptionHandlers(mode: VideoPlayerMode) {
	switch (mode) {
		case "defaultView": {
			return {
				presenter: getDefaultViewBehaviorOption,
				usecase: setDefaultViewBehaviorOption,
			};
		}
		case "theaterMode": {
			return {
				presenter: getTheaterModeBehaviorOption,
				usecase: setTheaterModeBehaviorOption,
			};
		}
		case "fullscreen": {
			return {
				presenter: getFullscreenBehaviorOption,
				usecase: setFullscreenBehaviorOption,
			};
		}
		default: {
			throw Error(`not impl for this video player mode: "${mode}"`);
		}
	}
}
