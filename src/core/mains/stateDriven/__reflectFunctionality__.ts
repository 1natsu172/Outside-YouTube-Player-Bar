import { waitMainWorldReady } from "@/core/mains/stateDriven/operationStateDriven.js";
import { isVideoPage } from "@/core/presenters/judgePage.js";
import { getCurrentLocation } from "@/core/presenters/navigationPresenter/index.js";
import { __reflectFunctionalityState__ } from "@/core/repositories/contentScript.repository.js";
import { manageAlwaysDisplayPlayerBar } from "@/core/services/behaviorServices/alwaysDisplayPlayerBar.service.js";
import { movePlayerBarElement } from "@/core/services/domAffectServices/playerBarDomAffect.service.js";
import { Mutex } from "async-mutex";
import { snapshot, subscribe } from "valtio/vanilla";

const mutex = new Mutex();

export const reflectFunctionality = () => {
	return subscribe(__reflectFunctionalityState__, async (op) => {
		const feature = snapshot(__reflectFunctionalityState__.feature);
		const context = snapshot(__reflectFunctionalityState__.context);

		logger.info(
			"reflectFunctionality",
			{ feature, context, op },
			{ mutex: { isLocked: mutex.isLocked() } },
		);

		if (!isVideoPage(getCurrentLocation().pathname)) {
			logger.warn("reflectFunctionality but is not video page.");
			return;
		}

		await mutex
			.runExclusive(async () => {
				await waitMainWorldReady();
				await Promise.allSettled([
					movePlayerBarElement({
						direction: feature.behavior.positionPlayerBar,
						playerMode: context.videoPlayerState.mode,
					}),
					manageAlwaysDisplayPlayerBar({
						position: feature.behavior.positionPlayerBar,
						moviePlayerContext: context.moviePlayerContext,
					}),
				]).catch((e) => {
					logger.error("functionality settled error", e);
				});
			})
			.catch((e) => {
				logger.error("mutex error", e);
			});
	});
};
