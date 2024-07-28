import { serviceWorkerCaptureClient } from "@/core/presenters/observabilities/captureClient.presenter.js";
import { YOUTUBE_MATCHES } from "@/utils/constants.js";

export function openOptionsPage() {
	browser.runtime.openOptionsPage();
}

export async function reloadYouTubeTabs() {
	const tabs = await browser.tabs.query({ url: YOUTUBE_MATCHES });
	for (const tab of tabs) {
		browser.tabs.reload(tab.id);
	}
}

export function setupGlobalCaptureError() {
	logger.log("setupGlobalCaptureError", self);

	self.addEventListener("error", (error) => {
		logger.error("error", error);
		serviceWorkerCaptureClient.captureException(error);
	});
	self.addEventListener("unhandledrejection", (error) => {
		logger.error("error unhandled", error);
		serviceWorkerCaptureClient.captureException(error, {
			captureContext: {
				contexts: { reason: error.reason },
			},
		});
	});
}
