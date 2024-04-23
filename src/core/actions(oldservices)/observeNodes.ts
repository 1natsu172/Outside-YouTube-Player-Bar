import { waitElement } from "@1natsu/wait-element";
import { debounce } from "mabiki";
import { displayPlayerBar } from "../controllers(deprecated)/displayPlayerBar.js";
import { observeHeightOfPlayerBar } from "../controllers(deprecated)/observeHeightOfPlayerBar.js";
import { observeIsVisiblePlayerBar } from "../controllers(deprecated)/observeIsVisiblePlayerBar";
import { setPlayerBarHeightVar } from "../usecases/cssVariables.usecase.js";

export const observeNodes = async () => {
	const player = await waitElement("#movie_player");
	const { blockAutohide } = await displayPlayerBar();
	const playerBarContainer = await waitElement(".ytp-chrome-bottom");

	observeIsVisiblePlayerBar(player as Node, {
		blockAutohide: debounce(blockAutohide, 1000, {
			trailing: true,
			leading: true,
		}),
	});

	observeHeightOfPlayerBar(playerBarContainer, {
		setPlayerBarHeight: debounce(setPlayerBarHeightVar, 500, {
			trailing: true,
			leading: true,
		}),
	});
};
