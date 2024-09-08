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

		// TODO: メッセージングを再実装する
		mainWorldSignals.onMessage("wakeUpPlayerBar", () => {
			logger.debug("receive wakeUpPlayerBar");
			player.wakeUpControls();
		});

		mainWorldSignals.onMessage("hidePlayerBar", () => {
			logger.debug("receive hidePlayerBar");
			player.hideControls();
		});

		mainWorldSignals.onMessage("scriptReady", (message) => {
			void logger.warn(
				"FIXME: WORKAROUND FOR GUARD RECEIVING SENDER OWN MESSAGE https://github.com/aklinker1/webext-core/issues/57",
				message,
			);
		});
		await mainWorldSignals.sendMessage("scriptReady", true);
	},
});
