import { siteMetaState } from "@/core/repositories/contentScript.repository.js";
import { useSnapshot } from "valtio";

export const useVideoPlayerMode = () => {
	const state = useSnapshot(siteMetaState);
	return state.videoPlayerMode;
};
