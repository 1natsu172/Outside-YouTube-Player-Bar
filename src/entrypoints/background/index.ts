import { onMessage } from "@/core/mains/messagings/uiSignals/index.js";

export default defineBackground({
	type: "module",
	main: () => {
		console.log("Hello background!", { id: browser.runtime.id });

		onMessage("openOptionsPage", () => {
			openOptionsPage();
		});
	},
});

function openOptionsPage() {
	browser.runtime.openOptionsPage();
}
