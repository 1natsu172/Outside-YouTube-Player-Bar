import type { Page } from "@playwright/test";

export async function openOptions(page: Page, extensionId: string) {
	await page.goto(`chrome-extension://${extensionId}/options.html`);

	await page.waitForSelector("#counter");

	const pageHandlers = {
		getCounter: () => page.waitForSelector("#counter"),
		clickCounter: async () => {
			const counter = await pageHandlers.getCounter();
			await counter.click();
		},
		getCounterText: async () => {
			const counter = await pageHandlers.getCounter();
			return await counter.evaluate((el) => el.textContent);
		},
	};
	return pageHandlers;
}
