import { siteMetaState } from "@/core/repositories/contentScript.repository.js";
import type { SiteMetaState } from "@/core/mains/contentScriptState.js";

export const setVideoPlayerMode = (
	mode: SiteMetaState["videoPlayerState"]["mode"],
) => {
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
