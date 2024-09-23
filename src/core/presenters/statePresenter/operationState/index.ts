import { operationState } from "@/core/repositories/contentScript.repository.js";
import { useSnapshot } from "valtio";

export const getOperationState = () => {
	return operationState;
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
