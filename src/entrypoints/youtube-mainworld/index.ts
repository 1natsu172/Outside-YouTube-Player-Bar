import { waitElement } from "@1natsu/wait-element";
import { mainWorldSignals } from "@/core/mains/messagings/mainWorldSignals/index.js";
import { elementQuery } from "@/core/mains/meta.js";
import { playerBarControll } from "@/mainWorldServices/playerBarControll/index.js";

export default defineUnlistedScript({
	async main() {
		const player = await waitElement(elementQuery.MOVIE_PLAYER);

		logger.debug("player APIs", Object.keys(player));

		// @ts-expect-error
		await playerBarControll(player);

		await mainWorldSignals.sendMessage("scriptReady", true);
	},
});
