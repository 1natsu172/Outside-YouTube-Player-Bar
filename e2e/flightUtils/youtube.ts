import type { VideoPlayerModeWithoutNone } from "@/core/mains/contentScriptState.js";
import {
	elementAttributes,
	elementQuery,
	extensionNameCustomElementName,
} from "@/core/mains/meta.js";
import {
	convertAttrToVideoPlayerMode,
	judgeCurrentVideoPlayerMode,
} from "@/core/presenters/statePresenter/siteMetaState/index.js";
import { convertToNamedNodeMapLike } from "@/utils/domUtils/attr.js";
import type { Page } from "@playwright/test";
import { URLS } from "../fixture.js";

type Context = {
	url: string;
};

export async function openYouTube(
	page: Page,
	{ url }: Context = { url: URLS.top },
) {
	const _ = {
		playVideoPlayer: async () => {
			const player = await _.getMoviePlayer();
			if (await player.evaluate((el) => el.classList.contains("paused-mode"))) {
				await _.getPlayButton().click();
			}
		},
		pauseVideoPlayer: async () => {
			const player = await _.getMoviePlayer();
			if (
				await player.evaluate((el) => el.classList.contains("playing-mode"))
			) {
				await _.getPlayButton().click();
			}
		},
		getDocumentElement: () => page.locator("html").first(),
		getYTDPageManager: () => page.locator(elementQuery.YTD_PAGE_MANAGER),
		getMoviePlayer: () => page.locator(elementQuery.MOVIE_PLAYER),
		getPlayerBar: () => page.locator(elementQuery.PLAYER_BAR),
		getOypbButton: () => page.locator(extensionNameCustomElementName),
		getOpenSettingsButton: () => page.locator(extensionNameCustomElementName),
		getPlayButton: () => page.locator(".ytp-play-button"),
		getMuteButton: () => page.locator(".ytp-mute-button"),
		getTimeDisplay: () => page.locator(".ytp-time-display"),
		getProgressBar: () => page.locator(".ytp-progress-bar-container"),
		getDefaultViewButton: () =>
			page.locator(`.ytp-size-button[data-title-no-tooltip="Default view"]`),
		getTheaterModeButton: () =>
			page.locator(`.ytp-size-button[data-title-no-tooltip="Theater mode"]`),
		getFullScreenButton: () => page.locator(".ytp-fullscreen-button"),
		getTargetVideoPlayerModeButton: async (
			targetMode: VideoPlayerModeWithoutNone,
		) => {
			const managerElement = await _.getYTDPageManager();

			// NOTE: evaluateはブラウザ環境で実行されるのでimportしたモジュール評価ができないのでややこしいことをしている https://playwright.dev/docs/evaluating
			const attrs = await managerElement.evaluate(
				(el, convertToNamedNodeMapLike) => {
					return Function(`return ${convertToNamedNodeMapLike}`)()(
						el.attributes,
					);
				},
				convertToNamedNodeMapLike.toString(),
			);
			const currentMode = judgeCurrentVideoPlayerMode(attrs);
			const convertedCurrentMode = convertAttrToVideoPlayerMode(currentMode);

			if (targetMode === convertedCurrentMode) {
				return null;
			}

			switch (targetMode) {
				case "defaultView":
					return _.getDefaultViewButton();
				case "theaterMode":
					return _.getTheaterModeButton();
				case "fullscreen":
					return _.getFullScreenButton();
			}
		},
		isOutside: async () => {
			return await _.getDocumentElement().evaluate(
				(el, query) => el.hasAttribute(query),
				elementAttributes.oypb.IS_OUTSIDE,
			);
		},
	};

	await page.goto(url);
	await _.getMoviePlayer().waitFor();
	// NOTE: mute for testing. ref(mute option not provide yet): https://github.com/microsoft/playwright/issues/19534
	await _.getMuteButton().click();

	return _;
}
