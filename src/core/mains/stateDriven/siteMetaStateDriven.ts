import { siteMetaState } from "@/core/repositories/contentScript.repository.js";
import { changePositionPlayerBarByUserOption } from "@/core/services/behaviorServices/positionPlayerBar.service.js";
import { subscribeKey } from "valtio/utils";

export const videoPlayerModeDriven = () => {
	return subscribeKey(siteMetaState.videoPlayerState, "mode", (value) => {
		logger.info("videoPlayerMode changed", value);
		changePositionPlayerBarByUserOption({ videoPlayerMode: value });
	});
};
