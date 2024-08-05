import { __reflectFunctionalityState__ } from "@/core/repositories/contentScript.repository.js";
import { movePlayerBarElement } from "@/core/services/domAffectServices/playerBarDomAffect.service.js";
import { snapshot, subscribe } from "valtio/vanilla";

export const reflectFunctionality = () => {
	return subscribe(__reflectFunctionalityState__, async (op) => {
		const feature = snapshot(__reflectFunctionalityState__.feature);
		const context = snapshot(__reflectFunctionalityState__.context);

		logger.info("reflectFunctionality", { feature, context, op });

		await movePlayerBarElement({
			direction: feature.behavior.positionPlayerBar,
			playerMode: context.videoPlayerState.mode,
		});
	});
};
