import { extMetaSignals } from "@/core/mains/messagings/extensionMetaSignals/index.js";
import { uiSignals } from "@/core/mains/messagings/uiSignals/index.js";
import { YOUTUBE_MATCHES } from "../youtube.content/index.js";

export default defineBackground({
	type: "module",
	main: () => {
		console.log("Hello background!", { id: browser.runtime.id });

		uiSignals.onMessage("openOptionsPage", () => {
			openOptionsPage();
		});
		extMetaSignals.onMessage("reloadYouTubeTabs", async () => {
			await reloadYouTubeTabs();
		});

		// NOTE: Clicked on action icon (popup icon) listener.
		(browser.action ?? browser.browserAction).onClicked.addListener(
			openOptionsPage,
		);
	},
});

function openOptionsPage() {
	browser.runtime.openOptionsPage();
}

async function reloadYouTubeTabs() {
	const tabs = await browser.tabs.query({ url: YOUTUBE_MATCHES });
	for (const tab of tabs) {
		browser.tabs.reload(tab.id);
	}
}
