import react from "@vitejs/plugin-react";
import reactSvgr from "vite-plugin-svgr";
import postcssNesting from "postcss-nesting";
import postcssImport from "postcss-import";
// MEMO: WXTがviteをラップしているのでviteのdefineConfigの型を引っ張るためだけにwxtからimportしている（config置き場を分置しておきたいがため）
import type { WxtViteConfig } from "wxt";

export default {
	plugins: [react(), reactSvgr()],
	css: {
		postcss: {
			plugins: [postcssNesting, postcssImport()],
		},
	},
} as const satisfies WxtViteConfig;
