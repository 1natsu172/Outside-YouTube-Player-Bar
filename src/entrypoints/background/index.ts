import { extMetaSignals } from "@/core/mains/messagings/extensionMetaSignals/index.js";
import { uiSignals } from "@/core/mains/messagings/uiSignals/index.js";
import { serviceWorkerCaptureClient } from "@/core/presenters/observabilities/captureClient.presenter.js";
import { logger } from "@/utils/logger.js";
import {
	openOptionsPage,
	reloadYouTubeTabs,
	setupGlobalCaptureError,
} from "./api/libs/index.js";

export default defineBackground({
	type: "module",
	main: () => {
		try {
			logger.log("Hello background!", { id: browser.runtime.id });

			setupGlobalCaptureError();

			uiSignals.onMessage("openOptionsPage", () => {
				try {
					openOptionsPage();
				} catch (error) {
					serviceWorkerCaptureClient.captureException(error);
				}
			});

			extMetaSignals.onMessage("reloadYouTubeTabs", async () => {
				try {
					await reloadYouTubeTabs();
				} catch (error) {
					serviceWorkerCaptureClient.captureException(error);
				}
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
	},
});
