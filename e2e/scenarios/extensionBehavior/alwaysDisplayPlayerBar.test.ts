import type { VideoPlayerModeWithoutNone } from "@/core/mains/contentScriptState.js";
import { URLS, expect, test } from "@@/e2e/fixture.js";
import { openOptions } from "@@/e2e/flightUtils/optionsPage.js";
import {
	waitForCumulativeLayoutShift,
	waitForElementAfterTimeout,
} from "@@/e2e/flightUtils/waitFor.js";
import { openYouTube } from "@@/e2e/flightUtils/youtube.js";

test.describe("defaultView", () => {
	const videoPlayerMode: VideoPlayerModeWithoutNone = "defaultView";

	test("enable: alwaysDisplayPlayerBar", async ({ page, extensionId }) => {
		const { getAlwaysDisplayPlayerBar } = await openOptions(page, {
			extensionId,
			videoPlayerMode,
		});

		const setting = await getAlwaysDisplayPlayerBar();

		await expect(setting.input).toBeChecked();

		const { playVideoPlayer, getPlayerBar } = await openYouTube(page, {
			url: URLS.sampleVideo,
		});

		await playVideoPlayer();

		await waitForCumulativeLayoutShift(page);

		await waitForElementAfterTimeout({
			page,
			locator: getPlayerBar(),
			expect,
			expectType: "visible",
			timeout: 5000,
		});
	});

	test("disable: alwaysDisplayPlayerBar", async ({ page, extensionId }) => {
		const { getAlwaysDisplayPlayerBar } = await openOptions(page, {
			extensionId,
			videoPlayerMode,
		});

		const setting = await getAlwaysDisplayPlayerBar();
		await setting.inputParent.click();
		await expect(setting.input).toBeChecked({ checked: false });

		const { playVideoPlayer, getPlayerBar } = await openYouTube(page, {
			url: URLS.sampleVideo,
		});

		await playVideoPlayer();

		await waitForCumulativeLayoutShift(page);

		await waitForElementAfterTimeout({
			page,
			locator: getPlayerBar(),
			expect,
			expectType: "hidden",
			timeout: 5000,
		});
	});
});
