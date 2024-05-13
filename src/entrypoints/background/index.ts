import { onMessage } from "@/core/mains/messagings/uiSignals/index.js";

export default defineBackground({
	type: "module",
	main: () => {
		console.log("Hello background!", { id: browser.runtime.id });

		onMessage("openOptionsPage", () => {
			openOptionsPage();
		});

		// NOTE: Clicked on action icon (popup icon) listener.
		browser.action.onClicked.addListener(openOptionsPage);
	},
});

function openOptionsPage() {
	browser.runtime.openOptionsPage();
}
