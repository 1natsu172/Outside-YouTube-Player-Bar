import { extMetaSignals } from "@/core/mains/messagings/extensionMetaSignals/index.js";
import { uiSignals } from "@/core/mains/messagings/uiSignals/index.js";
import { serviceWorkerCaptureClient } from "@/core/presenters/observabilities/captureClient.presenter.js";
import { YOUTUBE_MATCHES } from "../youtube.content/index.js";

export default defineBackground({
	type: "module",
	main: () => {
		console.log("Hello background!", { id: browser.runtime.id });

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
	},
});

function openOptionsPage() {
	browser.runtime.openOptionsPage();
}

async function reloadYouTubeTabs() {
	const tabs = await browser.tabs.query({ url: YOUTUBE_MATCHES });
	for (const tab of tabs) {
		browser.tabs.reload(tab.id);
	}
}

function setupGlobalCaptureError() {
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
