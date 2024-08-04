import { elementAttributes, elementQuery } from "@/core/mains/meta.js";
import { getBehaviorState } from "@/core/presenters/statePresenter/behaviorState/index.js";
import { getUiOps } from "@/core/presenters/statePresenter/operationState/index.js";
import { getSiteMetaState } from "@/core/presenters/statePresenter/siteMetaState/index.js";
import { resolveBehaviorOption } from "@/core/presenters/storagePresenter/options.presenter.js";
import { moviePlayerHoveringOperation } from "@/core/services//operationServices/index.js";
import { documentElementAttr } from "@/core/services/domAffectServices/domMetaAffect.service.js";
import {
	isElementTheTarget,
	isMouseEvent,
	mouseleaveJudge,
} from "@/core/services/eventEffectServices/libs/mouseEventJudge.js";

// TODO: テスト書く
export function judgeMoviePlayerCondition(moviePlayer: Element) {
	const isPlayingMode = moviePlayer.classList.contains("playing-mode");
	const isPausedMode = moviePlayer.classList.contains("paused-mode");
	const isAutoHide = moviePlayer.classList.contains("ytp-autohide");

	const isVisiblePlayerBar = isPausedMode || !isAutoHide;

	return {
		isPlayingMode,
		isPausedMode,
		isVisiblePlayerBar,
	};
}

/**
 * @description NOTE: https://github.com/1natsu172/Outside-YouTube-Player-Bar/issues/84
 */
export const createPlayerHackEventFn = (moviePlayer: Element) => {
	// const mousedown = (mouseEventInit?:MouseEventInit) => moviePlayer.dispatchEvent(new MouseEvent("mousedown",mouseEventInit));
	const mouseover = (mouseEventInit?: MouseEventInit) =>
		moviePlayer.dispatchEvent(new MouseEvent("mouseover", mouseEventInit));
	const mousemove = (mouseEventInit?: MouseEventInit) =>
		moviePlayer.dispatchEvent(new MouseEvent("mousemove", mouseEventInit));
	const mouseleave = (mouseEventInit?: MouseEventInit) =>
		moviePlayer.dispatchEvent(new MouseEvent("mouseleave", mouseEventInit));

	function activateBlockAutoHide() {
		disableAutoHide();
	}
	function deactivateBlockAutoHide() {
		enableAutoHide();
	}

	function disableAutoHide() {
		mouseover({ clientX: 1, clientY: 1 });
		mousemove({ clientX: 2, clientY: 2 });
		logger.debug("disableAutoHide function fired.");
	}

	function enableAutoHide() {
		mouseleave();
		logger.debug("enableAutoHide function fired.");
	}

	function hideCursor() {
		(moviePlayer as HTMLElement).style.cursor = "none";
		logger.debug("hide mouse cursor on player.");
	}

	function undoHideCursor() {
		(moviePlayer as HTMLElement).style.cursor = "auto";
		logger.debug("undo-hide mouse cursor on player.");
	}

	return {
		activateBlockAutoHide,
		deactivateBlockAutoHide,
		hideCursor,
		undoHideCursor,
	};
};

export const execAlwaysDisplayPlayerBar = async ({
	isVisiblePlayerBar,
	blockAutoHide,
	hideCursor,
}: {
	isVisiblePlayerBar: boolean;
	blockAutoHide: () => void;
	hideCursor: () => void;
}) => {
	if (globalThis.__OYPB__?.ctx?.isInvalid) {
		return;
	}

	const dataAttrIsAlwaysDisplayBar = documentElementAttr(
		elementAttributes.oypb.IS_ALWAYS_DISPLAY_PLAYER_BAR,
	);

	const { positionPlayerBar } = getBehaviorState();
	const { moviePlayerContext } = getUiOps();

	const {
		videoPlayerState: { mode },
	} = getSiteMetaState();

	if (mode === "none") {
		return;
	}

	const { alwaysDisplayPlayerBar } = await resolveBehaviorOption(mode);

	const isOutside = positionPlayerBar === "outside";

	logger.debug("execAlwaysDisplayPlayerBar", [
		[
			"isExec =>",
			isOutside && alwaysDisplayPlayerBar && !isVisiblePlayerBar,
			[isOutside, alwaysDisplayPlayerBar, !isVisiblePlayerBar],
		],
		{ isOutside, alwaysDisplayPlayerBar, isVisiblePlayerBar },
	]);

	// NOTE: For "alwaysDisplayPlayerBar" option user scope
	if (isOutside && alwaysDisplayPlayerBar) {
		dataAttrIsAlwaysDisplayBar.set();

		if (!isVisiblePlayerBar) {
			blockAutoHide();
			hideCursor();
		}
	}

	// NOTE: For "is not alwaysDisplayPlayerBar" option user scope
	if (isOutside && !alwaysDisplayPlayerBar) {
		// NOTE: `isVisiblePlayer === true` OR mouseLeaveHackedContext, should show player bar.
		if (isVisiblePlayerBar || moviePlayerContext.hoveringMouse) {
			blockAutoHide();
			dataAttrIsAlwaysDisplayBar.set();
		} else {
			// NOTE: This is effectively the `hide()` method.
			dataAttrIsAlwaysDisplayBar.remove();
		}
	}
};

/**
 * @description The control to make the bar appear and disappear on hover is transferred to the execAlwaysDisplayPlayerBar.
 */
export const pseudoReproducePlayerMouseHover = async ({
	event,
	eventFrom,
	deactivateBlockAutoHide,
}: {
	event: Event;
	eventFrom: typeof elementQuery.MOVIE_PLAYER | typeof elementQuery.PLAYER_BAR;
	deactivateBlockAutoHide?: () => void;
}) => {
	const { positionPlayerBar } = getBehaviorState();
	const isOutside = positionPlayerBar === "outside";
	const {
		videoPlayerState: { mode },
	} = getSiteMetaState();
	if (mode === "none") {
		return;
	}
	const { alwaysDisplayPlayerBar } = await resolveBehaviorOption(mode);

	if (!isOutside || alwaysDisplayPlayerBar) {
		return;
	}
	if (!isMouseEvent(event) || !isElementTheTarget(event.target)) {
		return;
	}

	if (eventFrom === elementQuery.MOVIE_PLAYER) {
		switch (event.type) {
			case "mouseenter": {
				moviePlayerHoveringOperation(true);
				break;
			}
			case "mouseleave": {
				const { isLeaveFromBottomEdge } = mouseleaveJudge({
					targetElement: event.target,
					event,
				});
				// equal leave from the 3 edges → ┏━━━━━━━┓
				if (!isLeaveFromBottomEdge) {
					moviePlayerHoveringOperation(false);
					// NOTE: ここでdeactivateBlockAutoHideを呼ぶとイベントが無限ループして`maximum call stack size exceeded`になるので注意。 ┏━━━━━━━┓ にはYouTube本来のmouseleaveが実装されているのでそれを呼ぶことになってしまう。
				}
				break;
			}
		}
	}

	if (eventFrom === elementQuery.PLAYER_BAR) {
		switch (event.type) {
			case "mouseleave": {
				const { isLeaveFromTopEdge } = mouseleaveJudge({
					targetElement: event.target,
					event,
				});
				// equal leave from the 3 edges → ┗━━━━━━━┛
				if (!isLeaveFromTopEdge) {
					moviePlayerHoveringOperation(false);
					deactivateBlockAutoHide?.();
				}
				break;
			}
		}
	}
};
