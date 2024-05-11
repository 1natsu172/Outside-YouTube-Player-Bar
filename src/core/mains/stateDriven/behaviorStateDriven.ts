import { behaviorState } from "@/core/repositories/contentScript.repository.js";
import { watch } from "valtio/utils";

export const behaviorDriven = () => {
	return watch(async (get) => {
		const state = get(behaviorState);
		logger.info("behaviorState reacted", state);
		// TODO(feature): behaviorDrivenの実装が必要ならここに実装
	});
};
