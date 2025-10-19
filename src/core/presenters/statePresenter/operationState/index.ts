import { useSnapshot } from "valtio";
import { operationState } from "@/core/repositories/contentScript.repository.js";

const getOperationState = () => {
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
