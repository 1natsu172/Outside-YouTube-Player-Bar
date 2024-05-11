import { operationState } from "@/core/repositories/contentScript.repository.js";
import type { OperationState } from "@/core/mains/contentScriptState.js";

export const setDoneInitialize = (
	is: OperationState["flagOps"]["doneInitialize"],
) => {
	operationState.flagOps.doneInitialize = is;
};

export const setOypbEnable = (is: OperationState["flagOps"]["oypbEnable"]) => {
	operationState.flagOps.oypbEnable = is;
};

export const setDoneIntialMovePlayerBar = (
	is: OperationState["flagOps"]["doneIntialMovePlayerBar"],
) => {
	operationState.flagOps.doneIntialMovePlayerBar = is;
};
