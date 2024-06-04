import { defineConfig } from "wxt";
import type { UserConfig } from "wxt";
import viteConfig from "./vite.config.js";

export const developConfig: UserConfig = {
	srcDir: "src",
	entrypointsDir: "entrypoints", // src/entrypoints
	publicDir: "public", // src/public,
	runner: {
		disabled: false,
		binaries: {
			arc: "/Applications/Arc.app/Contents/MacOS/Arc",
			edge: "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
			firefox: "firefoxdeveloperedition",
		},
		openConsole: true,
	},
	vite: () => viteConfig,
};

/**
 * @description manifest.json config
 * @returns Some explicit configuration of manifest.json
 */
export const manifestJsonConfig: UserConfig["manifest"] = (configEnv) => ({
	name: "__MSG_appName__",
	short_name: "__MSG_appShortName__",
	description: "__MSG_appDescription__",
	// NOTE: auto generate by package.json semver
	// version: "4.0.0",
	// NOTE: Firefox is still mv2, so not explicitly. https://wxt.dev/guide/multiple-browsers.html#target-manifest-version
	// manifest_version: 3,
	default_locale: "en",
	icons: {
		"16": "/images/icon-16.png",
		"32": "/images/icon-32.png",
		"48": "/images/icon-48.png",
		"128": "/images/icon-128.png",
	},
	action: {
		default_icon: {
			"16": "/images/icon-16.png",
			"32": "/images/icon-32.png",
			"48": "/images/icon-48.png",
			"128": "/images/icon-128.png",
		},
		default_title: "__MSG_browserActionTitle__",
	},
	permissions: ["declarativeContent", "notifications", "storage"],
	// NOTE: must need id for use storage API etc, https://extensionworkshop.com/documentation/develop/extensions-and-the-add-on-id/
	browser_specific_settings:
		configEnv.browser === "firefox"
			? {
					gecko: {
						id: "{6c3b7240-7017-430b-b03c-432e61ee3a82}",
						strict_min_version: "42.0",
					},
				}
			: undefined,
});

// polymer config
export const createWxtConfig = ({
	developConfig,
	manifestConfig = manifestJsonConfig,
}: {
	developConfig: UserConfig;
	manifestConfig?: UserConfig["manifest"];
}) => {
	const config: UserConfig = {
		...developConfig,
		manifest: manifestConfig,
	};
	return defineConfig(config);
};

// See https://wxt.dev/api/config.html
export default createWxtConfig({ developConfig });
