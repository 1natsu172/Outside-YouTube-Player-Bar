import type { VideoPlayerModeWithoutNone } from "@/core/mains/contentScriptState.js";
import { URLS, expect, test } from "@@/e2e/fixture.js";
import { openOptions } from "@@/e2e/flightUtils/optionsPage.js";
import {
	waitForCumulativeLayoutShift,
	waitForElementAfterTimeout,
} from "@@/e2e/flightUtils/waitFor.js";
import { openYouTube } from "@@/e2e/flightUtils/youtube.js";

const videoPlayerModes: VideoPlayerModeWithoutNone[] = [
	"defaultView",
	"theaterMode",
	"fullscreen",
];

for (const videoPlayerMode of videoPlayerModes) {
	test.describe(videoPlayerMode, () => {
		test("enable: alwaysDisplayPlayerBar", async ({ page, extensionId }) => {
			const { getAlwaysDisplayPlayerBar } = await openOptions(page, {
				extensionId,
				videoPlayerMode,
			});

			const setting = await getAlwaysDisplayPlayerBar();

			await expect(setting.input).toBeChecked();

			const { playVideoPlayer, getPlayerBar, getTargetVideoPlayerModeButton } =
				await openYouTube(page, {
					url: URLS.sampleVideo,
				});

			await playVideoPlayer();

			await waitForCumulativeLayoutShift(page);

			const changeToTargetVideoMode =
				await getTargetVideoPlayerModeButton(videoPlayerMode);
			await changeToTargetVideoMode?.click();

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

			const { playVideoPlayer, getPlayerBar, getTargetVideoPlayerModeButton } =
				await openYouTube(page, {
					url: URLS.sampleVideo,
				});

			await playVideoPlayer();

			await waitForCumulativeLayoutShift(page);

			const videoPlayerModeButton =
				await getTargetVideoPlayerModeButton(videoPlayerMode);
			await videoPlayerModeButton?.click();

			await waitForElementAfterTimeout({
				page,
				locator: getPlayerBar(),
				expect,
				expectType: "hidden",
				timeout: 5000,
			});
		});
	});
}
