import { behaviorState } from "@/core/repositories/contentScript.repository.js";
import { useSnapshot } from "valtio";
import { snapshot } from "valtio/vanilla";

export const useBehaviorState = () => {
	return useSnapshot(behaviorState);
};

export const useBarPosition = () => {
	const state = useBehaviorState();
	return state.positionPlayerBar;
};

export const getBehaviorState = () => {
	return snapshot(behaviorState);
};
