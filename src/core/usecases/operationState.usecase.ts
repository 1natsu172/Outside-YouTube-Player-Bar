import { operationState } from "@/core/repositories/contentScript.repository.js";
import type { ContentScriptState } from "@/core/mains/contentScriptState.js";

export const setDoneInitialize = (
	is: ContentScriptState["operation"]["doneInitialize"],
) => {
	operationState.doneInitialize = is;
};

export const setOypbEnable = (
	is: ContentScriptState["operation"]["oypbEnable"],
) => {
	operationState.oypbEnable = is;
};
