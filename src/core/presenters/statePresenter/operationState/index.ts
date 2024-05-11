import { operationState } from "@/core/repositories/contentScript.repository.js";
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
