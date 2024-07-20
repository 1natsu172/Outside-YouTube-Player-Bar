import { behaviorState } from "@/core/repositories/contentScript.repository.js";
import { createPlayerHackEventFn } from "@/core/services/behaviorServices/alwaysDisplayPlayerBar.service.js";
import { waitElement } from "@1natsu/wait-element";
import { subscribe } from "valtio/vanilla";
import { elementQuery } from "../meta.js";

export const behaviorDriven = () => {
	return subscribe(behaviorState, async (ops) => {
		logger.info("behaviorState reacted", ops);
		const moviePlayer = await waitElement(elementQuery.MOVIE_PLAYER);
		const { deactivateBlockAutoHide } = createPlayerHackEventFn(moviePlayer);
		const [[, , next, prev]] = ops;
		if (prev === "outside" && next === "inside") {
			deactivateBlockAutoHide();
			logger.debug(
				`${deactivateBlockAutoHide.name} executed because state change ${prev} to ${next}`,
			);
		}
	});
};
