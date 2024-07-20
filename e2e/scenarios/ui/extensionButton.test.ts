import { URLS, expect, test } from "../../fixture.js";
import { openYouTube } from "../../flightUtils/youtube.js";

test("has oypb buttons", async ({ page }) => {
	const { getOypbButton, getOpenSettingsButton } = await openYouTube(page, {
		url: URLS.sampleVideo,
	});
	const oypbButton = await getOypbButton();
	const hasOypbButton = await oypbButton.isVisible();
	const openSettingsButton = await getOpenSettingsButton();
	const hasOpenSettingsButton = await openSettingsButton.isVisible();

	// Expect a title "to contain" a substring.
	expect(hasOypbButton).toBe(true);
	expect(hasOpenSettingsButton).toBe(true);
});
