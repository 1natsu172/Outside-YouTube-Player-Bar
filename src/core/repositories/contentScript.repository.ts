import { proxy } from "valtio";
import type { ContentScriptState } from "@/core/mains/contentScriptState.js";

export const currentBehaviorState = proxy<
	ContentScriptState["currentBehavior"]
>({
	positionPlayerBar: "inside",
	alwaysDisplayPlayerBar: false,
	__forForceReaction__: 0,
});

export const operationState = proxy<ContentScriptState["operation"]>({
	scriptStatus: "standByVideoPage",
	uiMount: "unmounted",
	doneInitialize: false,
	oypbEnable: undefined,
});

export const siteMetaState = proxy<ContentScriptState["siteMeta"]>({
	videoPlayerMode: "none",
	colorTheme: "light",
	siteVersion: undefined,
});
