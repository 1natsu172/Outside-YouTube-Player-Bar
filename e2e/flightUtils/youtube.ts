import {
	elementQuery,
	extensionNameCustomElementName,
} from "@/core/mains/meta.js";
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
		getMoviePlayer: () => page.locator(elementQuery.MOVIE_PLAYER),
		getPlayerBar: () => page.locator(elementQuery.PLAYER_BAR),
		getOypbButton: () => page.locator(extensionNameCustomElementName),
		getOpenSettingsButton: () => page.locator(extensionNameCustomElementName),
		getMuteButton: () => page.locator(".ytp-mute-button"),
	};

	await page.goto(url);
	await _.getMoviePlayer().waitFor();

	return _;
}
