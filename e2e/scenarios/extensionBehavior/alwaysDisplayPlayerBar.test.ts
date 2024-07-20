import { URLS, expect, test, videoPlayerModes } from "@@/e2e/fixture.js";
import { openOptions } from "@@/e2e/flightUtils/optionsPage.js";
import {
	waitForCumulativeLayoutShift,
	waitForElementAfterTimeout,
} from "@@/e2e/flightUtils/waitFor.js";
import { openYouTube } from "@@/e2e/flightUtils/youtube.js";

/**
 * FIXME: disableのfullscreenのシナリオがとにかく不安定
 */
for (const videoPlayerMode of videoPlayerModes) {
	test.describe(videoPlayerMode, () => {
		test("enable: alwaysDisplayPlayerBar", async ({ page, extensionId }) => {
			const { getAlwaysDisplayPlayerBar, getPositionPlayerBar } =
				await openOptions(page, {
					extensionId,
					videoPlayerMode,
				});

			const setting = await getAlwaysDisplayPlayerBar();
			await expect(setting.input).toBeChecked();

			// ポジションのデフォルトオプションを外側にする
			const positionPlayerBarSetting = await getPositionPlayerBar();
			await positionPlayerBarSetting.outside.inputHandle.click();
			await expect(positionPlayerBarSetting.outside.input).toBeChecked();

			const { playVideoPlayer, getPlayerBar, getTargetVideoPlayerModeButton } =
				await openYouTube(page, {
					url: URLS.sampleVideo,
				});

			await waitForCumulativeLayoutShift(page);

			await playVideoPlayer();

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
			const { getAlwaysDisplayPlayerBar, getPositionPlayerBar } =
				await openOptions(page, {
					extensionId,
					videoPlayerMode,
				});

			const setting = await getAlwaysDisplayPlayerBar();
			await setting.inputParent.click();
			await expect(setting.input).toBeChecked({ checked: false });

			// ポジションのデフォルトオプションを外側にする
			const positionPlayerBarSetting = await getPositionPlayerBar();
			await positionPlayerBarSetting.outside.inputHandle.click();
			await expect(positionPlayerBarSetting.outside.input).toBeChecked();

			const { playVideoPlayer, getPlayerBar, getTargetVideoPlayerModeButton } =
				await openYouTube(page, {
					url: URLS.sampleVideo,
				});

			await waitForCumulativeLayoutShift(page);

			await playVideoPlayer();

			const videoPlayerModeButton =
				await getTargetVideoPlayerModeButton(videoPlayerMode);
			await videoPlayerModeButton?.click();

			await waitForElementAfterTimeout({
				page,
				locator: getPlayerBar(),
				expect,
				expectType: "hidden", // NOTE: oypbでoutsideにするときは独自のcssでdisplay:noneしているのでhiddenのアサーションで正しい
				timeout: 5000,
			});
		});
	});
}
