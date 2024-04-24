export const extensionNameSymbol = "OYPB";
export const extensionNameCustomElementName = `${extensionNameSymbol}-app`;

/**
 * @description DOM meta
 */
export const elementQuery = {
	MOVIE_PLAYER: "#movie_player",
	PLAYER_BAR: ".ytp-chrome-bottom",
	PLAYER_BAR_RIGHT_CTRL: ".ytp-right-controls",
	YTD_PAGE_MANAGER: "#page-manager > ytd-watch-flexy.ytd-page-manager",
} as const;

export const elementAttributes = {
	playerMode: {
		defaultView: "default-layout",
		theater: "theater",
		fullscreen: "fullscreen",
	},
} as const;
