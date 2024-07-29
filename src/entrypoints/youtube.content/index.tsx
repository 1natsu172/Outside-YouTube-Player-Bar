import { Executor } from "@/core/mains/executor.js";
import { browserCaptureClient } from "@/core/presenters/observabilities/captureClient.presenter.js";
import { setupGlobalCaptureError } from "@/utils/captureUtils/captureErrors/globalCapture.js";
import { YOUTUBE_MATCHES } from "@/utils/constants.js";
import { displayInfo } from "./Process/displayInfo.js";
import { mountUI } from "./Process/mount.js";

export default defineContentScript({
	matches: YOUTUBE_MATCHES,
	/**
	 * At here, focus on injecting UI components (shadow ui).
	 * About the non-shadow page css that async manual injection.
	 */
	cssInjectionMode: "ui",
	async main(ctx) {
		try {
			logger.success("Content-Script execute");
			setupGlobalCaptureError(browserCaptureClient);
			displayInfo();
			const executor = new Executor(ctx);
			await Promise.all([mountUI(ctx), executor.initialization()]);
		} catch (error) {
			browserCaptureClient.captureException(error);
		}
	},
});
