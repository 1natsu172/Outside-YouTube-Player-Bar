import type { SiteMetaState } from "@/core/mains/contentScriptState.js";
import { elementAttributes } from "@/core/mains/meta.js";
import { siteMetaState } from "@/core/repositories/contentScript.repository.js";
import { useSnapshot } from "valtio";
import { snapshot } from "valtio/vanilla";

export const useVideoPlayerMode = () => {
	const state = useSnapshot(siteMetaState.videoPlayerState).mode;
	return state;
};

export const getSiteMetaState = () => {
	return snapshot(siteMetaState);
};

export const judgeCurrentVideoPlayerMode = (managerElement: Element) => {
	const { defaultView, fullscreen, theater } = elementAttributes.playerMode;
	/**
	 * fullscreenはtheaterを併用するためこの順番で判定する必要がある
	 */
	const order = [fullscreen, theater, defaultView];
	for (const attr of order) {
		if (managerElement.hasAttribute(attr)) {
			return attr;
		}
	}
};

export const convertAttrToVideoPlayerMode = (
	attr: ValueOf<typeof elementAttributes.playerMode> | undefined,
): SiteMetaState["videoPlayerState"]["mode"] => {
	switch (attr) {
		case "default-layout":
			return "defaultView";

		case "theater":
			return "theaterMode";

		case "fullscreen":
			return "fullscreen";

		default:
			return "none";
	}
};
