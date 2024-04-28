import {
	currentBehaviorState,
	siteMetaState,
} from "@/core/repositories/contentScript.repository.js";
import { movePlayerBarElement } from "@/core/services/domAffectServices/playerBarDomAffect.service.js";
import { snapshot } from "valtio";
import { watch } from "valtio/utils";

export const currentBehaviorDriven = () => {
	return watch(async (get) => {
		const state = get(currentBehaviorState);
		const playerMode = snapshot(siteMetaState).videoPlayerMode;

		if (playerMode !== "none") {
			await movePlayerBarElement({
				playerMode,
				direction: state.positionPlayerBar,
			});
		}
		logger.info("currentBehaviorState reacted", state);
	});
};
