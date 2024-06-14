import path from "node:path";

import type { VideoPlayerModeWithoutNone } from "@/core/mains/contentScriptState.js";
/**
 * reference from WXT-example playeright
 * @description https://github.com/wxt-dev/wxt-examples/tree/main/examples/vanilla-playwright#readme
 */
import { type BrowserContext, test as base, chromium } from "@playwright/test";

const pathToExtension = path.resolve(".output/chrome-mv3");

export const test = base.extend<{
	context: BrowserContext;
	extensionId: string;
}>({
	// biome-ignore lint/correctness/noEmptyPattern: <explanation>
	context: async ({}, use) => {
		const context = await chromium.launchPersistentContext("", {
			headless: false,
			args: [
				`--disable-extensions-except=${pathToExtension}`,
				`--load-extension=${pathToExtension}`,
			],
			ignoreDefaultArgs: ["--mute-audio"],
		});
		await use(context);
		await context.close();
	},
	extensionId: async ({ context }, use) => {
		let background: { url(): string };
		if (pathToExtension.endsWith("-mv3")) {
			[background] = context.serviceWorkers();
			if (!background) background = await context.waitForEvent("serviceworker");
		} else {
			[background] = context.backgroundPages();
			if (!background)
				background = await context.waitForEvent("backgroundpage");
		}

		const extensionId = background.url().split("/")[2];
		await use(extensionId);
	},
});

export const expect = test.expect;

export const URLS = {
	top: "https://www.youtube.com",
	videos: [
		"https://www.youtube.com/watch?v=-ne0OoE-Y2E",
		"https://www.youtube.com/watch?v=uTLC3rWuzfg",
		"https://www.youtube.com/watch?v=l7kmA3_HIKc",
	],
	get sampleVideo() {
		return this.videos[0];
	},
};
export const videoPlayerModes: VideoPlayerModeWithoutNone[] = [
	"defaultView",
	"theaterMode",
	"fullscreen",
];
