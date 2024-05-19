import { elementQuery } from "@/core/mains/meta.js";
import {
	createPlayerHackEventFn,
	pseudoReproducePlayerMouseHover,
} from "@/core/services/behaviorServices/alwaysDisplayPlayerBar.service.js";
import { applyVideoPlayerModeToSiteMeta } from "@/core/services/siteMetaServices/index.js";
import { setNavigationState } from "@/core/usecases/siteMetaState.usecase.js";
import { waitElement } from "@1natsu/wait-element";
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
 * NOTE: For "not" alwaysDisplayPlayerBar user's effect.
 * 1. hover cursor to the moviePlayer
 * 2. then move cursor to the playerBar
 * 3. `mouseleave` from the moviePlayer that equal `autohide`
 * 4. so while hovering the playerBar, need to the blockAutoHide
 * ![impl image](https://github.com/1natsu172/Outside-YouTube-Player-Bar/assets/7282145/dfac5e0a-2429-40a2-a84a-7d2fec8a3375)
 */
const moviePlayerHoverEffect = async () => {
	const playerBar = await waitElement(elementQuery.PLAYER_BAR);
	const moviePlayer = await waitElement(elementQuery.MOVIE_PLAYER);
	const { deactivateBlockAutoHide } = createPlayerHackEventFn(moviePlayer);

	const moviePlayerEffect = createEventEffect(
		["mouseenter", "mouseleave"],
		(_key) => (event) => {
			pseudoReproducePlayerMouseHover({
				event,
				eventFrom: elementQuery.MOVIE_PLAYER,
			});
		},
		{
			targetElement: moviePlayer,
		},
	);

	const playerBarEffect = createEventEffect(
		["mouseleave"],
		(_key) => (event) => {
			pseudoReproducePlayerMouseHover({
				event,
				eventFrom: elementQuery.PLAYER_BAR,
				deactivateBlockAutoHide,
			});
		},
		{
			targetElement: playerBar,
		},
	);

	return [moviePlayerEffect, playerBarEffect];
};

///////////////////////////////////////////
/**
 * setup event driven functions
 */
export const setupEventEffects = async () => {
	const effects = await Promise.all<EventEffect>([
		pageNavigateEffect.observe(),
		videoLoadedEffect.observe(),
		...(await moviePlayerHoverEffect()).map((effect) => effect.observe()),
		...(import.meta.env.VITE_DEBUG_YT_EVENTS === "true"
			? [__DEBUG_YT_EVENTS.observe()]
			: []),
	]);
	return effects;
};
