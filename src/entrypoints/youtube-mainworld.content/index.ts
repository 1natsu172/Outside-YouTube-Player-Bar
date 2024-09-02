import { mainWorldSignals } from "@/core/mains/messagings/mainWorldSignals/index.js";
import { elementQuery } from "@/core/mains/meta.js";
import { YOUTUBE_MATCHES } from "@/utils/constants.js";
import { waitElement } from "@1natsu/wait-element";

export default defineContentScript({
	world: "MAIN",
	matches: YOUTUBE_MATCHES,
	async main() {
		const player = (await waitElement(elementQuery.MOVIE_PLAYER)) as Record<
			"hideControls" | "wakeUpControls",
			() => unknown
		>;

		logger.debug("player APIs", Object.keys(player));

		await mainWorldSignals.sendMessage("onReadyMainWorld", true);

		mainWorldSignals.onMessage("wakeUpPlayerBar", () => {
			player.wakeUpControls();
		});

		mainWorldSignals.onMessage("hidePlayerBar", () => {
			player.hideControls();
		});
	},
});
