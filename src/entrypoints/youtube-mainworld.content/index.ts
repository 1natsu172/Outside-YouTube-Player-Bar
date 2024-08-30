import { elementQuery } from "@/core/mains/meta.js";
import { waitElement } from "@1natsu/wait-element";

export default defineContentScript({
	world: "MAIN",
	// FIXME: CJSのせいでbrowserが紛れ込んできてクラッシュする
	matches: ["https://*.youtube.com/*"],
	async main() {
		const player = (await waitElement(elementQuery.MOVIE_PLAYER)) as Record<
			string,
			unknown
		>;

		console.log("MAIN CONTE", player.getCurrentTime);
	},
});
