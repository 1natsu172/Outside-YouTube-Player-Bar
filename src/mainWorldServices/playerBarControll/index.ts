import { mainWorldSignals } from "@/core/mains/messagings/mainWorldSignals/index.js";

type MainWorldPlayer = {
	/**
	 * @description Display the actual bar.
	 */
	wakeUpControls: () => unknown;
	/**
	 * @description Hide the actual bar with `display: none` in `ytp-chrome-bottom`.
	 */
	hideControls: () => unknown;

	/**
	 * @description Actually, this is revert `hideControls`. Remove `display: none` in `ytp-chrome-bottom`.
	 */
	showControls: () => unknown;
} & Element;

let wakeUpIntervalTimer: NodeJS.Timeout | undefined = undefined;

export const playerBarControll = async (player: MainWorldPlayer) => {
	mainWorldSignals.onMessage("wakeUpPlayerBar", () => {
		if (!wakeUpIntervalTimer) {
			wakeUpIntervalTimer = setInterval(() => {
				logger.debug("Interval requesting wakeUpPlayerBar");
				player.wakeUpControls();
			}, 950);
		} else {
			logger.debug("Already interval wakeUpPlayerBar");
		}
	});

	mainWorldSignals.onMessage("wakeUpPlayerBarOnce", () => {
		logger.debug("Once requesting wakeUpPlayerBar");
		player.wakeUpControls();
	});

	mainWorldSignals.onMessage("resetControlState", () => {
		logger.debug("Once requesting wakeUpPlayerBar");
		player.showControls();
		clearWakeUpInterval();
	});

	mainWorldSignals.onMessage("hidePlayerBar", () => {
		logger.debug("requesting hide playerBar");
		if (wakeUpIntervalTimer) {
			clearWakeUpInterval();
		}
		player.hideControls();
	});

	mainWorldSignals.onMessage("clearWakeUpPlayerBar", () => {
		logger.debug("try clear wakeUpIntervalTimer", { wakeUpIntervalTimer });
		clearWakeUpInterval();
	});

	function clearWakeUpInterval() {
		clearInterval(wakeUpIntervalTimer);
		wakeUpIntervalTimer = undefined;
		logger.debug("cleared wakeUpIntervalTimer");
	}
};
