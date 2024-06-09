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
	await page.goto(url);

	await page.waitForSelector(elementQuery.PLAYER_BAR);

	const _ = {
		playVideoPlayer: async () => {
			const player = await _.getMoviePlayer();
			await player.click();
		},
		getMoviePlayer: () => page.waitForSelector(elementQuery.MOVIE_PLAYER),
		getOypbButton: () => page.waitForSelector(extensionNameCustomElementName),
		getOpenSettingsButton: () =>
			page.waitForSelector(extensionNameCustomElementName),
		clickOypbButton: async () => {
			const counter = await _.getOypbButton();
			await counter.click();
		},
		clickOpenSettingsButton: async () => {
			const counter = await _.getOpenSettingsButton();
			await counter.click();
		},
	};
	return _;
}
