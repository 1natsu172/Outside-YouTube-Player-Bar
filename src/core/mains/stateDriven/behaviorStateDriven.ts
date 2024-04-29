import {
	behaviorState,
	siteMetaState,
} from "@/core/repositories/contentScript.repository.js";
import { movePlayerBarElement } from "@/core/services/domAffectServices/playerBarDomAffect.service.js";
import { snapshot } from "valtio";
import { watch } from "valtio/utils";

export const behaviorDriven = () => {
	return watch(async (get) => {
		const state = get(behaviorState);

		// TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		logger.info("behaviorState reacted", state);

		// if (playerMode !== "none") {
		// 	await movePlayerBarElement({
		// 		playerMode,
		// 		direction: state.positionPlayerBar,
		// 	});
		// }
	});
};
