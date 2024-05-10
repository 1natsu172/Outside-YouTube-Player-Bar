import { isVideoPage } from "@/core/presenters/judgePage.js";
import { siteMetaState } from "@/core/repositories/contentScript.repository.js";
import { changePositionPlayerBarByChangedPlayerMode } from "@/core/services/behaviorServices/positionPlayerBar.service.js";
import { applyVideoPlayerModeToSiteMeta } from "@/core/services/siteMetaServices/index.js";
import { subscribeKey } from "valtio/utils";

export const videoPlayerModeDriven = () => {
	return subscribeKey(siteMetaState.videoPlayerState, "mode", (value) => {
		logger.info("videoPlayerMode changed", value);
		changePositionPlayerBarByChangedPlayerMode({ videoPlayerMode: value });
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
