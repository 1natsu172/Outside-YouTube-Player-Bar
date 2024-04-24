import { currentBehaviorState } from "@/core/repositories/contentScript.repository.js";
import { useSnapshot } from "valtio";

export const useBehaviorState = () => {
	return useSnapshot(currentBehaviorState);
};

export const useBarPosition = () => {
	const state = useBehaviorState();
	return state.positionPlayerBar;
};
