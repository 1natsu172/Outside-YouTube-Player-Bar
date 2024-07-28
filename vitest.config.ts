/**
 * reference from WXT-example vitest
 * @description https://github.com/wxt-dev/wxt-examples/tree/main/examples/vanilla-vitest#readme
 */
console.log("vitest.config.ts");
import react from "@vitejs/plugin-react";
import { defaultExclude, defineConfig } from "vitest/config";
import { WxtVitest } from "wxt/testing";
import { noExternal } from "./vite.config.js";

export default defineConfig({
	// Configure test behavior however you like
	test: {
		mockReset: true,
		restoreMocks: true,
		env: {
			RUN_ON_TESTING: "true",
		},
		exclude: [...defaultExclude, "**/e2e/**"],
	},
	// This is the line that matters!
	plugins: [WxtVitest(), react()],
	// If any dependencies rely on webextension-polyfill, add them here to the `ssr.noExternal` option.
	// Example:
	ssr: {
		noExternal,
	},
});
