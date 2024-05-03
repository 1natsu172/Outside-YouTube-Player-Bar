import { setNavigationState } from "@/core/usecases/siteMetaState.usecase.js";
import { applyVideoPlayerModeToSiteMeta } from "../siteMetaServices/index.js";
import { YT_EVENTS } from "./libs/YT_EVENTS.js";
import { type EventEffect, createEventEffect } from "./libs/eventEffect.js";

const __DEBUG_YT_EVENTS = createEventEffect(YT_EVENTS, (key) => (event) => {
	logger.withTag("YT_EVENT").log(key, event);
});

const pageNavigateEffect = createEventEffect(
	["yt-navigate-finish"],
	(_key) => (event) => {
		logger.debug("page navigated", event);
		setNavigationState(location);
	},
);

const videoLoadedEffect = createEventEffect(
	["yt-page-data-updated"],
	(_key) => (event) => {
		logger.debug("video loaded", event);
		/**
		 * NOTE: a.k.a initialization detect mode
		 * Basic initialization is already done with NavigationDriven. So it may not be necessary to call it here, but do just in case.
		 */
		applyVideoPlayerModeToSiteMeta();
	},
);

/**
 * @deprecated
 * fullscreenから戻ったときの状態履歴問題やtheater/defaultの検知とは別にここでやるのは微妙なので使わなくする
 * @link
 * https://developer.mozilla.org/ja/docs/Web/API/Document/fullscreenchange_event
 * https://developer.mozilla.org/ja/docs/Web/API/Document/fullscreenElement
 */
const fullscreenEffect = createEventEffect(
	["fullscreenchange", "webkitfullscreenchange"],
	(_key) => (event) => {
		logger.debug("fullscreen event detected", event);
		if (document.fullscreenElement) {
			// setVideoPlayerMode('fullscreen')
		} else {
			// ……
		}
	},
);

///////////////////////////////////////////
/**
 * setup event driven functions
 */
export const setupEventEffects = async () => {
	const effects = await Promise.all<EventEffect>([
		pageNavigateEffect.observe(),
		videoLoadedEffect.observe(),
		...(import.meta.env.VITE_DEBUG_YT_EVENTS === "true"
			? [__DEBUG_YT_EVENTS.observe()]
			: []),
	]);
	return effects;
};
