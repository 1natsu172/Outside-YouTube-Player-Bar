import { elementQuery } from "@/core/mains/meta.js";
import {
	convertAttrToVideoPlayerMode,
	judgeCurrentVideoPlayerMode,
} from "@/core/presenters/statePresenter/siteMetaState/index.js";
import {
	setNavigationState,
	setSiteVersion,
	setVideoPlayerMode,
} from "@/core/usecases/siteMetaState.usecase.js";
import { convertToNamedNodeMapLike } from "@/utils/domUtils/attr.js";
import { waitElement } from "@1natsu/wait-element";

export const applyVideoPlayerModeToSiteMeta = async () => {
	const element = await waitElement(elementQuery.YTD_PAGE_MANAGER);
	const currentMode = judgeCurrentVideoPlayerMode(
		convertToNamedNodeMapLike(element.attributes),
	);
	const convertedValue = convertAttrToVideoPlayerMode(currentMode);

	setVideoPlayerMode(convertedValue);

	logger.info(applyVideoPlayerModeToSiteMeta.name, currentMode);
};

export const registerInitializationLocation = () => {
	logger.debug("register initialization Location.");
	setNavigationState(location);
};

export const getSiteVersion = () => {
	if (typeof window === "undefined" || !window?.yt || !window?.ytcfg) {
		logger.fail("Not fount window or yt or ytcfg", { window });
		return;
	}
	const version =
		// @ts-expect-error That's because there is no type definition.
		(window?.yt?.config_?.INNERTUBE_CLIENT_VERSION ||
			// @ts-expect-error That's because there is no type definition.
			window?.ytcfg?.data_?.INNERTUBE_CLIENT_VERSION) ??
		null;

	if (version) {
		setSiteVersion(version);
	} else {
		logger.fatal(
			"version doesn't resolved. Should debug window object =>",
			window,
		);
	}
};
