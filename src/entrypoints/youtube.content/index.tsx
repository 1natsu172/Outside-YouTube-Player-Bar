import {
	additionalInitializationOnVideoPage,
	initialize,
} from "../../core/actions(oldservices)/inittialize";
import { observeNodes } from "../../core/actions(oldservices)/observeNodes";
import { registerListeners } from "../../core/actions(oldservices)/registerListeners";
import { displayInfo } from "./Process/displayInfo.js";
import { mountUI } from "./Process/mount.js";
import { Executor } from "@/core/mains/executor.js";

const initExtension = () => {
	const { isInitializeOnVideoPage } = initialize();
	registerListeners();
	observeNodes();

	if (isInitializeOnVideoPage) {
		additionalInitializationOnVideoPage();
	}
};

// -----------------------------------------
// WXT WORLD underconstructions
//------------------------------------------
/**
 * FIXME: WXTのimport対応待ち manifestに寄せたい
 * https://wxt.dev/guide/entrypoints.html#side-effects
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
		logger.success("Content-Script execute");
		displayInfo();
		const executor = new Executor();
		await Promise.all([mountUI(ctx), executor.initialization()]);
	},
});
