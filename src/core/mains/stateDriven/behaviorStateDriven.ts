import { subscribe } from "valtio/vanilla";
import { behaviorState } from "@/core/repositories/contentScript.repository.js";

export const behaviorDriven = () => {
	return subscribe(behaviorState, async (ops) => {
		const [[, , next, prev]] = ops;
		if (prev === "outside" && next === "inside") {
			logger.debug(`behaviorDriven: state change ${prev} to ${next}`);
		}
	});
};
