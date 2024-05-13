import type { ContentScriptState } from "@/core/mains/contentScriptState.js";
import { derive } from "derive-valtio";
import { proxy } from "valtio";
import { proxyWithHistory } from "valtio-history";

export const behaviorState = proxy<ContentScriptState["behavior"]>({
	positionPlayerBar: "inside",
});

export const operationState = proxy<ContentScriptState["operation"]>({
	uiOps: {
		mount: "unmount",
	},
	processOps: {
		scriptStatus: "standByVideoPage",
	},
	flagOps: {
		doneInitialize: false,
		oypbEnable: undefined,
		doneIntialMovePlayerBar: false,
	},
});

export const siteMetaState = proxy<ContentScriptState["siteMeta"]>({
	videoPlayerState: {
		mode: "none",
	},
	appearanceState: {
		colorTheme: undefined,
	},
	infoState: {
		version: null,
	},
	navigationState: proxyWithHistory({
		href: "",
		origin: "",
		pathname: "",
		search: "",
	}),
});

export const __reflectFunctionalityState__ = derive<
	object,
	ContentScriptState["__reflectFunctionality__"]
>({
	feature: (get) => ({ behavior: get(behaviorState) }),
	context: (get) => ({ videoPlayerState: get(siteMetaState.videoPlayerState) }),
});
