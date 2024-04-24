import { siteMetaState } from "@/core/repositories/contentScript.repository.js";
import type { ContentScriptState } from "@/core/mains/contentScriptState.js";

export const setVideoPlayerMode = (
	mode: ContentScriptState["siteMeta"]["videoPlayerMode"],
) => {
	siteMetaState.videoPlayerMode = mode;
};
