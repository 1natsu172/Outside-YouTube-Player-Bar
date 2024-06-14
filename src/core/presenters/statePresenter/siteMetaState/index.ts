import type {
	VideoPlayerMode,
	VideoPlayerModeWithoutNone,
} from "@/core/mains/contentScriptState.js";
import { elementAttributes } from "@/core/mains/meta.js";
import { siteMetaState } from "@/core/repositories/contentScript.repository.js";
import type { NamedNodeMapLike } from "@/utils/domUtils/attr.js";
import { useSnapshot } from "valtio";
import { snapshot } from "valtio/vanilla";

export const useVideoPlayerMode = () => {
	const state = useSnapshot(siteMetaState.videoPlayerState).mode;
	return state;
};

export const getSiteMetaState = () => {
	return snapshot(siteMetaState);
};

export const judgeCurrentVideoPlayerMode = (
	namedNodeMapLike: NamedNodeMapLike,
) => {
	const { defaultView, fullscreen, theater } = elementAttributes.playerMode;
	/**
	 * fullscreenはtheaterを併用するためこの順番で判定する必要がある
	 */
	const order = [fullscreen, theater, defaultView];
	for (const attr of order) {
		if (Object.hasOwn(namedNodeMapLike, attr)) {
			return attr;
		}
	}
};

export const videoPlayerModeKeys = () =>
	new Set<VideoPlayerMode>([
		"defaultView",
		"theaterMode",
		"fullscreen",
		"none",
	]);
export const videoPlayerModeKeysWithoutNone = () =>
	new Set<VideoPlayerModeWithoutNone>([
		"defaultView",
		"theaterMode",
		"fullscreen",
	]);

export const convertAttrToVideoPlayerMode = (
	attr: ValueOf<typeof elementAttributes.playerMode> | undefined,
): VideoPlayerMode => {
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
