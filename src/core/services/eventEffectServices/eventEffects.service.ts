import { YT_EVENTS } from "./libs/YT_EVENTS.js";
import { createEventEffect } from "./libs/eventEffect.js";

const __DEBUG_YT_EVENTS = createEventEffect(YT_EVENTS, (key) => (event) => {
	logger.withTag("YT_EVENT").log(key, event);
});

const pageNavigateEffect = createEventEffect(
	["yt-navigate-finish"],
	(_key) => (event) => {
		logger.debug("page navigated", event);
	},
);

const videoLoadedEffect = createEventEffect(
	["yt-page-data-updated"],
	(_key) => (event) => {
		logger.debug("video loaded", event);
	},
);

const fullscreenEffect = createEventEffect(
	["fullscreenchange", "webkitfullscreenchange"],
	(_key) => (event) => {
		logger.debug("fullscreen event detected", event);
	},
);

///////////////////////////////////////////
export const setupEventEffects = async () => {
	const effects = await Promise.all([
		pageNavigateEffect.observe(),
		videoLoadedEffect.observe(),
		fullscreenEffect.observe(),
		...(import.meta.env.VITE_DEBUG_YT_EVENTS === "true"
			? [__DEBUG_YT_EVENTS.observe()]
			: []),
	]);
};
