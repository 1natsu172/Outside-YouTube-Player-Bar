import { proxy } from "valtio";
import type { ContentScriptState } from "@/core/mains/contentScriptState.js";

export const currentBehaviorState = proxy<
	ContentScriptState["currentBehavior"]
>({
	positionPlayerBar: "inside",
	alwaysDisplayPlayerBar: true,
});

export const operationState = proxy<ContentScriptState["operation"]>({
	scriptStatus: "standByVideoPage",
	uiMount: "unmounted",
	doneInitialize: false,
});
