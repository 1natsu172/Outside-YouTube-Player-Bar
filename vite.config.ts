import { readFileSync } from "node:fs";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import react from "@vitejs/plugin-react";
import postcssImport from "postcss-import";
import postcssNesting from "postcss-nesting";
// NOTE(FIXME): rollupが`use client`接頭辞を利用しているnode_modulesを解釈しきれずsourcemapが壊れる問題を対処するために入れている。tanstack-queryとmantineあたりが該当モジュール。 https://github.com/vitejs/vite/issues/15012#issuecomment-2049888711
import preserveDirectives from "rollup-preserve-directives";
import reactSvgr from "vite-plugin-svgr";
// NOTE: WXTがviteをラップしているのでviteのdefineConfigの型を引っ張るためだけにwxtからimportしている（config置き場を分置しておきたいがため）
import type { ConfigEnv as WxtConfigEnv, WxtViteConfig } from "wxt";

export const noExternal = ["@webext-core/storage", "@webext-core/messaging"];

const packageJson = JSON.parse(readFileSync("./package.json", "utf-8"));

// NOTE(FIXME(future)): vite.config.tsで関数exportは本来defineConfigするが、WXTでラップして使う以上WXT前提の関数となっている。WXTを剥がす場合気をつける。
export default (configEnv: WxtConfigEnv) => {
	return {
		define: {
			__APP_VERSION__: JSON.stringify(packageJson.version),
		},
		build: {
			sourcemap: true, // Source map generation must be turned on (for Sentry)
		},
		plugins: [
			react(),
			reactSvgr(),
			preserveDirectives(),
			//NOTE: For Source Maps - Need put the Sentry vite plugin after all other plugins.
			sentryVitePlugin({
				authToken: process.env.SENTRY_AUTH_TOKEN,
				org: "4d5e926a0e43",
				project: "oypb",
				disable: configEnv.mode === "development",
			}),
		],
		css: {
			postcss: {
				plugins: [postcssNesting, postcssImport()],
			},
		},
		ssr: {
			noExternal,
		},
	} as const satisfies WxtViteConfig;
};
