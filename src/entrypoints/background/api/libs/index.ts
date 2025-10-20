import { YOUTUBE_MATCHES } from "@/utils/constants.js";

export function openOptionsPage() {
	browser.runtime.openOptionsPage();
}

export async function reloadYouTubeTabs() {
	const tabs = await browser.tabs.query({ url: YOUTUBE_MATCHES });
	for (const tab of tabs) {
		if (tab.id !== undefined) {
			browser.tabs.reload(tab.id);
		}
	}
}
