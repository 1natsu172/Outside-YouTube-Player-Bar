import { elementQuery } from "@/core/mains/meta.js";
import {
	convertAttrToVideoPlayerMode,
	judgeCurrentVideoPlayerMode,
} from "@/core/presenters/statePresenter/siteMetaState/index.js";
import { setVideoPlayerMode } from "@/core/usecases/siteMeta.usecase.js";
import { waitElement } from "@1natsu/wait-element";

export const applyVideoPlayerModeToSiteMeta = async () => {
	const element = await waitElement(elementQuery.YTD_PAGE_MANAGER);
	const currentMode = judgeCurrentVideoPlayerMode(element);
	const convertedValue = convertAttrToVideoPlayerMode(currentMode);

	setVideoPlayerMode(convertedValue);

	logger.info(applyVideoPlayerModeToSiteMeta.name, currentMode);
};
