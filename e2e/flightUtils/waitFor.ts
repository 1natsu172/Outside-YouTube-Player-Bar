import type { Expect, Locator, Page } from "@playwright/test";

type ExpectType = "visible" | "hidden";

export async function waitForElementAfterTimeout({
	page,
	locator,
	expect,
	timeout,
	expectType,
}: {
	page: Page;
	expect: Expect;
	locator: Locator;
	timeout: number;
	expectType: ExpectType;
}) {
	async function assertion(type: ExpectType) {
		switch (type) {
			case "visible":
				await expect(locator).toBeVisible();
				break;
			case "hidden":
				await expect(locator).toBeHidden();
				break;
			default:
				console.error("something is wrong.");
				break;
		}
	}

	await assertion(expectType);
	await page.waitForTimeout(timeout);
	await assertion(expectType);
}

export async function waitForCumulativeLayoutShift(page: Page, timeout = 3000) {
	await page.waitForTimeout(timeout);
}
