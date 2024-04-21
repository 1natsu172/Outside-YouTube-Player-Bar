import { elementQuery } from "@/core/mains/meta.js";

// document.querySelector('#player-container.style-scope.ytd-watch-flexy').appendChild(document.querySelector('.ytp-chrome-bottom'))

// TOOD: DOMうごかす
const dom = () => {
	const query = {
		defaultView: {
			parentContainer: "#player-container.ytd-watch-flexy",
			playerBar: elementQuery.PLAYER_BAR,
		},
	};

	//シアターは'#full-bleed-container.ytd-watch-flexy' の兄弟要素に動かすしかない
};
