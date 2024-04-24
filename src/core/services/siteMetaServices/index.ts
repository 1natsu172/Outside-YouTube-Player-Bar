import {
	convertAttrToVideoPlayerMode,
	judgeCurrentVideoPlayerMode,
} from "@/core/presenters/statePresenter/siteMetaState/index.js";
import { setVideoPlayerMode } from "@/core/usecases/siteMeta.usecase.js";

export const applyVideoPlayerModeToSiteMeta = (element: Element) => {
	const currentMode = judgeCurrentVideoPlayerMode(element);
	const convertedValue = convertAttrToVideoPlayerMode(currentMode);

	setVideoPlayerMode(convertedValue);

	logger.info(applyVideoPlayerModeToSiteMeta.name, currentMode);
};
