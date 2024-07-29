import type { CaptureClient } from "@/core/presenters/observabilities/captureClient.presenter.js";

export const setupGlobalCaptureError = (captureClient: CaptureClient) => {
	globalThis.addEventListener("error", (error) => {
		logger.error("error", error);
		captureClient.captureException(error);
	});
	globalThis.addEventListener("unhandledrejection", (error) => {
		logger.error("error unhandled", error);
		captureClient.captureException(error, {
			captureContext: {
				contexts: { reason: error.reason },
			},
		});
	});
};
