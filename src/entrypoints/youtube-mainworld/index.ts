import { mainWorldSignals } from "@/core/mains/messagings/mainWorldSignals/index.js";
import { elementQuery } from "@/core/mains/meta.js";
import { waitElement } from "@1natsu/wait-element";

export default defineUnlistedScript({
	async main() {
		const player = (await waitElement(elementQuery.MOVIE_PLAYER)) as Record<
			"hideControls" | "wakeUpControls",
			() => unknown
		>;

		logger.debug("player APIs", Object.keys(player));

		mainWorldSignals.onMessage("wakeUpPlayerBar", () => {
			logger.debug("receive wakeUpPlayerBar");
			player.wakeUpControls();
		});

		mainWorldSignals.onMessage("hidePlayerBar", () => {
			logger.debug("receive hidePlayerBar");
			player.hideControls();
		});

		await mainWorldSignals.sendMessage("scriptReady", true);
	},
});
