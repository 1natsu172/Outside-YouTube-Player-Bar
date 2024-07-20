import { operationState } from "@/core/repositories/contentScript.repository.js";
import { useSnapshot } from "valtio";
import { snapshot } from "valtio/vanilla";

export const getOperationState = () => {
	return snapshot(operationState);
};

export const getFlagOps = () => {
	return getOperationState().flagOps;
};
export const getUiOps = () => {
	return getOperationState().uiOps;
};

export const usePlayerBarIntersectionInfo = () => {
	return useSnapshot(operationState.uiOps.playerBarIntersection);
};
