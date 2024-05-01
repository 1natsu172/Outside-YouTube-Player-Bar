export default defineBackground({
	type: "module",
	main: () => {
		console.log("Hello background!", { id: browser.runtime.id });

		browser.runtime.onMessage.addListener((message) => {
			switch (message.action) {
				case "openOptionsPage":
					openOptionsPage();
					break;
				default:
					break;
			}
		});
	},
});

function openOptionsPage() {
	browser.runtime.openOptionsPage();
}
