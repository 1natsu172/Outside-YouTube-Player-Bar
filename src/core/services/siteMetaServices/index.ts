import { elementQuery } from "@/core/mains/meta.js";
import {
	convertAttrToVideoPlayerMode,
	judgeCurrentVideoPlayerMode,
} from "@/core/presenters/statePresenter/siteMetaState/index.js";
import {
	setNavigationState,
	setVideoPlayerMode,
} from "@/core/usecases/siteMetaState.usecase.js";
import { waitElement } from "@1natsu/wait-element";

export const applyVideoPlayerModeToSiteMeta = async () => {
	const element = await waitElement(elementQuery.YTD_PAGE_MANAGER);
	const currentMode = judgeCurrentVideoPlayerMode(element);
	const convertedValue = convertAttrToVideoPlayerMode(currentMode);

	setVideoPlayerMode(convertedValue);

	logger.info(applyVideoPlayerModeToSiteMeta.name, currentMode);
};

export const registerInitializationLocation = () => {
	logger.debug("register initialization Location.");
	setNavigationState(location);
};
