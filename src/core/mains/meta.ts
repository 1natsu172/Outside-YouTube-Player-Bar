export const extensionNameSymbol = "OYPB";
export const extensionNameLowerSymbol = extensionNameSymbol.toLowerCase();
export const extensionNameCustomElementName = `${extensionNameLowerSymbol}-app`;

/**
 * @description DOM meta
 */
export const elementQuery = {
	MOVIE_PLAYER: "#movie_player",
	MOVIE_PLAYER_CONTAINER: "#player-container.ytd-watch-flexy",
	PLAYER_BAR: ".ytp-chrome-bottom",
	PLAYER_BAR_RIGHT_CTRL: ".ytp-right-controls",
	YTD_PAGE_MANAGER: "#page-manager > ytd-watch-flexy.ytd-page-manager",
	YTD_APP_CONTAINER: "ytd-app",
} as const;

export const elementAttributes = {
	playerMode: {
		defaultView: "default-layout",
		theater: "theater",
		fullscreen: "fullscreen",
	},
	oypb: {
		IS_OUTSIDE: "data-oypb-is-outside",
		ENABLE: "data-oypb-enable",
		COMPAT_ELEMENT_PREFIX: "data-oypb-compat",
		IS_ALWAYS_DISPLAY_PLAYER_BAR: "data-oypb-is-always-display-player-bar",
	},
	COMPAT_ELEMENT: {
		PLAYER_BAR_PARENT_CLASSNAME: "ytp-exp-bottom-control-flexbox",
	},
} as const;
