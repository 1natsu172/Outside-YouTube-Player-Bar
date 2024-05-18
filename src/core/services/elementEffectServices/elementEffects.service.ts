import { elementQuery } from "@/core/mains/meta.js";
import { elementAttributes } from "@/core/mains/meta.js";
import {
	createPlayerHackEventFn,
	execAlwaysDisplayPlayerBar,
	judgeMoviePlayerCondition,
} from "@/core/services/behaviorServices/alwaysDisplayPlayerBar.service.js";
import { playerBarIntersectionOperation } from "@/core/services/operationServices/index.js";
import { applyVideoPlayerModeToSiteMeta } from "@/core/services/siteMetaServices/index.js";
import { setPlayerBarHeightVar } from "@/core/usecases/cssVariables.usecase.js";
import { waitElement } from "@1natsu/wait-element";
import { debounce } from "mabiki";

const moviePlayerElementEffect = async () => {
	const element = await waitElement(elementQuery.MOVIE_PLAYER);
	const { activateBlockAutoHide } = createPlayerHackEventFn(element);
	// NOTE: If longer than 1sec(1000ms), the time bar is delayed, so it was decided to 950.
	const debounceExecBlockAutoHide = debounce(execAlwaysDisplayPlayerBar, 950, {
		leading: true,
		trailing: true,
	});

	const observer = new MutationObserver(
		debounce(
			(mutations) => {
				logger.debug(
					"moviePlayerElement",
					"Observing effect has occurred.",
					mutations,
				);

				for (const mutation of mutations) {
					const moviePlayer = mutation.target as Element;
					const { isVisiblePlayerBar } = judgeMoviePlayerCondition(moviePlayer);

					debounceExecBlockAutoHide({
						blockAutoHide: activateBlockAutoHide,
						isVisiblePlayerBar,
					});
					// FIXME: fullscreenにしたときにautohideが解除されないので内側にしているとずっとバーが出ている。movie-playerをクリックしたら解除されるので、DisbleBlockAutoHideの開発が必要。
				}
			},
			950,
			{
				leading: true,
				trailing: true,
			},
		),
	);
	observer.observe(element, {
		attributes: true, // check only attributes
		attributeFilter: ["class"], // check only className attribute
	});
	return observer;
};

const playerBarElementResizeEffect = async () => {
	const element = await waitElement(elementQuery.PLAYER_BAR);
	const observer = new ResizeObserver(
		debounce<ResizeObserverCallback>(
			(entries) => {
				logger.debug("playerBarElement", "Observing effect has occurred.");
				for (const entry of entries) {
					const { borderBoxSize } = entry;

					const [size] = borderBoxSize;
					const height = `${size.blockSize}px`;
					setPlayerBarHeightVar(height);
				}
			},
			500,
			{
				leading: true,
				trailing: true,
			},
		),
	);
	observer.observe(element, {
		box: "border-box",
	});
	return observer;
};

const pageManagerWatchFlexy_playerModeEffect = async () => {
	const element = await waitElement(elementQuery.YTD_PAGE_MANAGER);

	const observer = new MutationObserver(
		debounce<MutationCallback>(
			(_mutations) => {
				logger.debug(
					"pageManagerWatchFlexy_playerModeEffect",
					"Observing effect has occurred.",
					"This mutation fires when any of the attributeFilter changes",
				);
				requestIdleCallback(() => {
					applyVideoPlayerModeToSiteMeta();
				});
			},
			500,
			{
				leading: true,
				trailing: true,
			},
		),
	);
	const { defaultView, theater, fullscreen } = elementAttributes.playerMode;
	observer.observe(element, {
		attributes: true, // check only attributes
		attributeFilter: [defaultView, theater, fullscreen], // check only video modes attribute
		attributeOldValue: true,
	});
	return observer;
};

/**
 * NOTE: The interest itself is a player bar, but the parent container is actually a targetElement in order to consider both inside and outside.
 */
const playerBarIntersectionEffect = async () => {
	const element = await waitElement(elementQuery.MOVIE_PLAYER_CONTAINER);
	const moviePlayer = await waitElement(elementQuery.MOVIE_PLAYER);
	const { deactivateBlockAutoHide } = createPlayerHackEventFn(moviePlayer);
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				// When fully disappeared
				if (entry.intersectionRatio === 0) {
					requestIdleCallback(() => {
						logger.debug("playerbar intersect => fully disappeared");
						playerBarIntersectionOperation({
							intersect: "disappeared",
							deactivateBlockAutoHide,
						});
					});
				}
				// When little appeared
				if (entry.intersectionRatio > 0) {
					requestIdleCallback(() => {
						logger.debug("playerbar intersect => little appeared");
						playerBarIntersectionOperation({ intersect: "littleAppeared" });
					});
				}
			}
		},
		{
			threshold: [0, 0.1],
			rootMargin: "-56px 0px 0px 0px", //NOTE: Consider header height.
		},
	);
	observer.observe(element);
	return observer;
};

///////////////////////////////////////////
export type ElementEffect =
	| ResizeObserver
	| MutationObserver
	| IntersectionObserver;
export const setupElementEffects = async () => {
	const effects = await Promise.all<ElementEffect>([
		playerBarElementResizeEffect(),
		moviePlayerElementEffect(),
		pageManagerWatchFlexy_playerModeEffect(),
		playerBarIntersectionEffect(),
	]);
	return effects;
};
