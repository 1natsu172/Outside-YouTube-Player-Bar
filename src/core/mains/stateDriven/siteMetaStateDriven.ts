import type { VideoPlayerMode } from "@/core/mains/contentScriptState.js";
import { isVideoPage } from "@/core/presenters/judgePage.js";
import { siteMetaState } from "@/core/repositories/contentScript.repository.js";
import { changePositionPlayerBarByChangedPlayerMode } from "@/core/services/behaviorServices/positionPlayerBar.service.js";
import { applyVideoPlayerModeToSiteMeta } from "@/core/services/siteMetaServices/index.js";
import { subscribe } from "valtio";
import { subscribeKey } from "valtio/utils";

export const videoPlayerModeDriven = () => {
	return subscribe(siteMetaState.videoPlayerState, ([[, , curr, prev]]) => {
		logger.info("videoPlayerMode changed", { prev, curr });
		changePositionPlayerBarByChangedPlayerMode({
			videoPlayerMode: {
				prev: prev as VideoPlayerMode,
				curr: curr as VideoPlayerMode,
			},
		});
	});
};

export const navigationDriven = () => {
	return subscribeKey(siteMetaState.navigationState, "value", (value) => {
		logger.info("navigationState changed", value);
		const isVideo = isVideoPage(value.pathname);
		if (isVideo) {
			applyVideoPlayerModeToSiteMeta();
		}
	});
};
