import type { ContentScriptContext } from "#imports";

export const YOUTUBE_MATCHES = ["https://*.youtube.com/*"];

export function setupOYPBGlobal(obj: { ctx?: ContentScriptContext }) {
	globalThis.__OYPB__ = obj;
	logger.debug("Done setup globalThis.__OYPB__", globalThis.__OYPB__);
}
