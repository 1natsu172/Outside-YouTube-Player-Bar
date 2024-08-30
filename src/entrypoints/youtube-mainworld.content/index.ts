import { elementQuery } from "@/core/mains/meta.js";
import { YOUTUBE_MATCHES } from "@/utils/constants.js";
import { waitElement } from "@1natsu/wait-element";

export default defineContentScript({
	world: "MAIN",
	matches: YOUTUBE_MATCHES,
	async main() {
		const player = (await waitElement(elementQuery.MOVIE_PLAYER)) as Record<
			string,
			unknown
		>;

		console.log("MAIN CONTE", player.getCurrentTime);
	},
});
