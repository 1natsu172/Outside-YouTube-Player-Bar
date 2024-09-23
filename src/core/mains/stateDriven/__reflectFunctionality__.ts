import { __reflectFunctionalityState__ } from "@/core/repositories/contentScript.repository.js";
import { manageAlwaysDisplayPlayerBar } from "@/core/services/behaviorServices/alwaysDisplayPlayerBar.service.js";
import { movePlayerBarElement } from "@/core/services/domAffectServices/playerBarDomAffect.service.js";
import { snapshot, subscribe } from "valtio/vanilla";

export const reflectFunctionality = () => {
	return subscribe(__reflectFunctionalityState__, async (op) => {
		const feature = snapshot(__reflectFunctionalityState__.feature);
		const context = snapshot(__reflectFunctionalityState__.context);

		logger.info("reflectFunctionality", { feature, context, op });

		await Promise.allSettled([
			movePlayerBarElement({
				direction: feature.behavior.positionPlayerBar,
				playerMode: context.videoPlayerState.mode,
			}),
			manageAlwaysDisplayPlayerBar({
				position: feature.behavior.positionPlayerBar,
				moviePlayerContext: context.moviePlayerContext,
			}),
		]);
	});
};
