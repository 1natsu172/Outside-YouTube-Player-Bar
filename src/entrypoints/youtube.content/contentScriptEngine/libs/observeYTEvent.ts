type Listener = EventListenerOrEventListenerObject;

/**
 * fixtures
 */
const YT_EVENTS = [
	"yt-request-panel-mode-change",
	"yt-service-request-sent",
	"yt-service-request-error",
	"yt-service-request-completed",
	"yt-navigate",
	"yt-navigate-cache",
	"yt-navigate-start",
	"yt-navigate-finish",
	"yt-navigate-redirect",
	"yt-page-data-fetched",
	"yt-page-data-updated",
	"yt-navigate-set-page-offset",
	"visibilitychange",
	"yt-autonav-pause-focus",
	"yt-visibility-refresh",
	"yt-page-type-changed",
	"yt-page-data-will-update",
	"yt-page-manager-navigate-start",
	"yt-navigate-start",
	// 'yt-action',
	"yt-player-updated",
];

export const __DEBUG_YT_EVENTS = () => {
	for (const eventName of YT_EVENTS) {
		document.addEventListener(eventName, (event) => {
			logger.withTag("YT_EVENT").log(eventName, event);
		});
	}
};

///// YouTube does not use HistoryAPI navigation…… :(
export const observePageNavigate = (listener: Listener) => {
	const key = "yt-navigate-finish";
	document.addEventListener(key, listener);
	return () => {
		document.removeEventListener(key, listener);
	};
};

export const observeVideoLoaded = (listener: Listener) => {
	const key = "yt-page-data-updated";
	document.addEventListener(key, listener);
	return () => {
		document.removeEventListener(key, listener);
	};
};
