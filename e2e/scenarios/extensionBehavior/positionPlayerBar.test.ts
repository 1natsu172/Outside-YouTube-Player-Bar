import { URLS, expect, test, videoPlayerModes } from "@@/e2e/fixture.js";
import { openOptions } from "@@/e2e/flightUtils/optionsPage.js";
import { waitForCumulativeLayoutShift } from "@@/e2e/flightUtils/waitFor.js";
import { openYouTube } from "@@/e2e/flightUtils/youtube.js";

const positionMap = ["inside", "outside"] as const;

for (const videoPlayerMode of videoPlayerModes) {
	test.describe(videoPlayerMode, () => {
		for (const position of positionMap) {
			test(`${position}: positionPlayerBar`, async ({ page, extensionId }) => {
				const { getPositionPlayerBar, getAlwaysDisplayPlayerBar } =
					await openOptions(page, {
						extensionId,
						videoPlayerMode,
					});

				// NOTE: flakyの原因になるのでalwaysDisplayPlayerBarをdisableにする
				const alwaysDisplayPlayerBarSetting = await getAlwaysDisplayPlayerBar();
				await alwaysDisplayPlayerBarSetting.inputParent.click();
				await expect(alwaysDisplayPlayerBarSetting.input).toBeChecked({
					checked: false,
				});

				const positionPlayerBarSetting = await getPositionPlayerBar();

				// set default option setting.
				await positionPlayerBarSetting[position].inputHandle.click();
				await expect(positionPlayerBarSetting[position].input).toBeChecked();

				const {
					playVideoPlayer,
					pauseVideoPlayer,
					getPlayerBar,
					getOypbButton,
					getProgressBar,
					getTimeDisplay,
					getTargetVideoPlayerModeButton,
				} = await openYouTube(page, {
					url: URLS.sampleVideo,
				});

				await waitForCumulativeLayoutShift(page);

				// change videp player mode
				const videoPlayerModeButton =
					await getTargetVideoPlayerModeButton(videoPlayerMode);
				await videoPlayerModeButton?.click();

				await playVideoPlayer();
				await pauseVideoPlayer();

				// assert initial setting position
				await expect(getPlayerBar()).toHaveScreenshot({
					mask: [getProgressBar(), getTimeDisplay()],
				});

				// assert toggle position
				await getOypbButton().click();
				await page.waitForTimeout(1000);
				await expect(getPlayerBar()).toHaveScreenshot({
					mask: [getProgressBar(), getTimeDisplay()],
				});
			});
		}
	});
}
