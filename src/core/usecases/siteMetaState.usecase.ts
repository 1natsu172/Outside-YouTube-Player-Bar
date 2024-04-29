import { siteMetaState } from "@/core/repositories/contentScript.repository.js";
import type { SiteMetaState } from "@/core/mains/contentScriptState.js";

export const setVideoPlayerMode = (
	mode: SiteMetaState["videoPlayerState"]["mode"],
) => {
	siteMetaState.videoPlayerState.mode = mode;
};
