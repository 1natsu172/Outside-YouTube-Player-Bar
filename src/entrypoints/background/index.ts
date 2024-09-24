import { extMetaSignals } from "@/core/mains/messagings/extensionMetaSignals/index.js";
import { uiSignals } from "@/core/mains/messagings/uiSignals/index.js";
import { serviceWorkerCaptureClient } from "@/core/presenters/observabilities/captureClient.presenter.js";
import { setupGlobalCaptureError } from "@/utils/captureUtils/captureErrors/globalCapture.js";
import { openOptionsPage, reloadYouTubeTabs } from "./api/libs/index.js";

export default defineBackground({
	type: "module",
	main: () => {
		const regist = async () => {
			try {
				setupGlobalCaptureError(serviceWorkerCaptureClient);

				logger.log("Hello background!", { id: browser.runtime.id });

				uiSignals.onMessage("openOptionsPage", () => {
					openOptionsPage();
				});

				extMetaSignals.onMessage("reloadYouTubeTabs", async () => {
					await reloadYouTubeTabs();
				});

				// NOTE: Clicked on action icon (popup icon) listener.
				(browser.action ?? browser.browserAction).onClicked.addListener(() => {
					try {
						openOptionsPage();
					} catch (error) {
						serviceWorkerCaptureClient.captureException(error);
					}
				});
			} catch (error) {
				serviceWorkerCaptureClient.captureException(error);
			}
		};

		regist();
	},
});
