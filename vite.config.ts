import { sentryVitePlugin } from "@sentry/vite-plugin";
import react from "@vitejs/plugin-react";
import postcssImport from "postcss-import";
import postcssNesting from "postcss-nesting";
// NOTE(FIXME): rollupが`use client`接頭辞を利用しているnode_modulesを解釈しきれずsourcemapが壊れる問題を対処するために入れている。tanstack-queryとmantineあたりが該当モジュール。 https://github.com/vitejs/vite/issues/15012#issuecomment-2049888711
import preserveDirectives from "rollup-preserve-directives";
import reactSvgr from "vite-plugin-svgr";
// NOTE: WXTがviteをラップしているのでviteのdefineConfigの型を引っ張るためだけにwxtからimportしている（config置き場を分置しておきたいがため）
import type { WxtViteConfig } from "wxt";

export default {
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
		}),
	],
	css: {
		postcss: {
			plugins: [postcssNesting, postcssImport()],
		},
	},
} as const satisfies WxtViteConfig;
