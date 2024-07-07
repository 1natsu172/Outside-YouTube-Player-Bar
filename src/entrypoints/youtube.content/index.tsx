import { Executor } from "@/core/mains/executor.js";
import { browserCaptureClient } from "@/core/presenters/observabilities/captureClient.presenter.js";
import { displayInfo } from "./Process/displayInfo.js";
import { mountUI } from "./Process/mount.js";
import { setupGlobalCaptureError } from "./Process/setupGlobalCaptureError.js";

// -----------------------------------------
// WXT WORLD
//------------------------------------------
/**
 * FIXME: WXTのimport対応待ち manifestに寄せたい
 * https://wxt.dev/guide/go-further/entrypoint-side-effects.html
 * https://github.com/wxt-dev/wxt/issues/336
 */
export const YOUTUBE_MATCHES = ["https://*.youtube.com/*"];
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
			setupGlobalCaptureError();
			displayInfo();
			const executor = new Executor(ctx);
			await Promise.all([mountUI(ctx), executor.initialization()]);
		} catch (error) {
			browserCaptureClient.captureException(error);
		}
	},
});
