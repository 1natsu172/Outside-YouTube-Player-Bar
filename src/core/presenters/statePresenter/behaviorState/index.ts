import { useSnapshot } from "valtio";
import { behaviorState } from "@/core/repositories/contentScript.repository.js";

const useBehaviorState = () => {
	return useSnapshot(behaviorState);
};

export const useBarPosition = () => {
	const state = useBehaviorState();
	return state.positionPlayerBar;
};

export const getBehaviorState = () => {
	return behaviorState;
};
