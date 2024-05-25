import type {
	SiteMetaState,
	VideoPlayerMode,
} from "@/core/mains/contentScriptState.js";
import { siteMetaState } from "@/core/repositories/contentScript.repository.js";

export const setVideoPlayerMode = (mode: VideoPlayerMode) => {
	siteMetaState.videoPlayerState.mode = mode;
};

export const setNavigationState = (location: Location) => {
	const { href, origin, pathname, search } = location;
	siteMetaState.navigationState.value = {
		href,
		origin,
		pathname,
		search,
	};
};

export const setSiteVersion = (
	version: SiteMetaState["infoState"]["version"],
) => {
	siteMetaState.infoState.version = version;
};
