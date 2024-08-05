import type { ContentScriptContext } from "wxt/client";
declare global {
	interface Window {
		yt: unknown;
		ytcfg: unknown;
	}

	var __OYPB__:
		| {
				ctx?: ContentScriptContext;
		  }
		| undefined;
}

// biome-ignore lint/complexity/noUselessEmptyExport: needs on declaration file
export type {};
