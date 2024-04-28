import { siteMetaState } from "@/core/repositories/contentScript.repository.js";
import { derivePositionPlayerBar } from "@/core/services/behaviorServices/behaviorDeriver.service.js";
import { subscribeKey } from "valtio/utils";

export const videoPlayerModeDriven = () => {
	return subscribeKey(siteMetaState, "videoPlayerMode", (value) => {
		logger.info("videoPlayerMode changed", value);
		derivePositionPlayerBar({ videoPlayerMode: value });
	});
};
