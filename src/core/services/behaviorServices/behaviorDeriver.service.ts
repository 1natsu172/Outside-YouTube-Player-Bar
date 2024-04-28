import {
	__forceReaction__,
	setPositionPlayerBar,
} from "@/core/usecases/behaviorState.usecase.js";
import {
	defaultViewBehaviorOption,
	fullscreenBehaviorOption,
	theaterModeBehaviorOption,
} from "@/core/repositories/options.repository.js";
import type { ContentScriptState } from "@/core/mains/contentScriptState.js";

export const derivePositionPlayerBar = async ({
	videoPlayerMode,
}: { videoPlayerMode: ContentScriptState["siteMeta"]["videoPlayerMode"] }) => {
	if (videoPlayerMode === "none") {
		return;
	}

	async function resolveUserOption() {
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

	const userOption = await resolveUserOption();
	setPositionPlayerBar(userOption.positionPlayerBar);
	// TODO: 誤作動起こすかもしれないので本当にここれやるか見直す
	__forceReaction__();
};
