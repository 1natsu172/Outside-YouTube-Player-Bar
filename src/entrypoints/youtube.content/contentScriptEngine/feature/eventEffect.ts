import {
	observePageNavigate,
	observeVideoLoaded,
} from "../libs/observeYTEvent.js";

const pageNavigateEffect = (event: unknown) => {
	logger.debug("page navigated", event);
};

const videoLoadedEffect = (event: unknown) => {
	logger.debug("video loaded", event);
};

const disposeList = new Set<() => void>();

export const setupEventEffect = () => {
	disposeList.add(observePageNavigate(pageNavigateEffect));
	disposeList.add(observeVideoLoaded(videoLoadedEffect));
};

export const disposeEventEffect = () => {
	for (const dispose of disposeList) {
		dispose();
	}
};
