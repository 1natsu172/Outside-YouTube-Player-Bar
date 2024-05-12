import { waitElement } from "@1natsu/wait-element";
import { debounce } from "mabiki";
import { setPlayerBarHeightVar } from "@/core/usecases/cssVariables.usecase.js";
import { elementQuery } from "@/core/mains/meta.js";
import {
	createBlockAutohideFn,
	execAlwaysDisplayPlayerBar,
} from "@/core/services/behaviorServices/alwaysDisplayPlayerBar.service.js";
import { elementAttributes } from "@/core/mains/meta.js";
import { applyVideoPlayerModeToSiteMeta } from "../siteMetaServices/index.js";

const moviePlayerElementEffect = async () => {
	const element = await waitElement(elementQuery.MOVIE_PLAYER);
	const blockAutoHide = createBlockAutohideFn(element);
	const debounceExecBlockAutoHide = debounce(execAlwaysDisplayPlayerBar, 300, {
		leading: true,
		trailing: true,
	});

	const observer = new MutationObserver(
		debounce(
			async (mutations) => {
				logger.debug(
					"moviePlayerElement",
					"Observing effect has occurred.",
					mutations,
				);

				for (const mutation of mutations) {
					const targetClassList = (mutation.target as HTMLElement).classList;
					const isVisiblePlayerBar =
						targetClassList.contains("paused-mode") ||
						!targetClassList.contains("ytp-autohide");

					// FIXME: 便宜上asyncにしているが、再読込時にctx.onInvalidateになる要因になっている様子があるので、修正したほうがよい
					await debounceExecBlockAutoHide({
						blockAutoHide,
						isVisiblePlayerBar,
					});
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
		attributes: true, // check only attributes
		attributeFilter: ["class"], // check only className attribute
	});
	return observer;
};

const playerBarElementEffect = async () => {
	const element = await waitElement(elementQuery.PLAYER_BAR);
	// const debounceSetPlayerBarHeightVar = debounce(setPlayerBarHeightVar, 500, {
	// 	leading: true,
	// 	trailing: true,
	// });

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
				leading: false,
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

///////////////////////////////////////////
export const setupElementEffects = async () => {
	const effects = await Promise.all<ResizeObserver | MutationObserver>([
		playerBarElementEffect(),
		moviePlayerElementEffect(),
		pageManagerWatchFlexy_playerModeEffect(),
	]);
	return effects;
};
