import path from "path";
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
	context: async ({}, use) => {
		const context = await chromium.launchPersistentContext("", {
			headless: false,
			args: [
				`--disable-extensions-except=${pathToExtension}`,
				`--load-extension=${pathToExtension}`,
			],
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
