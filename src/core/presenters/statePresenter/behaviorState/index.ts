import { behaviorState } from "@/core/repositories/contentScript.repository.js";
import { useSnapshot } from "valtio";

export const useBehaviorState = () => {
	return useSnapshot(behaviorState);
};

export const useBarPosition = () => {
	const state = useBehaviorState();
	return state.positionPlayerBar;
};

export const getBehaviorState = () => {
	return behaviorState;
};
