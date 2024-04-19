import { proxy } from "valtio";
import type { ContentScriptState } from "@/core/mains/contentScriptState.js";

export const behaviorState = proxy<ContentScriptState["behavior"]>({
	positionPlayerBar: "inside",
	alwaysDisplayPlayerBar: true,
});

export const operationState = proxy<ContentScriptState["operation"]>({
	status: "standByVideoPage",
	uiMount: "unmounted",
	videoPlayerMode: "none",
});
