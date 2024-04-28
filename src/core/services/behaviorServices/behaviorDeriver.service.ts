import { setPositionPlayerBar } from "@/core/usecases/behavior.usecase.js";
import { defaultViewBehaviorOption } from "@/core/repositories/options.repository.js";
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
				return await defaultViewBehaviorOption.getValue();
			case "fullscreen":
				return await defaultViewBehaviorOption.getValue();
			default: {
				const err = ["This log that should never be reached!", videoPlayerMode];
				logger.warn(err);
				throw Error(...err);
			}
		}
	}

	const userOption = await resolveUserOption();
	setPositionPlayerBar(userOption.positionPlayerBar);
};
