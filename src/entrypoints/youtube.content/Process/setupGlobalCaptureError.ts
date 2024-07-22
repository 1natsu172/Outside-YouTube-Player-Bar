import { browserCaptureClient } from "@/core/presenters/observabilities/captureClient.presenter.js";

export const setupGlobalCaptureError = () => {
	window.addEventListener("error", (error) => {
		logger.error("error", error);
		browserCaptureClient.captureException(error);
	});
	window.addEventListener("unhandledrejection", (error) => {
		logger.error("error unhandled", error);
		browserCaptureClient.captureException(error, {
			captureContext: {
				contexts: { reason: error.reason },
			},
		});
	});
};
