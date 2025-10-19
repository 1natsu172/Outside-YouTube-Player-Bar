import type { KnipConfig } from "knip";

const config = async (): Promise<KnipConfig> => {
	const isProduction = process.argv.includes("--production");

	return {
		tags: ["@knip-ignore", "@knip-public"],
		/**
		 * @ref https://knip.dev/reference/configuration#paths
		 */
		paths: {
			// Provide types for WXT's auto-imported modules
			"#imports": [".wxt/types/imports-module.d.ts"],
		},
		...(isProduction && {
			// In production mode, bundled JS files cannot trace original imports,
			// so we exclude dependency-related checks
			exclude: [
				"dependencies",
				"devDependencies",
				"optionalPeerDependencies",
				"binaries",
			],
		}),
		/**
		 * @ref https://knip.dev/reference/configuration#entry
		 */
		entry: [
			// Development mode: WXT entrypoints
			"src/entrypoints/*/index.{ts,tsx}",
			"src/entrypoints/options/mount.tsx", // FIXME1: knipのcompilerがhtmlの<script src>から検出ができないらしいので、仕方なくオプションページのjsを固定参照している。本来はoptions/index.htmlから検出してほしい。

			// Production mode: Built output (use with --production flag)
			".output/*-mv*-production/background.js!",
			".output/*-mv*-production/youtube-mainworld.js!",
			".output/*-mv*-production/content-scripts/youtube.js!",
			".output/*-mv*-production/chunks/*.js!", // FIXME2: FIXME1と同じくhtmlから検出できないため、仕方なくchunks配下を固定参照している。
			// ".output/*-mv*-production/options.html!",
		],
		/**
		 * @ref https://knip.dev/reference/configuration#project
		 * @ref https://knip.dev/features/production-mode
		 */
		project: [
			// Development mode: All source files
			"src/**/*.{ts,tsx}",
			// Production mode: Built output
			".output/*-mv*-production/**/*.{js}!",
		],
		ignoreBinaries: [
			"gh", // GitHub CLI - external dependency not in package.json
		],
	};
};

export default config;
