import type { VideoPlayerModeWithoutNone } from "@/core/mains/contentScriptState.js";
import {
	elementQuery,
	extensionNameCustomElementName,
} from "@/core/mains/meta.js";
import {
	convertAttrToVideoPlayerMode,
	judgeCurrentVideoPlayerMode,
} from "@/core/presenters/statePresenter/siteMetaState/index.js";
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
			if (await player.getAttribute("paused-mode")) {
				await player.click();
			}
			// NOTE: mute for testing. ref(mute option not provide yet): https://github.com/microsoft/playwright/issues/19534
			_.getMuteButton().click();
		},
		getYTDPageManager: () => page.locator(elementQuery.YTD_PAGE_MANAGER),
		getMoviePlayer: () => page.locator(elementQuery.MOVIE_PLAYER),
		getPlayerBar: () => page.locator(elementQuery.PLAYER_BAR),
		getOypbButton: () => page.locator(extensionNameCustomElementName),
		getOpenSettingsButton: () => page.locator(extensionNameCustomElementName),
		getMuteButton: () => page.locator(".ytp-mute-button"),
		getDefaultViewButton: () =>
			page.locator(`.ytp-size-button[data-title-no-tooltip="Default view"]`),
		getTheaterModeButton: () =>
			page.locator(`.ytp-size-button[data-title-no-tooltip="Theater mode"]`),
		getFullScreenButton: () => page.locator(".ytp-fullscreen-button"),
		getTargetVideoPlayerModeButton: async (
			targetMode: VideoPlayerModeWithoutNone,
		) => {
			const managerElement = await _.getYTDPageManager();
			// NOTE: ブラウザ環境で実行されるのでimportしたモジュール評価ができないので、stringで渡すと内部でevalしてくれる。引数がElementだけでいいのでここでは自分でeval()していないだけ。https://playwright.dev/docs/evaluating
			const currentMode = (await managerElement.evaluate(
				judgeCurrentVideoPlayerMode.toString(),
			)) as ReturnType<typeof judgeCurrentVideoPlayerMode>;
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
	};

	await page.goto(url);
	await _.getMoviePlayer().waitFor();

	return _;
}
