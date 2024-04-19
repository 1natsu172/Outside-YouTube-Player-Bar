import { notification } from "./libs/extensionNotify/notifications";

const WANNA_NOTIFY = false;

browser.runtime.onInstalled.addListener((details) => {
	const previousVersion = details.previousVersion;
	const currentVersion = browser.runtime.getManifest().version;
	const isDiffVersion = previousVersion !== currentVersion;

	console.log("previousVersion", previousVersion);
	console.log("currentVersion", currentVersion);

	if (details.reason === "install") {
		notification(details);
	}

	if (details.reason === "update") {
		WANNA_NOTIFY && isDiffVersion && notification(details);
	}
});

// // When the extension is installed or upgraded ...
browser.runtime.onInstalled.addListener(() => {
	// Replace all rules ...
	browser.declarativeContent.onPageChanged.removeRules(undefined, () => {
		// With a new rule ...
		browser.declarativeContent.onPageChanged.addRules([
			{
				// That fires when a page's URL contains a 'g' ...
				conditions: [
					new browser.declarativeContent.PageStateMatcher({
						pageUrl: {
							schemes: ["https"],
							hostContains: ".youtube.com",
							// pathContains: '/watch'
						},
					}),
				],
				// And shows the extension's page action.
				actions: [new browser.declarativeContent.ShowPageAction()],
			},
		]);
	});
});

console.log(browser.runtime.getManifest().name);
