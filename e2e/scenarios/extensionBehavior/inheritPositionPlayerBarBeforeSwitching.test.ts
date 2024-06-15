import type { VideoPlayerModeWithoutNone } from "@/core/mains/contentScriptState.js";
import { URLS, expect, test } from "@@/e2e/fixture.js";
import { openOptions } from "@@/e2e/flightUtils/optionsPage.js";
import { waitForCumulativeLayoutShift } from "@@/e2e/flightUtils/waitFor.js";
import { openYouTube } from "@@/e2e/flightUtils/youtube.js";

// FIXME:NOTE: MultipleSelectのe2eのためのlocator取得があまりにだるいのでデフォルトオプションかつdefaultView←theaterのパターンのみテストすることで妥協している
test.describe("inheritPositionPlayerBar", () => {
	const videoPlayerMode: VideoPlayerModeWithoutNone = "defaultView";
	const inheritOrigins: VideoPlayerModeWithoutNone[] = ["theaterMode"];

	for (const inheritOrigin of inheritOrigins) {
		test(`inheritPositionPlayerBar: ${inheritOrigin} => ${videoPlayerMode}`, async ({
			page,
			extensionId,
		}) => {
			// Same setting
			for (const mode of [videoPlayerMode, inheritOrigin]) {
				const { getAlwaysDisplayPlayerBar } = await openOptions(page, {
					extensionId,
					videoPlayerMode: mode,
				});

				// NOTE: flakyの原因になるのでalwaysDisplayPlayerBarをdisableにする
				const alwaysDisplayPlayerBarSetting = await getAlwaysDisplayPlayerBar();
				await alwaysDisplayPlayerBarSetting.inputParent.click();
				await expect(alwaysDisplayPlayerBarSetting.input).toBeChecked({
					checked: false,
				});
			}

			// Test target option setting
			const targetPlayerModeOptions = await openOptions(page, {
				extensionId,
				videoPlayerMode,
			});
			(
				await targetPlayerModeOptions.getPositionPlayerBar()
			).inside.inputHandle.click();
			await expect(
				(await targetPlayerModeOptions.getPositionPlayerBar()).inside.input,
			).toBeChecked();

			const {
				playVideoPlayer,
				pauseVideoPlayer,
				isOutside,
				getTargetVideoPlayerModeButton,
				getOypbButton,
			} = await openYouTube(page, {
				url: URLS.sampleVideo,
			});

			await waitForCumulativeLayoutShift(page);

			await playVideoPlayer();
			await pauseVideoPlayer();

			// Asssert at defaultView
			expect(await isOutside()).toBe(false);

			const changeModeToInheritOrigin =
				await getTargetVideoPlayerModeButton(inheritOrigin);
			await changeModeToInheritOrigin?.click();

			// Bar move to the outside
			await getOypbButton().click();
			await page.waitForTimeout(1000);

			expect(await isOutside()).toBe(true);

			const changeModeToTestTargetMode =
				await getTargetVideoPlayerModeButton(videoPlayerMode);
			await changeModeToTestTargetMode?.click();

			// Assert the inherited position
			expect(await isOutside()).toBe(true);
		});
	}
});
